import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    agent.Catalog.list().then((response) => setProducts(response));
  }, []);

  function addProduct() {
    setProducts((prevState) => [
      ...products,
      {
        id: prevState.length + 101,
        name: "Product " + (prevState.length + 1),
        price: (prevState.length + 1) * 100,
        brand: "some brand",
        description: "some description",
        pictureURL: "some picture",
      },
    ]);
  }

  return (
    <>
      <ProductList products={products} />
      <Button
        p={4}
        leftIcon={<AddIcon />}
        colorScheme="blue"
        onClick={addProduct}
      >
        Add Product
      </Button>
    </>
  );
}
