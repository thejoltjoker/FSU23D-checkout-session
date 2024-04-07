import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Product } from "../models/Product";

import { ShoppingCartActionType } from "../reducers/shoppingCartReducer";

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
      <img src={`/img/${product.metadata.slug}.jpg`} alt="" className="" />
      <h4 className="text-xl">{product.name}</h4>
      <p className="font-light">
        {product.default_price.unit_amount / 100}&nbsp;
        {product.default_price.currency.toUpperCase()}
      </p>
      <button
        onClick={() => {
          handleAddToCart(product);
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default PlantListingItem;
