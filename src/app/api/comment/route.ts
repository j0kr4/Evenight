import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Définir le schéma de validation pour un commentaire
const CommentSchema = z.object({
  content: z.string(),
  rating: z.number(),
  fromUserId: z.string(),
  toUserId: z.string(),
  partyId: z.string(),
});

export async function POST(request: any) {
  try {
    let validatedData = CommentSchema.parse(await request.json());

    const createdComment = await prisma.comment.create({
      data: validatedData,
    });

    return new Response(JSON.stringify(createdComment), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return new Response(JSON.stringify({ error: "Error creating comment" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}