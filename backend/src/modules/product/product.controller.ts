import type { Request, Response } from "express";
import { sendResponse } from "../../utils/response";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProductList,
} from "./product.service";
import type { ValidatedRequest } from "../../middlewares/validate.middleware";
import type {
  GetProductListSchema,
  CreateProductSchema,
  DeleteProductSchema,
  GetOneSchema,
} from "./product.schema";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import { getCategoryById } from "../category/category.service";
import createHttpError from "http-errors";
import { ERRORS } from "../../config/constants";

/*****************
 * GET A PRODUCT *
 *****************/
export const getOne = async (
  req: ValidatedRequest<typeof GetOneSchema>,
  res: Response,
) => {
  const id = req.validated!.params.id;
  const product = await getProductById(id);
  sendResponse({ res, data: { product }, message: "Product" });
};

/********************
 * GET PRODUCT LIST *
 ********************/
export const getMany = async (
  req: ValidatedRequest<typeof GetProductListSchema>,
  res: Response,
) => {
  const { cursor, limit } = req.validated!.query;
  const { products, totalCount } = await getProductList({ cursor, limit });
  const hasNextPage = products.length > limit;
  const nextCursor = hasNextPage ? products[products.length - 1]?.id : null;

  if (hasNextPage) {
    products.pop(); // Remove the extra product used to check for next page
  }

  const meta = {
    totalCount,
    hasNextPage,
    nextCursor,
  };
  sendResponse({ res, data: products, meta, message: "Product List" });
};

/**********************
 * CREATE NEW PRODUCT *
 **********************/
export const create = async (
  req: AuthenticatedRequest & ValidatedRequest<typeof CreateProductSchema>,
  res: Response,
) => {
  const {
    name,
    author,
    description,
    categoryId,
    discount,
    price,
    inventory,
    productTag,
  } = req.validated!.body;
  const category = await getCategoryById(categoryId);

  if (!category)
    throw createHttpError(404, "Category not found.", {
      code: ERRORS.NOT_FOUND,
    });

  const product = await createProduct({
    name,
    author,
    description,
    categoryId,
    discount,
    price,
    inventory,
    productTag,
  });

  sendResponse({ res, data: { product }, message: "New Product" });
};

/************************
 * UPDATE PRODUCT BY ID *
 ************************/
export const update = async (req: Request, res: Response) => {};

/************************
 * DELETE PRODUCT BY ID *
 ************************/
export const remove = async (
  req: ValidatedRequest<typeof DeleteProductSchema>,
  res: Response,
) => {
  const id = req.validated!.params.id;
  const product = await deleteProductById(id);
  sendResponse({ res, data: { product }, message: "A Product Deleted" });
};
