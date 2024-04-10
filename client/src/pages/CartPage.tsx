import _ from "lodash";
import CartListingItem from "../components/CartListingItem";
import CartSummary from "../components/CartSummary";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Product } from "../models/Product";

// TODO Add items one by one instead of quantity?
// TODO Send coupon to checkout
// TODO add checkout functionality
const CartPage = () => {
  const { products } = useShoppingCartContext();

  return (
    <div className="mx-auto flex h-screen max-w-screen-xl gap-16 py-24 pt-navbar">
      <div className="w-2/3">
        <section className="mb-8">
          <h2 className="text-4xl">Your cart</h2>
          <ul className="flex flex-col pt-8">
            {_.sortBy(_.uniqBy(products, "id"), "name").map(
              (product: Product) => (
                <CartListingItem product={product} key={product.id} />
              ),
            )}
          </ul>
        </section>
        <section>
          <p className="">Have a discount code?</p>
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount code"
            className="rounded-full px-3"
          />
        </section>
        <section>
          <h2 className="text-4xl">Address</h2>
          <input
            type="text"
            name=""
            id=""
            placeholder="Postkod"
            className="rounded-full px-3"
          />
        </section>
      </div>
      <div className="w-1/3">
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
