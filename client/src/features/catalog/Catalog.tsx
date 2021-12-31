import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

interface Props {
  products: Product[];
  addProduct: () => void;
}

export default function Catalog({ products, addProduct }: Props) {
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
