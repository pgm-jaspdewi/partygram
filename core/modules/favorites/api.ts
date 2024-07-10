import { supabase } from "@core/api/supabase";
import { CreateFavoriteBody, Favorite } from "./types";

export const getAllFavorite = async (): Promise<Favorite[] | null> => {
  const { data } = await supabase.from("favorites").select("*").throwOnError();
  return Promise.resolve(data);
};

export const getFavoritesOfUser = async (uid: string | number) => {
  const { data } = await supabase
    .from("favorites")
    .select("*")
    .eq("owner_id", uid)
    .throwOnError();

  return Promise.resolve(data);
};

export const createFavorite = async (favorite: CreateFavoriteBody) => {
  const response = await supabase
    .from("favorites")
    .insert(favorite)
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
};

export const deleteFavorite = async (postId: number) => {
  const response = await supabase
    .from("favorites")
    .delete()
    .eq("post_id", postId)
    .throwOnError();
  return Promise.resolve(response);
};
