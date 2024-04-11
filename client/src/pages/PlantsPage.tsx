import { useEffect, useState } from "react";

import PlantListingItem from "../components/PlantListingItem";

import { Product } from "../models/Product";
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
      <div className="from-zanah-500 mx-auto w-full max-w-screen-xl rounded rounded-3xl bg-gradient-to-br to-fern-800 p-8 text-white">
        <h1 className="py-40 ps-32 text-6xl">Our Products</h1>
      </div>
      <div className="mx-auto flex w-full max-w-screen-xl py-8">
        <div className="flex w-full flex-wrap gap-8">
          {products?.map((product) => (
            <div className="shrink grow basis-1/3">
              <PlantListingItem product={product} key={product.id} />
            </div>
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
