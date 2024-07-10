import { supabase } from "@core/api/supabase";
import { CreatePostBody, Post, PostWithRelations } from "./types";
import { getCurrentSession } from "../auth/api";
import { uploadImage } from "../files/api";
import { getPublicUrl } from "../files/utils";
import { Bucket } from "../files/constants";

export const getPosts = async (): Promise<PostWithRelations[] | null> => {
  const { data } = await supabase
    .from("posts")
    .select("*, profiles(username), comments(id), likes(id)")
    .order("created_at", { ascending: false })
    .range(0, 9)
    .throwOnError();

  return Promise.resolve(data);
};

export const getPostById = async (id: string | number) => {
  const response = await supabase
    .from("posts")
    .select("*, profiles(username), comments(id), likes(id)")
    .eq("id", id)
    .single()
    .throwOnError();
  return Promise.resolve(response.data);
};

export const getPostsByOwnerId = async (uid: string | number) => {
  const response = await supabase
    .from("posts")
    .select("*")
    .eq("owner_id", uid)
    .order("created_at", { ascending: false })
    .range(0, 9)
    .throwOnError();
  return Promise.resolve(response.data);
};

export const getPostsViaSearch = async (search: string) => {
  const response = await supabase
    .from("posts")
    .select("*")
    .ilike("description", `%${search}%`)
    .order("created_at", { ascending: false })
    .range(0, 9)
    .throwOnError();
  return Promise.resolve(response.data);
};

export const getPostsByFavoriteOfUser = async (favoriteId: number[]) => {
  const response = await supabase
    .from("posts")
    .select(
      "*, profiles(username), comments(id), likes(id, owner_id, post_id), favorites(owner_id)"
    )
    .in("id", favoriteId)
    .order("created_at", { ascending: false })
    .range(0, 9)
    .throwOnError();
  return Promise.resolve(response.data);
};

export const createPost = async (post: CreatePostBody) => {
  const session = await getCurrentSession();
  // upload file
  const fileName = `${session?.user.id}/${Date.now()}.png`;
  await uploadImage(Bucket.Posts, fileName, post.image_url);
  const url = getPublicUrl(Bucket.Posts, fileName);
  const response = await supabase
    .from("posts")
    .insert({
      ...post,
      image_url: url,
    })
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
};
