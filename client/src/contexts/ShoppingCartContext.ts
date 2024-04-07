import { Dispatch, createContext, useContext } from "react";
import { Product } from "../models/ProductsResponse";
import { ShoppingCartAction } from "../reducers/shoppingCartReducer";

type ShoppingCartContent = {
  products: Product[];
  dispatch: Dispatch<ShoppingCartAction>;
};

export const ShoppingCartContext = createContext<ShoppingCartContent>({
  products: [],
  dispatch: () => {},
});

export const useShoppingCartContext = () => useContext(ShoppingCartContext);
