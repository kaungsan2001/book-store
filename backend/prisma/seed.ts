import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import {faker} from "@faker-js/faker";
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
    authorId: "z82c58b6509l4tmtgn33xq1w", 
    categoryId: "jdqecjdd0np9gt0wx7s7vk0m", 
    imageUrl: "https://res.cloudinary.com/dazrl0txc/image/upload/v1781333259/article/ks9r3d4n5oofpstdfan1.jpg",
    imageId: "article/ks9r3d4n5oofpstdfan1",
  }));

    await prisma.article.createMany({
        data: fakeArticles,
    }).then(() => {
        console.log("Database seeded successfully.");
    }).catch((error) => {
        console.error("Error seeding the database:", error);
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });