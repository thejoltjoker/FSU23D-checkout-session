import getSymbolFromCurrency from "currency-symbol-map";
import { Product } from "../models/Product";

type CartListingItemProps = {
  product: Product;
};

const CartListingItem = ({ product }: CartListingItemProps) => {
  return (
    <li className="flex w-full items-center border-b border-dawn-300 py-4">
      <img src={product.images[0]} alt="" className="me-4 max-w-24" />
      <div className="grow self-start">
        <h4 className="text-2xl">{product.name}</h4>
        <p className="text-dawn-500">{product.metadata.scientificName}</p>
      </div>
      <div className="me-8 inline-flex items-center">
        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-dawn-300">
          <span className="-mt-[2px]">-</span>
        </button>
        <p className="w-8 text-center">1</p>
        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-dawn-300">
          +
        </button>
      </div>
      <p className="text-xl font-bold">
        {getSymbolFromCurrency(product.default_price.currency)}&nbsp;
        {product.default_price.unit_amount / 100}
      </p>
    </li>
  );
};

export default CartListingItem;
