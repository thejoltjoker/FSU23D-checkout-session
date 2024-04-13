import axios from "axios";
import getSymbolFromCurrency from "currency-symbol-map";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import Stripe from "stripe";
import RoundedContainer from "../../../components/RoundedContainer";
import { Button } from "../../../components/buttons/Button";
import { useShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import { useUserContext } from "../../../contexts/UserContext";
import { Coupon } from "../../../models/Coupon";
import { ServicePoint } from "../../../models/ServicePoint";
import { Session } from "../../../models/Session";

interface CartSessionMetadata extends Stripe.MetadataParam {
  servicePointId: string | null;
}

interface CartSessionCreateParams extends Stripe.Checkout.SessionCreateParams {
  metadata: CartSessionMetadata;
}

interface CartSummaryProps {
  coupon: Coupon | null;
  servicePoint: ServicePoint | undefined;
}

const CartSummary = ({ coupon, servicePoint }: CartSummaryProps) => {
  const { items } = useShoppingCartContext();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const currencySymbol = getSymbolFromCurrency(
    (items.length > 0 && items[0].product.default_price.currency) || "€",
  );

  const handleCheckout = async () => {
    try {
      const body: CartSessionCreateParams = {
        line_items: items.map((item) => {
          return {
            price: item.product.default_price.id,
            quantity: item.quantity,
          };
        }),
        metadata: { servicePointId: servicePoint?.servicePointId ?? null },
        payment_intent_data: {
          shipping: {
            carrier: "PostNord",
            name: user?.name ?? "",
            address: {
              city: servicePoint?.deliveryAddress.city,
              country: servicePoint?.deliveryAddress.countryCode,
              line1: `${servicePoint?.deliveryAddress.streetName} ${servicePoint?.deliveryAddress.streetNumber}`,
              line2: servicePoint?.deliveryAddress.countryCode,
              postal_code: servicePoint?.deliveryAddress.postalCode,
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
      response.data.url && window.location.replace(response.data.url);
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

      <RoundedContainer>
        <div className="grid grid-cols-2 gap-2">
          <p className="font-heading font-bold uppercase">Discount code</p>
          <p className="text-right">{coupon ? coupon.id : "None"}</p>
          <p className="font-heading font-bold uppercase">Delivers to</p>
          <p className="text-right">
            {servicePoint?.name ?? (
              <span className="text-brown-600 underline">Not set</span>
            )}
          </p>
          <p className="font-heading font-bold uppercase">Shipping</p>
          <p className="text-right">Free</p>
          <p className="font-heading font-bold uppercase">Tax</p>
          <p className="text-right">{currencySymbol} 0</p>
          <p className="font-heading font-bold uppercase">Subtotal</p>
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
          <p className="font-heading font-bold uppercase">Total</p>
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
            <Button
              className="col-span-full mt-8"
              onPress={handleCheckout}
              isDisabled={!servicePoint || items.length === 0}
            >
              Checkout
            </Button>
          ) : (
            <Button className="col-span-full mt-8" onPress={handleLogin}>
              Log in to proceed
            </Button>
          )}
        </div>
      </RoundedContainer>
    </section>
  );
};

export default CartSummary;
