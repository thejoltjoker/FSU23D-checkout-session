import _ from "lodash";
import { useState } from "react";
import CartListingItem from "../components/CartListingItem";
import CartSummary from "../components/CartSummary";
import PromotionEntry from "../components/PromotionEntry";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { CartItem } from "../models/CartItem";
import { Coupon } from "../models/Coupon";
import CheckoutShipping from "../components/CheckoutShipping";
import { ServicePoint } from "../models/ServicePoint";

// TODO Add items one by one instead of quantity?

const CartPage = () => {
  const [coupon, setCoupon] = useState<Coupon>();
  const [servicePoint, setServicePoint] = useState<ServicePoint>();
  const { items } = useShoppingCartContext();

  return (
    <div className="mx-auto flex h-screen max-w-screen-xl gap-8 py-24 pt-navbar">
      <div className="flex w-2/3 flex-col gap-4">
        <section className="mb-8">
          <h2 className="pb-4 text-4xl text-brown-950">Your cart</h2>
          <ul className="flex flex-col gap-4">
            {_.sortBy(_.uniqBy(items, "product.id"), "name").map(
              (item: CartItem) => (
                <CartListingItem product={item.product} key={item.product.id} />
              ),
            )}
          </ul>
        </section>
        <section className="rounded-3xl bg-banana-50 p-8 shadow-box">
          <h4 className="text-2xl">Discount</h4>
          <p className="pb-4 text-brown-950/60">Have a discount code?</p>
          <PromotionEntry setCoupon={(value: Coupon) => setCoupon(value)} />
        </section>
        {/* TODO add shipping with postnord api */}
        <section>
          <CheckoutShipping
            servicePoint={servicePoint}
            setServicePoint={setServicePoint}
          />
        </section>
      </div>
      <div className="w-1/3">
        <CartSummary coupon={coupon ?? null} servicePoint={servicePoint} />
      </div>
    </div>
  );
};

export default CartPage;
