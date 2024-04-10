import { Product } from "../models/Product";

export enum ShoppingCartActionType {
  ADD,
  REMOVEONE,
  REMOVEALL,
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
  switch (action.type) {
    case ShoppingCartActionType.ADD: {
      console.log("Adding product to cart:", action.payload.id);
      const cart: Product[] = [...products, { ...action.payload }];
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }

    case ShoppingCartActionType.REMOVEONE: {
      console.log("Removing item from cart:", action.payload.id);
      let removed = false;
      const cart: Product[] = [];
      products.map((product) =>
        product.id === action.payload.id && !removed
          ? (removed = true)
          : cart.push(product),
      );

      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }

    case ShoppingCartActionType.REMOVEALL: {
      return [...products.filter((item) => item.id != action.payload.id)];
    }
  }
};
