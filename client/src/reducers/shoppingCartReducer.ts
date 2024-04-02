import { CartItem } from "../models/CartItem";

export enum ShoppingCartActionType {
  ADD,
  REMOVE,
}

export interface ShoppingCartAction {
  type: ShoppingCartActionType;
  payload: CartItem;
}

export const shoppingCartReducer = (
  items: CartItem[],
  action: ShoppingCartAction,
): CartItem[] => {
  switch (action.type) {
    case ShoppingCartActionType.ADD:
      return [...items, action.payload];
    case ShoppingCartActionType.REMOVE:
      return [
        ...items.filter((item) => item.priceId != action.payload.priceId),
      ];
    default:
      return items;
  }
};
