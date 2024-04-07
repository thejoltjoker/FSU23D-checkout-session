import { Link } from "react-router-dom";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Product } from "../models/Product";

import { ShoppingCartActionType } from "../reducers/shoppingCartReducer";
import { Button } from "./Button";

type PlantListingItemProps = {
  product: Product;
};

const PlantListingItem = ({ product }: PlantListingItemProps) => {
  const { dispatch } = useShoppingCartContext();

  const handleAddToCart = (product: Product) => {
    dispatch({ type: ShoppingCartActionType.ADD, payload: product });
  };

  return (
    <div className="basis-1/3">
      <Link to={`/plants/${product.id}`}>
        <img src={`/img/${product.metadata.slug}.jpg`} alt="" className="" />
        <h4 className="text-xl">{product.name}</h4>
        <p className="font-light">
          {product.default_price.unit_amount / 100}&nbsp;
          {product.default_price.currency.toUpperCase()}
        </p>
        <Button
          onPress={() => {
            handleAddToCart(product);
          }}
        >
          Add to cart
        </Button>
      </Link>
    </div>
  );
};

export default PlantListingItem;
