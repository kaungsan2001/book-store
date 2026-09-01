import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { faker } from "@faker-js/faker";
import { hasher } from "../src/utils/hash";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

function getRamdomIndex(arrayLength: number): number {
  return Math.floor(Math.random() * arrayLength);
}

let userIds: string[];
let categoriesIds: string[];

async function users() {
  const hashedPassword = await hasher("password");
  const myUser = {
    name: "John Doe",
    email: "john@example.com",
    password: hashedPassword,
  };
  const myAdmin = {
    name: "Admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "ADMIN",
  };
  const fakeUsers = Array.from({ length: 5 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: hashedPassword,
  }));

  const fakeAdmins = Array.from({ length: 3 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: hashedPassword,
    role: "ADMIN",
  }));

  const createdUsers = await prisma.user.createManyAndReturn({
    data: [...fakeAdmins, ...fakeUsers, myAdmin, myUser],
  });

  userIds = createdUsers.map((user) => user.id);
  return;
}

async function categories() {
  const uniqueFakeCategories = faker.helpers.uniqueArray(faker.book.genre, 10);

  const fakeCategories = uniqueFakeCategories.map((c) => ({
    name: c,
    description: faker.lorem.paragraph(),
  }));

  const createdCategories = await prisma.category.createManyAndReturn({
    data: fakeCategories,
  });

  categoriesIds = createdCategories.map((c) => c.id);

  return;
}

async function articles() {
  const fakeArticles = Array.from({ length: 50 }, () => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
    authorId: userIds[getRamdomIndex(userIds.length)]!,
    categoryId: categoriesIds[getRamdomIndex(categoriesIds.length)]!,
    imageUrl:
      "https://images.unsplash.com/photo-1782827397217-e84ce8f05a6f?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageId: "article/ks9r3d4n5oofpstdfan1",
  }));

  return await prisma.article.createMany({
    data: fakeArticles,
  });
}

async function books() {
  const fakeBooks = Array.from({ length: 60 }).map(() => {
    return prisma.product.create({
      data: {
        name: faker.book.title(),
        author: faker.book.author(),
        description: faker.lorem.paragraphs(3),
        categoryId: categoriesIds[getRamdomIndex(categoriesIds.length)]!,
        price: faker.number.int({ min: 10, max: 100 }),
        discount: faker.number.int({ min: 0, max: 50 }),
        inventory: faker.number.int({ min: 1, max: 100 }),
        productImages: {
          create: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              imageId: "product/ks9r3d4n5oofpstdfan1",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              imageId: "product/ks9r3d4n5oofpstdfan1",
            },
          ],
        },
      },
    });
  });

  await Promise.all(fakeBooks);
}

async function main() {
  try {
    console.log("Users seeding...");
    await users();
    console.log("Users seeding completed");

    console.log("Categories Seeding...");
    await categories();
    console.log("Categories seeding completed");

    console.log("Articles Seeding...");
    await articles();
    console.log("Articles seeding completed");

    console.log("Books Seeding...");
    await books();
    console.log("Books seeding completed");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.info("All Seeding Completed.");
  }
}

main();
