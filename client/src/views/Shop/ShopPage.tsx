import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Product } from "../../models/Product";
import { getAllProducts } from "../../services/products.service";
import ShopProductList from "./components/ShopProductList";

const ShopPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    let ignore = false;
    if (products) return;
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        if (!ignore) {
          setProducts(
            response.data
              .filter((product) => product.active)
              .sort((a, b) => (a.metadata.order > b.metadata.order ? 1 : -1)),
          );
          setIsError(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error while getting products");
        setIsError(true);
      }
    };
    fetchProducts();
    return () => {
      ignore = true;
    };
  }, [products]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mx-auto flex w-full max-w-screen-xl flex-wrap py-8">
          <h2 className="w-full pb-24 pt-8 text-center text-4xl text-brown-950 md:text-6xl">
            Our Products
          </h2>

          <ShopProductList products={products ?? []} />
        </div>
      )}
      {isError && "An error occured..."}
    </>
  );
};

export default ShopPage;
