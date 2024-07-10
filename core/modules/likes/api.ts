import { supabase } from "@core/api/supabase";
import { CreateLikeBody, Like } from "./types";

export const getAllLikes = async (): Promise<Like[] | null> => {
  const { data } = await supabase.from("likes").select("*").throwOnError();
  return Promise.resolve(data);
};

export const getLikes = async (postId: string): Promise<Like[] | null> => {
  const { data } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", postId)
    .throwOnError();
  return Promise.resolve(data);
};

export const getLikesByOwnerId = async (uid: string | number) => {
  const { data } = await supabase
    .from("likes")
    .select("*")
    .eq("owner_id", uid)
    .throwOnError();

  return Promise.resolve(data);
};

export const createLike = async (like: CreateLikeBody) => {
  const response = await supabase
    .from("likes")
    .insert(like)
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
};

export const deleteLike = async (postId: number) => {
  const response = await supabase
    .from("likes")
    .delete()
    .eq("post_id", postId)
    .throwOnError();
  return Promise.resolve(response);
};
