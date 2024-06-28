import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  const id = segments.pop(); 
  const data = await prisma.party.findUnique({
    where: { id: id },
  
  });
  return Response.json(data);
}
