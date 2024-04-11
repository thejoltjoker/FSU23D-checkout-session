import _ from "lodash";
import { useState } from "react";
import CartListingItem from "../components/CartListingItem";
import CartSummary from "../components/CartSummary";
import PromotionEntry from "../components/PromotionEntry";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { CartItem } from "../models/CartItem";
import { Coupon } from "../models/Coupon";

// TODO Add items one by one instead of quantity?

const CartPage = () => {
  const [coupon, setCoupon] = useState<Coupon>();
  const { items } = useShoppingCartContext();

  return (
    <div className="mx-auto flex h-screen max-w-screen-xl gap-4 py-24 pt-navbar">
      <div className="flex w-2/3 flex-col gap-4">
        <section className="mb-8">
          <h2 className="text-brown-950 pb-4 text-4xl">Your cart</h2>
          <ul className="flex flex-col gap-4">
            {_.sortBy(_.uniqBy(items, "product.id"), "name").map(
              (item: CartItem) => (
                <CartListingItem product={item.product} key={item.product.id} />
              ),
            )}
          </ul>
        </section>
        <section className="bg-banana-50 rounded-3xl p-8">
          <h4 className="text-2xl">Discount</h4>
          <p className="text-brown-950/60 pb-4">Have a discount code?</p>
          <PromotionEntry setCoupon={(value: Coupon) => setCoupon(value)} />
        </section>
        {/* TODO add shipping with postnord api */}
        {/* <section>
          <CheckoutShipping />
        </section> */}
      </div>
      <div className="w-1/3">
        <CartSummary coupon={coupon ?? null} />
      </div>
    </div>
  );
};

export default CartPage;
