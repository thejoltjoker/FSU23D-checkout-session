import { SaveOrderResponse } from "../models/SaveOrderResponse";
import { Order, OrderSchema } from "../schemas/OrderSchema";
import { post } from "./http.service";

export const saveOrder = async (order: Order): Promise<SaveOrderResponse> => {
  try {
    if (!OrderSchema.parse(order)) {
      throw new Error("Incorrect order format");
    }
    const response = await post<SaveOrderResponse>(
      "http://localhost:3000/api/orders/save",
      JSON.stringify(order),
    );
    return response.data;
  } catch (error) {
    console.error("Error while saving order");
    throw error;
  }
};
