import { Body, Tables } from "database.types";
import { Like } from "../likes/types";
import { Comment } from "../comments/types";
import { Profile } from "../profiles/types";

export type Post = Tables<"posts">;

export type PostWithRelations = Post & {
  comments: Comment[];
  likes: Like[];
  profiles: Profile;
  // name always needs to be the same as the table name, otherwise it crashes
};

export type CreatePostBody = Body<"posts">["Insert"];
export type UpdatePostBody = Body<"posts">["Update"];
