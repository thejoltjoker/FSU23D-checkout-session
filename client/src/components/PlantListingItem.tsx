import { Link } from "react-router-dom";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Product } from "../models/Product";

import getSymbolFromCurrency from "currency-symbol-map";
import { ShoppingCartActionType } from "../reducers/shoppingCartReducer";
import { Button } from "./Button";

type PlantListingItemProps = {
  product: Product;
};

const PlantListingItem = ({ product }: PlantListingItemProps) => {
  const { dispatch } = useShoppingCartContext();

  const currencySymbol = getSymbolFromCurrency(
    product.default_price.currency || "€",
  );

  const handleAddToCart = (product: Product) => {
    dispatch({ type: ShoppingCartActionType.ADD, payload: product });
  };

  return (
    <div className="text-center">
      <Link to={`/plants/${product.id}`}>
        <img
          src={`/img/${product.metadata.slug}.jpg`}
          alt=""
          className="mb-4 rounded-3xl"
        />
        <h4 className="text-3xl">{product.name}</h4>
        <p className="text-xl font-light">
          {currencySymbol} {product.default_price.unit_amount / 100}&nbsp;
        </p>
      </Link>
      <Button
        onPress={() => {
          handleAddToCart(product);
        }}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default PlantListingItem;
