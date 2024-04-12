import { OrdersJson } from "../models/OrdersJson";
import { Order } from "../schemas/OrderSchema";
import { read, write } from "./json.service";

import path from "path";
const orderJsonPath = path.resolve(__dirname, "../data/orders.json");
const defaultData: OrdersJson = {
  orders: [],
};

export const initOrdersJson = async () => {
  const data = (await read<OrdersJson>(orderJsonPath)) ?? defaultData;
  return await write(orderJsonPath, data);
};

export const findByEmail = async (email: string): Promise<Order[]> => {
  try {
    const data = await read<OrdersJson>(orderJsonPath);

    if (!data) return [];

    return data.orders.filter((order: Order) => order.email === email);
  } catch (error) {
    return [];
  }
};

export const findByCustomerId = async (
  customerId: string
): Promise<Order[]> => {
  try {
    const data = await read<OrdersJson>(orderJsonPath);

    if (!data) return [];

    return data.orders.filter(
      (order: Order) => order.customerId === customerId
    );
  } catch (error) {
    return [];
  }
};

export const upsert = async (order: Order): Promise<boolean> => {
  const data = (await read<OrdersJson>(orderJsonPath)) ?? defaultData;
  const existingOrder = data.orders.find((u) => u.id === order.id);
  if (existingOrder) {
    data.orders = data.orders.map((dbOrder) =>
      dbOrder.id === order.id ? order : dbOrder
    );
  } else {
    data.orders.push(order);
  }

  return await write(orderJsonPath, data);
};
