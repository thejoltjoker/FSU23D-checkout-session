import { useEffect, useState } from "react";

import { Product } from "../models/Product";
import { getAllProducts } from "../services/products.service";
import ShopProductItem from "./ShopProductItem";

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    let ignore = false;
    if (products) return;
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        if (!ignore)
          setProducts(
            response.data
              .filter((product) => product.active)
              .sort((a, b) => (a.metadata.order > b.metadata.order ? 1 : -1)),
          );
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
      <div className="mx-auto flex w-full max-w-screen-xl flex-wrap py-8">
        <h2 className="text-brown-950 w-full py-40 text-center text-6xl">
          Our Products
        </h2>
        <div className="flex w-full flex-wrap gap-12">
          {products?.map((product) => (
            <ShopProductItem product={product} key={product.id} />
          ))}
          {/* <div className="flex grow basis-1/2 border">
            <img
              src="/img/fishhook-barrel-cactus.jpg"
              alt=""
              className="mb-4 w-1/2 rounded-3xl"
            />
            <div className="w-1/2">
              <p>Prickly pear</p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellat, beatae? Magni non sapiente porro consequatur, natus
                dolore dolores doloremque sint amet, facere, id sed quae illum
                saepe laborum ullam voluptatem!
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ShopPage;