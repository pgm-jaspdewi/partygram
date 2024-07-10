import { Body, Tables } from "database.types";

export type Story = Tables<"stories">;

export type CreateStoryBody = Body<"stories">["Insert"];
