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
import { ServicePoint } from "../models/ServicePoint";
import { Address } from "../schemas/AddressSchema";

type CartSummaryProps = {
  coupon: Coupon | null;
  servicePoint: ServicePoint | undefined;
};
const CartSummary = ({ coupon, servicePoint }: CartSummaryProps) => {
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

  type Discounts = {
    coupon: string;
  };

  type PaymentIntentData = {
    shipping: ShippingDetails;
  };
  type ShippingDetails = {
    address: Address;
    name: string;
    carrier: string;
  };
  type SessionMetadata = {
    servicePointId: string | undefined;
  };

  type CreateSessionBody = {
    customer: string;
    metadata: SessionMetadata;
    payment_intent_data: PaymentIntentData;
    line_items: LineItem[];
    discounts: Discounts[];
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
        metadata: { servicePointId: servicePoint?.servicePointId },
        payment_intent_data: {
          shipping: {
            carrier: "PostNord",
            name: user?.name ?? "",
            address: {
              city: servicePoint?.deliveryAddress.city ?? null,
              country: servicePoint?.deliveryAddress.countryCode ?? null,
              line1:
                `${servicePoint?.deliveryAddress.streetName} ${servicePoint?.deliveryAddress.streetNumber}` ||
                null,
              line2: servicePoint?.deliveryAddress.countryCode ?? null,
              state: null,
              postal_code: servicePoint?.deliveryAddress.postalCode ?? null,
            },
          },
        },

        customer: user?.customerId ?? "",
        discounts: [],
      };
      if (coupon) {
        body.discounts = [{ coupon: coupon.id }];
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
      <h2 className="pb-4 text-4xl text-brown-950">Summary</h2>
      <div className="grid grid-cols-2 gap-2 rounded-3xl bg-banana-50 p-8 text-lg shadow-box">
        <p>Discount code</p>
        <p className="text-right">{coupon ? coupon.id : "None"}</p>
        <p>Delivers to</p>
        <p className="text-right">{servicePoint?.name}</p>
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
