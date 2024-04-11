import getSymbolFromCurrency from "currency-symbol-map";
import { Button } from "react-aria-components";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Product } from "../models/Product";
import { ShoppingCartActionType } from "../reducers/shoppingCartReducer";

type CartListingItemProps = {
  product: Product;
};

const CartListingItem = ({ product }: CartListingItemProps) => {
  const { products, dispatch } = useShoppingCartContext();

  const handleIncreaseQuantity = () => {
    dispatch({ type: ShoppingCartActionType.ADD, payload: product });
  };
  const handleReduceQuantity = () => {
    dispatch({ type: ShoppingCartActionType.REMOVEONE, payload: product });
  };
  return (
    <li className="bg-banana-50 flex w-full items-center rounded-3xl p-4">
      <div className="bg-brown-950/10 border-brown-950/20 me-4 size-24 rounded-xl border border-2">
        <img src={product.images[0]} alt="" className="w-full" />
      </div>
      <div className="grow">
        <h4 className="text-2xl">{product.name}</h4>
      </div>
      <div className="me-8 inline-flex items-center">
        <Button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-dawn-300"
          onPress={() => {
            handleReduceQuantity();
          }}
        >
          <span className="-mt-[2px]">-</span>
        </Button>
        <p className="w-8 text-center">
          {products.filter((p) => p.id === product.id).length}
        </p>
        <Button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-dawn-300"
          onPress={() => {
            handleIncreaseQuantity();
          }}
        >
          +
        </Button>
      </div>
      <p className="text-xl font-bold">
        {getSymbolFromCurrency(product.default_price.currency)}&nbsp;
        {product.default_price.unit_amount / 100}
      </p>
    </li>
  );
};

export default CartListingItem;
