import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(id: string, params: { id: string }) {
  const data = await prisma.party.findUnique({
    where: { id: "fcfb8697-7411-4f2f-bbdd-60723b97c1da" },
    include: { organizer: true, partyParticipants: true, adress: true },
  });
  return Response.json(data);
}
