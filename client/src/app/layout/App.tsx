import "./App.css";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/catalog" component={Catalog} />
        <Route path="/catalog/:id" component={ProductDetails} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/server-error" component={ServerError} />
        <Route path="/basket" component={BasketPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
