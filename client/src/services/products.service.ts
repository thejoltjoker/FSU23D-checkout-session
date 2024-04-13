import { ProductsResponse } from "../models/ProductsResponse";
import { get } from "./http.service";

export const getAllProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await get<ProductsResponse>(
      "http://localhost:3000/api/products/",
    );
    return response.data;
  } catch (error) {
    console.error("Error while getting products");
    throw error;
  }
};
