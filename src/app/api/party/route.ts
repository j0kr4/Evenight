import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.user.findMany();
  return Response.json(data);
}
