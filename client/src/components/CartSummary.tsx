import getSymbolFromCurrency from "currency-symbol-map";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Product } from "../models/Product";
import Button from "./Button";

const CartSummary = () => {
  const { products } = useShoppingCartContext();
  return (
    <section>
      <h2 className="pb-8 text-4xl">Summary</h2>
      <div className="grid grid-cols-2 gap-2 text-lg">
        <p>Discount</p>
        <p className="text-right">CODE</p>
        <p>Shipping</p>
        <p className="text-right">Free</p>
        <p>Tax</p>
        <p className="text-right">
          {getSymbolFromCurrency(products[0].default_price.currency)} 0
        </p>
        <p>Subtotal</p>
        <p className="text-right">
          {getSymbolFromCurrency(products[0].default_price.currency)}{" "}
          {products.reduce(
            (accumulator, currentValue: Product) =>
              accumulator + currentValue.default_price.unit_amount / 100,
            0,
          )}
        </p>
        <hr className="col-span-full border-dawn-300" />
        <p className="font-bold">Total</p>
        <p className="text-right font-bold">
          {getSymbolFromCurrency(products[0].default_price.currency)}{" "}
          {products.reduce(
            (accumulator, currentValue: Product) =>
              accumulator + currentValue.default_price.unit_amount / 100,
            0,
          )}
        </p>
        <Button className="col-span-full mt-8">Checkout</Button>
      </div>
    </section>
  );
};

export default CartSummary;
