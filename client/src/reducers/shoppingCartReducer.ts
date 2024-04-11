import { CartItem } from "../models/CartItem";

export enum ShoppingCartActionType {
  ADD,
  SET,
  REMOVEONE,
  REMOVEALL,
  EMPTY,
}

export interface ShoppingCartAction {
  type: ShoppingCartActionType;
  payload: CartItem;
}

export const initialState = JSON.parse(localStorage.getItem("cart") ?? "[]");

export const shoppingCartReducer = (
  items: CartItem[],
  action: ShoppingCartAction,
): CartItem[] => {
  switch (action.type) {
    case ShoppingCartActionType.ADD: {
      console.log("Adding product to cart:", action.payload.product.id);
      let cart: CartItem[];

      if (items.find((item) => item.product.id === action.payload.product.id)) {
        cart = items.map((item) =>
          item.product.id === action.payload.product.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : { ...item },
        );
      } else {
        cart = [...items, { ...action.payload }];
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }

    case ShoppingCartActionType.SET: {
      console.log("Setting product in cart:", action.payload.product.id);
      let cart: CartItem[];

      if (items.find((item) => item.product.id === action.payload.product.id)) {
        cart = items.map((item) =>
          item.product.id === action.payload.product.id
            ? { ...action.payload }
            : { ...item },
        );
      } else {
        cart = [...items, { ...action.payload }];
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }

    case ShoppingCartActionType.REMOVEONE: {
      console.log("Removing item from cart:", action.payload.id);

      let removed = false;
      const cart: CartItem[] = [];
      items.map((item) =>
        item.product.id === action.payload.product.id && !removed
          ? (removed = true)
          : cart.push(item),
      );

      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }

    case ShoppingCartActionType.REMOVEALL: {
      return [
        ...items.filter((item) => item.product.id != action.payload.product.id),
      ];
    }
    case ShoppingCartActionType.EMPTY: {
      return [];
    }
  }
};
