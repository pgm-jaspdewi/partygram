import { supabase } from "@core/api/supabase";
import { CreateStoryBody, Story } from "./types";
import { getCurrentSession } from "../auth/api";
import { uploadImage } from "../files/api";
import { Bucket } from "../files/constants";
import { getPublicUrl } from "../files/utils";

const currentDate = new Date();
const twentyFourHoursAgo = new Date(
  currentDate.getTime() - 24 * 60 * 60 * 1000
);

export const getStories = async (): Promise<Story[] | null> => {
  const { data } = await supabase
    .from("stories")
    .select("*")
    .gt("created_at", twentyFourHoursAgo)
    .order("created_at", { ascending: true })
    .throwOnError();

  return Promise.resolve(data);
};

export const getStoryById = async (id: string | number) => {
  const response = await supabase
    .from("stories")
    .select("story_url")
    .eq("id", id)
    .single()
    .throwOnError();
  return Promise.resolve(response.data);
};

export const createStory = async (story_url: string) => {
  const Session = await getCurrentSession();
  // upload image-file to supabase storage
  const fileName = `${Session?.user.id}/${Date.now()}.png`;
  await uploadImage(Bucket.Stories, fileName, story_url);
  const url = getPublicUrl(Bucket.Stories, fileName);
  const response = await supabase
    .from("stories")
    .insert({
      story_url: url,
    })
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
};
