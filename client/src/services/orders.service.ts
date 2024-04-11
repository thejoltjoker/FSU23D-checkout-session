import { SaveOrderResponse } from "../models/SaveOrderResponse";
import { Order, OrderSchema } from "../schemas/OrderSchema";
import { post } from "./http.service";

export class Endpoint {
  public static baseUrl = "http://localhost:3000/api/orders/";
  public static listProducts = `${Endpoint.baseUrl}save`;

  constructor() {}
}

export const saveOrder = async (order: Order): Promise<SaveOrderResponse> => {
  try {
    if (!OrderSchema.parse(order)) {
      throw new Error("Incorrect order format");
    }
    const response = await post<SaveOrderResponse>(
      Endpoint.listProducts,
      JSON.stringify(order),
    );
    return response.data;
  } catch (error) {
    console.error("Error while getting products");
    throw error;
  }
};
