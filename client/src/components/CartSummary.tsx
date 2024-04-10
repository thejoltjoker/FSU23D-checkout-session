import getSymbolFromCurrency from "currency-symbol-map";
import _ from "lodash";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Button } from "./Button";

const CartSummary = () => {
  const { products } = useShoppingCartContext();
  const currencySymbol = getSymbolFromCurrency(
    (products.length > 0 && products[0].default_price.currency) || "€",
  );
  return (
    <section>
      <h2 className="pb-8 text-4xl">Summary</h2>
      <div className="grid grid-cols-2 gap-2 text-lg">
        <p>Discount code</p>
        <p className="text-right">{"None"}</p>
        <p>Shipping</p>
        <p className="text-right">Free</p>
        <p>Tax</p>
        <p className="text-right">{currencySymbol} 0</p>
        <p>Subtotal</p>
        <p className="text-right">
          {currencySymbol}{" "}
          {_.round(_.sumBy(products, "default_price.unit_amount") / 100, 2)}
        </p>
        <hr className="col-span-full border-dawn-300" />
        <p className="font-bold">Total</p>
        <p className="text-right font-bold">
          {currencySymbol}{" "}
          {_.round(_.sumBy(products, "default_price.unit_amount") / 100, 2)}
        </p>
        <Button className="col-span-full mt-8">Checkout</Button>
      </div>
    </section>
  );
};

export default CartSummary;
