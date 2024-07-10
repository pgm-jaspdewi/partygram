import { supabase } from "@core/api/supabase";

export const getProfileById = async (uid: string | number) => {
  const response = await supabase
    .from("profiles")
    .select("*")
    .eq("id", uid)
    .throwOnError()
    .single();

  return Promise.resolve(response.data);
};
