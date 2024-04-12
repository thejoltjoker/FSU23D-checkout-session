import { useState } from "react";
import CartItemList from "../components/CartItemList";
import CartSummary from "../components/CartSummary";
import CheckoutShipping from "../components/CheckoutShipping";
import PromotionEntry from "../components/PromotionEntry";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Coupon } from "../models/Coupon";
import { ServicePoint } from "../models/ServicePoint";

// TODO Mobile layout
// TODO Add validation before checkout
// TODO Disable checkout button until valid
const CartPage = () => {
  const [coupon, setCoupon] = useState<Coupon>();
  const [servicePoint, setServicePoint] = useState<ServicePoint>();
  const { items } = useShoppingCartContext();

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-8 py-16 md:flex-row">
      <div className="flex grow basis-2/3 flex-col gap-4">
        <section className="mb-8">
          <CartItemList items={items} />
        </section>
        <section className="rounded-3xl bg-banana-50 p-8 shadow-box">
          <h4 className="text-2xl">Discount</h4>
          <p className="pb-4 text-brown-950/60">Have a discount code?</p>
          <PromotionEntry setCoupon={(value: Coupon) => setCoupon(value)} />
        </section>

        <section>
          <CheckoutShipping
            servicePoint={servicePoint}
            setServicePoint={setServicePoint}
          />
        </section>
      </div>
      <div className="shrink grow basis-1/3">
        <CartSummary coupon={coupon ?? null} servicePoint={servicePoint} />
      </div>
    </div>
  );
};

export default CartPage;
