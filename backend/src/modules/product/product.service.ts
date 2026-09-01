import { ERRORS } from "../../config/constants";
import { prisma } from "../../database/db";
import createHttpError from "http-errors";
import type { Product } from "../../generated/prisma/client";
import type { CreateProductInput } from "./product.schema";

// helper function
async function isProductExist(id: string): Promise<boolean> {
  const isExist = await prisma.product.findFirst({
    where: { id },
    select: { id: true },
  });
  return isExist ? true : false;
}
/*****************************
 * GET PRODUCT BY ID SERVICE *
 *****************************/
export const getProductById = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}): Promise<Product | null> => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      productImages: true,
      category: true,
      likedBy: {
        where: {
          id: userId,
        },
        select: {
          id: true,
        },
      },
    },
  });
};
/********************************************
 * GET PRODUCT LIST BY PAGINATION SERVICE *
 ********************************************/
export const getProductList = async ({
  cursor,
  limit,
  categories,
}: {
  limit: number;
  cursor?: string;
  categories?: string[] | undefined;
}) => {
  console.log("categories in service", categories);
  const [totalCount, products] = await Promise.all([
    prisma.product.count(),
    prisma.product.findMany({
      take: limit + 1,
      skip: cursor ? 1 : 0, // Skip the cursor if it exists
      cursor: cursor ? { id: cursor } : undefined, // Set the cursor if it exists
      where: categories
        ? {
            categoryId: {
              in: categories,
            },
          }
        : undefined,
      select: {
        id: true,
        name: true,
        author: true,
        description: true,
        price: true,
        discount: true,
        inventory: true,
        categoryId: true,
        productTag: {
          select: {
            name: true,
          },
        },
        productImages: {
          select: {
            imageUrl: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);
  return { totalCount, products };
};

/******************************
 * CREATE NEW PRODUCT SERVICE *
 ******************************/
export const createProduct = async (
  data: CreateProductInput,
): Promise<Product> => {
  return await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      author: data.author,
      discount: data.discount,
      inventory: data.inventory,
      category: {
        connect: {
          id: data.categoryId,
        },
      },
      productTag:
        data.productTag.length > 0
          ? {
              connectOrCreate: [...new Set(data.productTag)].map((t) => ({
                where: { name: t },
                create: { name: t },
              })),
            }
          : undefined,
    },
  });
};

/********************************
 * UPDATE PRODUCT BY ID SERVICE *
 ********************************/
export const update = async () => {};

/********************************
 * DELETE PRODUCT BY ID SERVICE *
 ********************************/
export const deleteProductById = async (
  id: string,
): Promise<Product | void> => {
  const product = await isProductExist(id);
  if (!product)
    throw createHttpError(404, "Resource Not Found.", {
      code: ERRORS.NOT_FOUND,
    });

  return await prisma.product.delete({ where: { id } });
};

/***************
 * SOFT DELETE *
 ***************/
export const softDeleteProductById = async (
  id: string,
): Promise<Product | void> => {
  const product = await isProductExist(id);
  if (!product)
    throw createHttpError(404, "Resource Not Found.", {
      code: ERRORS.NOT_FOUND,
    });

  const deletedProduct = await prisma.product.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return deletedProduct;
};

/***********
 * RESTORE *
 ***********/
export const restoreProductById = async (
  id: string,
): Promise<Product | void> => {
  const product = await isProductExist(id);
  if (!product)
    throw createHttpError(404, "Resource Not Found.", {
      code: ERRORS.NOT_FOUND,
    });

  return await prisma.product.update({
    where: { id },
    data: { deletedAt: null },
  });
};

// like toggle service

export const likeToggleService = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  const product = await isProductExist(productId);
  if (!product) {
    throw createHttpError(404, "Product not found.", {
      code: ERRORS.NOT_FOUND,
    });
  }

  const isLiked = await prisma.user.findFirst({
    where: {
      id: userId,
      likedProducts: {
        some: {
          id: productId,
        },
      },
    },
  });

  if (isLiked) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        likedProducts: {
          disconnect: {
            id: productId,
          },
        },
      },
    });
  } else {
    await prisma.user.update({
      where: { id: userId },
      data: {
        likedProducts: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }

  return;
};
