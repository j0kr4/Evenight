import { User } from "@prisma/client";

export type UserRegisterDto = {
  password: string;
  email: string;
  name: string;
};

export type ReadUser = (email: string) => Promise<User>;

export type LoginType = (
  email: string,
  password: string
) => Promise<string | void>;
