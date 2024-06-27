import { PrismaClient } from "@prisma/client";
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
  date: z.string()
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  })
  .transform((val) => new Date(val)),
  time: z.string()
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

export async function GET() {
  const data = await prisma.party.findMany({
    include: { organizer: true, partyParticipants: true, adress: true },
  });
  return Response.json(data);
}

export async function POST(request) {
  try {
    let validatedData = PartySchema.parse(await request.json());

    // Préparer l'objet data pour inclure les relations
    const dataForPrisma = {
      ...validatedData,
      adress: validatedData.adress ? {
        create: {
          ...validatedData.adress,
        },
      } : undefined,
      boardGames: validatedData.boardGames ? {
        create: validatedData.boardGames.map(bg => ({
          name: bg.name,
          // Assurez-vous que les autres champs nécessaires sont inclus ici
        })),
      } : undefined,
      videoGames: validatedData.videoGames ? {
        create: validatedData.videoGames.map(vg => ({
          name: vg.name,
          platform: vg.platform,
          // Assurez-vous que les autres champs nécessaires sont inclus ici
        })),
      } : undefined,
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
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating party:', error);
    return new Response(JSON.stringify({ error: 'Error creating party' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}