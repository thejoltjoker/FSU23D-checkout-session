import { Dispatch, createContext, useContext } from "react";
import { CartItem } from "../models/CartItem";
import { ShoppingCartAction } from "../reducers/shoppingCartReducer";

interface ShoppingCartContent {
  items: CartItem[];
  dispatch: Dispatch<ShoppingCartAction>;
}

export const ShoppingCartContext = createContext<ShoppingCartContent>({
  items: [],
  dispatch: () => {},
});

export const useShoppingCartContext = () => useContext(ShoppingCartContext);
