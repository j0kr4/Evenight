import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.boardGame.deleteMany(),
    prisma.videoGame.deleteMany(),
    prisma.party.deleteMany(),
    prisma.user.deleteMany(),
    prisma.adress.deleteMany(),
  ]);

  // Generate Addresses
  const addresses = [];
  for (let i = 0; i < 5; i++) {
    const address = await prisma.adress.create({
      data: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        region: faker.location.state(),
        country: faker.location.country(),
        zipCode: faker.location.zipCode(),
      },
    });
    addresses.push(address);
  }

  // Generate Users
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        emailVerified: faker.date.past(),
        passwordHash: faker.internet.password(),
        passwordSalt: faker.internet.password(),
        image: faker.image.avatar(),
        adressId: faker.helpers.arrayElement(addresses).id,
        age: faker.number.int({ min: 18, max: 60 }),
        interests: faker.lorem.words(3).split(" "),
        rating: faker.number.float({ min: 0, max: 5, multipleOf: 0.1 }),
        role: "USER",
      },
    });
    users.push(user);
  }

  // Generate Parties
  const parties = [];
  for (let i = 0; i < 5; i++) {
    const party = await prisma.party.create({
      data: {
        name: faker.lorem.words(3),
        type: faker.helpers.arrayElement(["LAN", "BOARD_GAME"]),
        date: faker.date.future(),
        time: faker.date.future(),
        adressId: faker.helpers.arrayElement(addresses).id,
        description: faker.lorem.sentences(2),
        place: faker.number.int({ min: 1, max: 100 }),
        availableSeats: faker.number.int({ min: 1, max: 20 }),
        isPaid: faker.datatype.boolean(),
        price: faker.number.float({ min: 0, max: 100, multipleOf: 0.01 }),
        organizerId: faker.helpers.arrayElement(users).id,
        bringSnacks: faker.datatype.boolean(),
        bringDrinks: faker.datatype.boolean(),
        bringDrinksAlcool: faker.datatype.boolean(),
      },
    });
    parties.push(party);
  }

  // Generate BoardGames and VideoGames
  for (const party of parties) {
    if (party.type === "BOARD_GAME") {
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
          fromUserId: faker.helpers.arrayElement(users).id,
          toUserId: faker.helpers.arrayElement(users).id,
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
