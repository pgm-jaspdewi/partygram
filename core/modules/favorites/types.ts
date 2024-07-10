import { Body, Tables } from "database.types";

export type Favorite = Tables<"favorites">;

export type CreateFavoriteBody = Body<"favorites">["Insert"];
