export type UserMetadata = {
  first_name: string;
  last_name: string;
  avatar?: string | null;
  username: string;
  accepted_terms: boolean;
};

export type User = {
  id: string;
  email: string;
} & UserMetadata;

export type CreateUserBody = {
  email: string;
  password: string;
} & UserMetadata;

export type UpdateUserBody = Partial<
  {
    email: string;
    password?: string;
    id: string;
  } & UserMetadata
>;
