import { PrismaClient } from "@prisma/client";
import client from "../../../lib/redis-client"
import { z } from "zod";

enum PartyType {
  LAN = "LAN",
  PARTY = "PARTY",
  BOARD_GAME = "BOARD_GAME",
}

const BoardGameSchema = z.object({
  name: z.string(),
  partyId: z.string(), // Assurez-vous que cela correspond à votre logique d'application
});

// Définition du schéma pour VideoGame
const VideoGameSchema = z.object({
  name: z.string(),
  platform: z.string(),
  partyId: z.string(), // Assurez-vous que cela correspond à votre logique d'application
});

const PartySchema = z.object({
  name: z.string(),
  type: z.nativeEnum(PartyType),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform((val) => new Date(val)),
  time: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform((val) => new Date(val)),
  description: z.string(),
  availableSeats: z.number().int(),
  isPaid: z.boolean(),
  place: z.number().int(),
  price: z.number().optional().nullable(),
  adress: z.object({
    street: z.string(),
    city: z.string(),
    region: z.string(),
    country: z.string(),
    zipCode: z.string(),
  }),
  boardGames: z.array(BoardGameSchema),
  videoGames: z.array(VideoGameSchema),
  organizer: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  bringSnacks: z.boolean().default(false),
  bringDrinks: z.boolean().default(false),
  bringDrinksAlcool: z.boolean().default(false),
});

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);

  const cacheKey = `parties:page:${page}:size:${pageSize}`;

  let cachedData = await client.get(cacheKey);
  if (cachedData) {
    return new Response(cachedData, { headers: { 'Content-Type': 'application/json' } });
  }

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const data = await prisma.party.findMany({
    skip,
    take,
    include: {
      organizer: true,
      partyParticipants: true,
      adress: true,
      comments: true,
    },
  });
  await client.set(cacheKey, JSON.stringify(data), 'EX', 3600); // Expiration après 1 heure

  return Response.json(data);
}

export async function POST(request: any) {
  try {
    let validatedData = PartySchema.parse(await request.json());

    // Préparer l'objet data pour inclure les relations
    const dataForPrisma = {
      ...validatedData,
      adress: validatedData.adress
        ? {
            create: {
              ...validatedData.adress,
            },
          }
        : undefined,
      boardGames: validatedData.boardGames
        ? {
            create: validatedData.boardGames.map((bg) => ({
              name: bg.name,
              // Assurez-vous que les autres champs nécessaires sont inclus ici
            })),
          }
        : undefined,
      videoGames: validatedData.videoGames
        ? {
            create: validatedData.videoGames.map((vg) => ({
              name: vg.name,
              platform: vg.platform,
              // Assurez-vous que les autres champs nécessaires sont inclus ici
            })),
          }
        : undefined,
      organizer: {
        connect: {
          id: validatedData.organizer,
        },
      },
    };

    const createdParty = await prisma.party.create({
      data: dataForPrisma,
    });

    return new Response(JSON.stringify(createdParty), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating party:", error);
    return new Response(JSON.stringify({ error: "Error creating party" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
