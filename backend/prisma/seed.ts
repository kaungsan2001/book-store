import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { faker } from "@faker-js/faker";
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed your database here
  console.log("Seeding the database...");
  // Example: await prisma.user.create({ data: { name: "John Doe" } });

  const fakeArticles = Array.from({ length: 100 }, () => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
    authorId: "d0tvvs08wdymw77bn8xgnwho",
    categoryId: "d0tvvs08wdymw77bn8xgnwho",
    imageUrl:
      "https://images.unsplash.com/photo-1782827397217-e84ce8f05a6f?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageId: "article/ks9r3d4n5oofpstdfan1",
  }));

  await prisma.article
    .createMany({
      data: fakeArticles,
    })
    .then(() => {
      console.log("Database seeded successfully.");
    })
    .catch((error) => {
      console.error("Error seeding the database:", error);
    });
}

async function books() {
  const fakeBooks = Array.from({ length: 100 }).map(() => {
    return prisma.product.create({
      data: {
        name: faker.book.title(),
        author: faker.book.author(),
        description: faker.lorem.paragraphs(3),
        categoryId: "d0tvvs08wdymw77bn8xgnwho",
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
books()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
