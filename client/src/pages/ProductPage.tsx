import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../models/Product";
import axios from "axios";
import Button from "../components/Button";

const ProductPage = () => {
  const [product, setProduct] = useState<Product>({
    id: "987654321",
    name: "Golden Barrel Cactus",
    scientificName: "Echinocactus grusonii",
    description:
      "The Golden Barrel Cactus is a striking spherical cactus with golden spines. It's native to Mexico and is known for its ornamental value.",
    price: 29.99,
    currency: "USD",
    slug: "golden-barrel-cactus",
    stock: 20,
    category: "Cacti",
    tags: ["cactus", "succulent", "ornamental", "desert"],
  });
  const { slug } = useParams();

  useEffect(() => {
    let ignore = false;
    if (product) return;
    const fetchProduct = async () => {
      const response = await axios.get(slug ?? "");
      if (!ignore) setProduct(response.data);
    };
    fetchProduct();
    return () => {
      ignore = true;
    };
  });

  return (
    <div className="flex h-screen">
      <div className="h-screen w-1/2 bg-fern-200">
        <img
          src={`/img/${product?.slug}.jpg`}
          alt=""
          className="h-screen object-cover"
        />
      </div>
      <div className="flex w-1/2 items-center bg-white px-12">
        <div className="flex max-w-md flex-col gap-2">
          <h2 className="text-4xl">{product?.name}</h2>
          <h3 className="mb-2 font-sans text-xl font-light text-dawn-400">
            {product?.scientificName}
          </h3>
          <p className="mb-10 text-2xl font-light text-dawn-900">
            <span className="text-fern-500">$ </span>
            {product?.price}
          </p>
          <h4 className="text-2xl">Description</h4>
          <p className="text-dawn-700">{product?.description}</p>
          <div className="flex flex-wrap gap-6">
            <div className="flex">
              <button className="flex h-12 w-12 items-center justify-center rounded-l-full border border-dawn-300 text-xl">
                <span>-</span>
              </button>
              <input
                type="text"
                value={1}
                className="h-12 w-12 border-x-0 border-y border-dawn-300 text-center text-xl"
              />
              <button className="flex h-12 w-12 items-center justify-center rounded-r-full border border-dawn-300 text-xl">
                +
              </button>
            </div>
            <Button className="grow">Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
