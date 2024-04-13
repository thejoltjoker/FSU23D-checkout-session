import { useState } from "react";
import { useShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { Coupon } from "../../models/Coupon";
import { ServicePoint } from "../../models/ServicePoint";
import CartDiscount from "./components/CartDiscount";
import CartItemList from "./components/CartItemList";
import CartShipping from "./components/CartShipping";
import CartSummary from "./components/CartSummary";

// TODO Add validation before checkout
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
        <section>
          <CartDiscount setCoupon={(value) => setCoupon(value)} />
        </section>

        <section>
          <CartShipping
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
