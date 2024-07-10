import { Body, Tables } from "database.types";

export type Like = Tables<"likes">;

export type CreateLikeBody = Body<"likes">["Insert"];
