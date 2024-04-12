import getSymbolFromCurrency from "currency-symbol-map";
import { useState } from "react";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Product } from "../models/Product";
import { ShoppingCartActionType } from "../reducers/shoppingCartReducer";
import NumberField from "./NumberField";

type CartListingItemProps = {
  product: Product;
};

const CartListingItem = ({ product }: CartListingItemProps) => {
  const { items, dispatch } = useShoppingCartContext();
  const [quantity, setQuantity] = useState(
    items.find((item) => item.product.id === product.id)?.quantity,
  );
  const updateCart = (value: number) => {
    setQuantity(value);
    dispatch({
      type: ShoppingCartActionType.SET,
      payload: { product: product, quantity: value },
    });
  };
  return (
    <li className="flex w-full items-center rounded-3xl bg-banana-50 p-4 shadow-box">
      <div className="me-4 aspect-square size-24 rounded-xl border-2 border-brown-950/20 bg-brown-950/10">
        <img src={product.images[0]} alt="" className="w-full" />
      </div>
      <div className="flex w-full flex-wrap items-center justify-between">
        <h4 className="shrink grow basis-2/5 py-2 text-2xl">{product.name}</h4>
        <div className="ml-auto inline-flex shrink grow items-center">
          <NumberField minValue={0} value={quantity} onChange={updateCart} />
          <p className="min-w-20 shrink grow text-right text-xl font-bold md:pr-4">
            {getSymbolFromCurrency(product.default_price.currency)}&nbsp;
            {product.default_price.unit_amount / 100}
          </p>
        </div>
      </div>
    </li>
  );
};

export default CartListingItem;
