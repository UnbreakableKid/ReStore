import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((response) => setProducts(response))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  // function addProduct() {
  //   setProducts((prevState) => [
  //     ...products,
  //     {
  //       id: prevState.length + 101,
  //       name: "Product " + (prevState.length + 1),
  //       price: (prevState.length + 1) * 100,
  //       brand: "some brand",
  //       description: "some description",
  //       pictureURL: "some picture",
  //     },
  //   ]);
  // }

  if (isLoading) return <LoadingComponent message="Loading Products..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
