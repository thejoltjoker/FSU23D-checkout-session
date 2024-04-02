import { useEffect, useState } from "react";

import { Product } from "../models/ProductsResponse";
import { getAllProducts } from "../services/products.service";

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    let ignore = false;
    if (products) return;
    const fetchProducts = async () => {
      try {
        // TODO also get all prices
        const response = await getAllProducts();
        if (!ignore) setProducts(response.data);
      } catch (error) {
        console.error("Error while getting products");
      }
    };
    fetchProducts();
    return () => {
      ignore = true;
    };
  });

  return (
    <>
      <div className="mx-auto flex w-full max-w-screen-xl">
        <div className="flex w-full flex-wrap gap-8">
          {products?.map((item) => (
            <div className="basis-1/3" key={item.id}>
              <img src={`/img/${item.metadata.slug}.jpg`} alt="" className="" />
              <h4 className="text-xl">{item.name}</h4>
              <p className="font-light">${item.default_price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopPage;
