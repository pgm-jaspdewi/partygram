import { Body, Tables } from "database.types";
import { Profile } from "../profiles/types";

export type Comment = Tables<"comments">;

export type CommentWithRelations = Comment & {
  profiles: Profile;
};

export type CreateCommentBody = Body<"comments">["Insert"];
