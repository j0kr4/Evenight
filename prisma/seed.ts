import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.message.deleteMany(),
    prisma.boardGame.deleteMany(),
    prisma.videoGame.deleteMany(),
    prisma.party.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Generate Users
  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        emailVerified: faker.date.past(),
        passwordHash: faker.internet.password(),
        passwordSalt: faker.internet.password(),
        image: faker.image.avatar(),
        city: faker.location.city(),
        region: faker.location.state(),
        age: faker.number.int({ min: 18, max: 60 }),
        interests: faker.lorem.words(3).split(" "),
        rating: faker.number.float({ min: 0, max: 5, multipleOf: 0.1 }),
        role: "USER",
      },
    });
  }

  // Generate Parties
  const users = await prisma.user.findMany();
  for (let i = 0; i < 5; i++) {
    await prisma.party.create({
      data: {
        name: faker.lorem.words(3),
        city: faker.location.city(),
        type: faker.helpers.arrayElement([
          "Soirée Jeux de Société",
          "LAN",
          "Soirée Classique",
        ]),
        date: faker.date.future(),
        time: faker.date.future(),
        place: faker.number.int({ min: 1, max: 100 }),
        availableSeats: faker.number.int({ min: 1, max: 20 }),
        isPaid: faker.datatype.boolean(),
        price: faker.number.float({ min: 0, max: 100, multipleOf: 0.01 }),
        organizerId: faker.helpers.arrayElement(users).id,
        bringSnacks: faker.datatype.boolean(),
        bringDrinks: faker.datatype.boolean(),
      },
    });
  }

  // Generate BoardGames and VideoGames
  const parties = await prisma.party.findMany();

  for (const party of parties) {
    if (party.type === "Soirée Jeux de Société") {
      for (let i = 0; i < 5; i++) {
        await prisma.boardGame.create({
          data: {
            name: faker.helpers.arrayElement([
              "Monopoly",
              "Loup Garou",
              "Uno",
              "Jeux de carte",
            ]),
            partyId: party.id,
          },
        });
      }
    } else if (party.type === "LAN") {
      for (let i = 0; i < 5; i++) {
        await prisma.videoGame.create({
          data: {
            name: faker.helpers.arrayElement([
              "Call of Duty",
              "EA Sports FC",
              "Minecraft",
              "XDefiant",
              "Grand Theft Auto V",
            ]),
            platform: faker.helpers.arrayElement(["PC", "Console"]),
            partyId: party.id,
          },
        });
      }
    }
  }

  // Generate Comments
  for (const party of parties) {
    for (let i = 0; i < 5; i++) {
      await prisma.comment.create({
        data: {
          content: faker.lorem.sentences(2),
          rating: faker.number.float({ min: 0, max: 5, multipleOf: 0.1 }),
          userId: faker.helpers.arrayElement(users).id,
          partyId: party.id,
        },
      });
    }
  }

  // Generate Messages
  for (const party of parties) {
    for (let i = 0; i < 5; i++) {
      await prisma.message.create({
        data: {
          content: faker.lorem.sentences(2),
          userId: faker.helpers.arrayElement(users).id,
          partyId: party.id,
        },
      });
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
