import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { CartItem } from "../models/CartItem";

export type ShoppingCartContent = {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
};

export const ShoppingCartContext = createContext<ShoppingCartContent>({
  cart: [],
  setCart: () => {},
});

export const useShoppingCartContext = () => useContext(ShoppingCartContext);






// Create the context
// const ShoppingCartContext = createContext<{
//   items: [];
//   dispatch: React.Dispatch<ShoppingCartAction>;
// }>({
//   state: [],
//   dispatch: () => null,
// });

// // Custom hook to consume the context
// export const useShoppingCart = () => useContext(ShoppingCartContext);
