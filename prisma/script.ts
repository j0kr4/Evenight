import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Generate Users
  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        emailVerified: faker.date.past(),
        passwordHash: faker.internet.password(),
        passwordSalt: faker.datatype.string(16),
        image: faker.image.avatar(),
        city: faker.location.city(),
        region: faker.address.state(),
        age: faker.datatype.number({ min: 18, max: 60 }),
        interests: faker.lorem.words(3).split(" "),
        rating: faker.datatype.float({ min: 0, max: 5, precision: 0.1 }),
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
        place: faker.number.int(),
        availableSeats: faker.datatype.number({ min: 1, max: 20 }),
        isPaid: faker.datatype.boolean(),
        price: faker.datatype.float({ min: 0, max: 100, precision: 0.01 }),
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
            name: faker.random.words(2),
            partyId: party.id,
          },
        });
      }
    } else if (party.type === "LAN") {
      for (let i = 0; i < 5; i++) {
        await prisma.videoGame.create({
          data: {
            name: faker.random.words(2),
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
          rating: faker.datatype.float({ min: 0, max: 5, precision: 0.1 }),
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
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
