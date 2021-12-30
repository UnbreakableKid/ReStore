import { useEffect, useState } from "react";
import "./App.css";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5034/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
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
    <div>
      <h1>Re-Store</h1>
      <Catalog products={products} addProduct={addProduct} />
    </div>
  );
}

export default App;
