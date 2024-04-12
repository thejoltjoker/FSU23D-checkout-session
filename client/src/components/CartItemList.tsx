import _ from "lodash";
import { CartItem } from "../models/CartItem";
import CartListingItem from "./CartListingItem";

type Props = {
  items: CartItem[];
};

const CartItemList = ({ items }: Props) => {
  return (
    <>
      <h2 className="pb-4 text-4xl text-brown-950">Your cart</h2>
      <ul className="flex flex-col gap-4">
        {_.sortBy(_.uniqBy(items, "product.id"), "name").map(
          (item: CartItem) => (
            <CartListingItem product={item.product} key={item.product.id} />
          ),
        )}
      </ul>
    </>
  );
};

export default CartItemList;
