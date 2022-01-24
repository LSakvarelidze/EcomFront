import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./Reset.css";
import ProductList from "./components/ProductList";
import Login from "./components/Auth/Login";

import { HashRouter, Routes, Route } from "react-router-dom";

const originalSetItem = localStorage.setItem;

localStorage.setItem = function () {
  const event = new Event("itemInserted");
  document.dispatchEvent(event);
  originalSetItem.apply(this, arguments);
};

function App() {
  const [product, setProduct] = useState(null);

  const fetchProducts = () => {
    fetch("https://82.211.130.15/api/v1/products")
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              product === null ? "No products" : <ProductList data={product} />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </HashRouter>
      <Footer />
    </React.Fragment>
  );
}

export default App;
