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
    <li className="bg-banana-50 shadow-box flex w-full items-center rounded-3xl p-4">
      <div className="bg-brown-950/10 border-brown-950/20 me-4 size-24 rounded-xl border border-2">
        <img src={product.images[0]} alt="" className="w-full" />
      </div>
      <div className="grow">
        <h4 className="text-2xl">{product.name}</h4>
      </div>
      <div className="me-8 inline-flex items-center">
        <NumberField minValue={0} value={quantity} onChange={updateCart} />
      </div>
      <p className="min-w-24 text-right text-xl font-bold">
        {getSymbolFromCurrency(product.default_price.currency)}&nbsp;
        {product.default_price.unit_amount / 100}
      </p>
    </li>
  );
};

export default CartListingItem;
