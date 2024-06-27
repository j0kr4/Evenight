import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: any) {
  const partyId = request.query.partyId;

  try {
    const participants = await prisma.partyParticipant.findMany({
      where: {
        partyId: partyId,
      },
      include: {
        user: true, 
      },
    });

    return new Response(JSON.stringify(participants), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching party participants:", error);
    return new Response(JSON.stringify({ error: "Error fetching party participants" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}