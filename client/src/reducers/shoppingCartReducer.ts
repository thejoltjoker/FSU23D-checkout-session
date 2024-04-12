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
  payload?: CartItem;
}

export const initialState = JSON.parse(localStorage.getItem("cart") ?? "[]");

export const shoppingCartReducer = (
  items: CartItem[],
  action: ShoppingCartAction,
): CartItem[] => {
  switch (action.type) {
    case ShoppingCartActionType.ADD: {
      if (!action.payload) return items;
      console.log("Adding product to cart:", action.payload.product.id);
      let cart: CartItem[];

      if (
        items.find((item) => item.product.id === action.payload?.product.id)
      ) {
        cart = items.map((item) =>
          item.product.id === action.payload?.product.id
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
      if (!action.payload) return items;
      console.log("Setting product in cart:", action.payload.product.id);
      let cart: CartItem[];

      if (
        items.find((item) => item.product.id === action.payload?.product.id)
      ) {
        cart = items.map((item) =>
          item.product.id === action.payload?.product.id
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
      if (!action.payload) return items;
      console.log("Removing item from cart:", action.payload.product.id);

      let removed = false;
      const cart: CartItem[] = [];
      items.map((item) =>
        item.product.id === action.payload?.product.id && !removed
          ? (removed = true)
          : cart.push(item),
      );

      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }

    case ShoppingCartActionType.REMOVEALL: {
      if (!action.payload) return items;
      return [
        ...items.filter(
          (item) => item.product.id != action.payload?.product.id,
        ),
      ];
    }

    case ShoppingCartActionType.EMPTY: {
      localStorage.removeItem("cart");
      return [];
    }

    default: {
      return items;
    }
  }
};
