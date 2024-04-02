import { ProductsResponse } from "../models/ProductsResponse";
import { get } from "./http.service";

export class Endpoint {
  public static baseUrl = "http://localhost:3000/api/products/";
  public static listProducts = Endpoint.baseUrl;

  constructor() {}

  public static product(productId: string) {
    return `${Endpoint.baseUrl}${encodeURIComponent(productId)}`;
  }
}

export const getAllProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await get<ProductsResponse>(Endpoint.listProducts);
    return response.data;
  } catch (error) {
    console.error("Error while getting products");
    throw error;
  }
};
