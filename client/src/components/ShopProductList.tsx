import { Product } from "../models/Product";
import ShopProductItem from "../pages/ShopProductItem";

type ShopProductListProps = {
  products: Product[];
};

const ShopProductList = ({ products }: ShopProductListProps) => {
  return (
    <div className="flex w-full flex-wrap gap-12">
      {products?.map((product) => (
        <ShopProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ShopProductList;
