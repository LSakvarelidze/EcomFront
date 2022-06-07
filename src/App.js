import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./Reset.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Skeleton from "./components/SkeletonProduct"
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Profile from "./components/Auth/Profile";

const originalSetItem = localStorage.setItem;

localStorage.setItem = function () {
  const event = new Event("itemInserted");
  document.dispatchEvent(event);
  originalSetItem.apply(this, arguments);
};

function App() {
  const [product, setProduct] = useState(null);

  const fetchProducts = () => {
    fetch("https://52.59.5.211:8443/api/v1/products")
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
              product === null ? <Skeleton /> : <ProductList data={product} />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </HashRouter>
      <Footer />
    </React.Fragment>
  );
}

export default App;
