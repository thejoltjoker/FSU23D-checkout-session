import { Product } from "../../../models/Product";
import ShopProductListItem from "./ShopProductListItem";

interface ShopProductListProps {
  products: Product[];
}

const ShopProductList = ({ products }: ShopProductListProps) => {
  return (
    <div className="flex w-full flex-wrap gap-12">
      {products?.map((product) => (
        <ShopProductListItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ShopProductList;
