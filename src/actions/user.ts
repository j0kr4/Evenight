"use server";
import prisma from "../../prisma/script";

export const getUser = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};
