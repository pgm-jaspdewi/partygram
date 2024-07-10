import { supabase } from "@core/api/supabase";
import { Comment, CommentWithRelations, CreateCommentBody } from "./types";

export const getComments = async (
  postId: string
): Promise<CommentWithRelations[] | null> => {
  const { data } = await supabase
    .from("comments")
    .select("*, profiles(*)")
    .eq("post_id", postId)
    .order("created_at", { ascending: false })
    .range(0, 10)
    .throwOnError();

  return Promise.resolve(data);
};

export const createComment = async (comment: CreateCommentBody) => {
  const response = await supabase
    .from("comments")
    .insert(comment)
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
};
