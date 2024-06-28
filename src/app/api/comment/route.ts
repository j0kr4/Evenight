import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const CommentSchema = z.object({
  content: z.string().optional(),
  rating: z.number().optional(),
  fromUserId: z.string().optional(),
  toUserId: z.string().optional(),
  partyId: z.string().optional(),
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
        partyId: request.nextUrl.searchParams.get('partyId'),
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
