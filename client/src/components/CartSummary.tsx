// TODO Disallow checkout without signing in first
import axios from "axios";
import getSymbolFromCurrency from "currency-symbol-map";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { useUserContext } from "../contexts/UserContext";
import { Coupon } from "../models/Coupon";
import { Session } from "../models/Session";
import { Button } from "./Button";

type CartSummaryProps = {
  coupon: Coupon | null;
};
const CartSummary = ({ coupon }: CartSummaryProps) => {
  const { products } = useShoppingCartContext();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const currencySymbol = getSymbolFromCurrency(
    (products.length > 0 && products[0].default_price.currency) || "€",
  );

  type LineItem = {
    price: string;
    quantity: number;
  };

  type CreateSessionBody = {
    line_items: LineItem[];
    discounts: [{ coupon: string }];
  };

  const handleCheckout = async () => {
    const priceQuantity = _.countBy(products, "default_price.id");

    try {
      const body: CreateSessionBody = {
        line_items: Object.keys(priceQuantity).map((id) => {
          return { price: id, quantity: priceQuantity[id] };
        }),
        discounts: [{ coupon: coupon?.id ?? "" }],
      };

      const response = await axios.post<Session>(
        "http://localhost:3000/api/checkout/session/create",
        body,
        { withCredentials: true },
      );
      window.location.replace(response.data.url);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <section>
      <h2 className="pb-8 text-4xl">Summary</h2>
      <div className="grid grid-cols-2 gap-2 text-lg">
        <p>Discount code</p>
        <p className="text-right">{coupon ? coupon.id : "None"}</p>
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
        {user ? (
          <Button className="col-span-full mt-8" onPress={handleCheckout}>
            Checkout
          </Button>
        ) : (
          <Button className="col-span-full mt-8" onPress={handleLogin}>
            Log in to proceed
          </Button>
        )}
      </div>
    </section>
  );
};

export default CartSummary;
