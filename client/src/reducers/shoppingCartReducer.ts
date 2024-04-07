import { Product } from "../models/Product";

export enum ShoppingCartActionType {
  ADD,
  REMOVE,
}

export interface ShoppingCartAction {
  type: ShoppingCartActionType;
  payload: Product;
}

export const initialState = JSON.parse(localStorage.getItem("cart") ?? "[]");

export const shoppingCartReducer = (
  products: Product[],
  action: ShoppingCartAction,
): Product[] => {
  console.log(action);
  switch (action.type) {
    case ShoppingCartActionType.ADD: {
      console.log("Adding product to cart:", action.payload.id);
      const cart: Product[] = [...products, action.payload];
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }
    case ShoppingCartActionType.REMOVE: {
      return [...products.filter((item) => item.id != action.payload.id)];
    }
  }
};
