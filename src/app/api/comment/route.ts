import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

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

export async function GET(request: any) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        partyId: request.params.id,
      },
      include: {
        userFrom: true,
        userTo: true,
        party: true,
      },
    });

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response(JSON.stringify({ error: "Error fetching comments" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
