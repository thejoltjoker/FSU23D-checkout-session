import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../models/Product";

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>();
  useEffect(() => {
    let ignore = false;
    if (products) return;
    const fetchProducts = async () => {
      const response = await axios.get<Product[]>(`/products.json`);
      if (response.status == 200) {
        const data = response.data;
        if (!ignore) setProducts(data);
      }
    };
    fetchProducts();
    return () => {
      ignore = true;
    };
  });

  return (
    <div className="mx-auto flex w-full max-w-screen-xl">
      <div className="flex w-full flex-wrap gap-8">
        {products?.map((item) => (
          <div className="basis-1/3" key={item.id}>
            <img src={`/img/${item.slug}.jpg`} alt="" className="" />
            <h4 className="text-xl">{item.name}</h4>
            <p className="font-light">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
