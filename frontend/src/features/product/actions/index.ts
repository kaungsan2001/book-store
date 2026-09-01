// import { api } from "@/api/axios";
// import { AxiosError } from "axios";
// import { type ActionFunctionArgs } from "react-router";

// export const productLikeToggleAction = async ({
//   params,
// }: ActionFunctionArgs) => {
//   const productId = params.id;

//   try {
//     return await api.patch("products/like-toggle", { productId });
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       return error.response?.data || { message: "Something went wrong." };
//     }
//     throw error;
//   }
// };
