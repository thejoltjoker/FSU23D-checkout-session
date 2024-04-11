import { useState } from "react";
import { Button } from "../components/Button";
import NumberField from "../components/NumberField";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Product } from "../models/Product";
import { ShoppingCartActionType } from "../reducers/shoppingCartReducer";
type ShopProductItemProps = {
  product: Product;
};
const ShopProductItem = ({ product }: ShopProductItemProps) => {
  const { dispatch } = useShoppingCartContext();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: ShoppingCartActionType.ADD,
        payload: { product: product, quantity: quantity },
      });
    }
  };

  return (
    <div className="group flex">
      <div className="shrink grow basis-2/3 group-[:nth-child(even)]:order-2 group-[:nth-child(odd)]:order-1">
        <img
          src={`${product?.images[0]}`}
          alt=""
          className="w-full group-[:nth-child(even)]:-scale-x-100"
        />
      </div>
      <div className="rounded-4xl bg-banana-50 shadow-box flex grow basis-3/5 items-center p-12 group-[:nth-child(even)]:order-1 group-[:nth-child(odd)]:order-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-6xl">{product?.name}</h2>
          <h3 className="font-heading text-brown-950/60 mb-2 text-4xl">
            Banana
          </h3>
          <p className="mb-8 text-xl text-dawn-900">
            <span className="text-fern-500">$ </span>
            <span className="text-3xl">
              {product && product?.default_price.unit_amount / 100}
            </span>
            <br />
            <span className="text-brown-950/60">Free Shipping</span>
          </p>
          <h4 className="text-2xl">Description</h4>
          <p className="text-dawn-700">{product?.description}</p>
          <div className="mt-8 flex flex-wrap gap-6">
            {/* TODO Add quantity part */}
            {/* <div className="flex">
              <RACButton
                className="flex h-12 w-12 items-center justify-center rounded-l-full border border-dawn-300 text-xl"
                onPress={(e) =>
                  setQuantity(quantity - 1 < 0 ? 0 : quantity - 1)
                }
              >
                <span>-</span>
              </RACButton>
              <input
                type="text"
                value={quantity}
                className="h-12 w-12 border-x-0 border-y border-dawn-300 text-center text-xl"
              />
              <RACButton
                className="flex h-12 w-12 items-center justify-center rounded-r-full border border-dawn-300 text-xl"
                onPress={(e) => setQuantity(quantity + 1)}
              >
                +
              </RACButton>
            </div> */}
            <NumberField minValue={1} value={quantity} onChange={setQuantity} />
            <Button className="max-w-48 grow" onPress={handleAddToCart}>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProductItem;
