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
  const { items } = useShoppingCartContext();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const currencySymbol = getSymbolFromCurrency(
    (items.length > 0 && items[0].product.default_price.currency) || "€",
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
    try {
      const body: CreateSessionBody = {
        line_items: items.map((item) => {
          return {
            price: item.product.default_price.id,
            quantity: item.quantity,
          };
        }),
      };
      if (coupon) {
        body.discounts = [{ coupon: coupon?.id ?? "" }];
      }
      console.log(body);

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
      <h2 className="text-brown-950 pb-4 text-4xl">Summary</h2>
      <div className="bg-banana-50 shadow-box grid grid-cols-2 gap-2 rounded-3xl p-8 text-lg">
        <p>Discount code</p>
        <p className="text-right">{coupon ? coupon.id : "None"}</p>
        <p>Shipping</p>
        <p className="text-right">Free</p>
        <p>Tax</p>
        <p className="text-right">{currencySymbol} 0</p>
        <p>Subtotal</p>
        <p className="text-right">
          {currencySymbol}{" "}
          {_.round(
            _.reduce(
              items,
              (sum, item) => {
                return (
                  sum + item.product.default_price.unit_amount * item.quantity
                );
              },
              0,
            ) / 100,
            2,
          )}
        </p>
        <hr className="col-span-full border-dawn-300" />
        <p className="font-bold">Total</p>
        <p className="text-right font-bold">
          {currencySymbol}{" "}
          {_.round(
            _.reduce(
              items,
              (sum, item) => {
                return (
                  sum + item.product.default_price.unit_amount * item.quantity
                );
              },
              0,
            ) / 100,
            2,
          )}
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
