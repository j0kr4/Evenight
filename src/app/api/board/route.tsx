import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.boardGame.findMany();
  return Response.json(data);
}
