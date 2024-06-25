import { PrismaClient } from "@prisma/client";
import { LoginType, ReadUser, UserRegisterDto } from "../type/user";
import hashPassword from "../utils/hashPassword";

import jsonwebtoken from "jsonwebtoken";
import config from "@/../config";

const prisma = new PrismaClient();
export const register = async (userDto: UserRegisterDto) => {
  const { password, ...otherFields } = userDto;
  const userExists = await prisma.user.findUnique({
    where: {
      email: userDto.email,
    },
  });
  if (userExists) throw new Error("User already exists");

  const [hash, salt] = hashPassword(password);

  const user = await prisma.user.create({
    data: {
      ...otherFields,
      passwordHash: hash,
      passwordSalt: salt,
    },
  });
  console.log("user", user);

  const jwt = jsonwebtoken.sign(
    { payload: { id: user.id } },
    config.security.session.secret,
    {
      expiresIn: config.security.session.expiresIn,
    }
  );

  return jwt;
};

export const getUser: ReadUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return user;
};

export const authenticateUser: LoginType = async (email, password) => {
  console.log("email", email);
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log("user", user);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const [hash, salt] = hashPassword(password, user.passwordSalt as string);
  console.log("hash", hash);
  if (hash !== user!.passwordHash) {
    throw new Error("Invalid email or password");
  }

  const jwt = jsonwebtoken.sign(
    { payload: { id: user.id } },
    config.security.session.secret,
    {
      expiresIn: config.security.session.expiresIn,
    }
  );

  return jwt;
};
