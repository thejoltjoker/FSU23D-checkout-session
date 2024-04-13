import { useState } from "react";
import { Button } from "../../../components/buttons/Button";
import NumberField from "../../../components/forms/NumberField";
import { useShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import { Product } from "../../../models/Product";
import { ShoppingCartActionType } from "../../../reducers/shoppingCartReducer";

interface ShopProductListItemProps {
  product: Product;
}

const ShopProductListItem = ({ product }: ShopProductListItemProps) => {
  const { dispatch } = useShoppingCartContext();
  const [quantity, setQuantity] = useState(1);
  const [buttonText, setButtonText] = useState("Add to cart");

  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: ShoppingCartActionType.ADD,
        payload: { product: product, quantity: quantity },
      });
      setQuantity(1);
      setButtonText("Added");
      setTimeout(() => {
        setButtonText("Add to cart");
      }, 2000);
    }
  };

  return (
    <div className="group flex w-full flex-col md:flex-row">
      <div className="flex shrink grow basis-2/3 items-center justify-center group-[:nth-child(odd)]:order-1 md:group-[:nth-child(even)]:order-2">
        <img
          src={`${product?.images[0]}`}
          alt=""
          className="w-full md:group-[:nth-child(even)]:-scale-x-100"
        />
      </div>
      <div className="flex grow basis-3/5 items-center rounded-4xl bg-banana-50 p-8 shadow-box group-[:nth-child(even)]:order-1 group-[:nth-child(odd)]:order-2 md:p-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-5xl md:text-left md:text-6xl">
            {product?.name}
          </h2>
          <h4 className="text-center font-heading text-3xl text-brown-950/60 md:text-left md:text-4xl">
            Banana
          </h4>
          <div className="flex items-end justify-between pt-4 text-xl text-dawn-900 md:flex-col md:items-start md:pb-4">
            <p className="text-2xl md:text-3xl">
              <span className="text-base text-fern-500 md:text-lg">$</span>{" "}
              {product && product?.default_price.unit_amount / 100}
            </p>
            <p className="text-brown-950/60">Free Shipping</p>
          </div>
          <div className="pb-4 md:pb-5">
            <h4 className="text-2xl text-brown-950">Description</h4>
            <p className="text-dawn-700">{product?.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <NumberField
              minValue={1}
              value={quantity}
              onChange={(value) => {
                setQuantity(value);
                setButtonText("Add to cart");
              }}
            />
            <Button className="max-w-48 grow" onPress={handleAddToCart}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProductListItem;
