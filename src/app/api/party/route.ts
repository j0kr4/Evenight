import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.party.findMany({
    include: { organizer: true, partyParticipants: true, adress: true },
  });
  return Response.json(data);
}
