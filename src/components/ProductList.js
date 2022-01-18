import react, { useState } from "react";
import styles from "./ProductList.module.css";
import Product from "./Product";

const ProductList = (props) => {

  const flyToCart = (prod, flyId) => {
    const pProdList = document.getElementById(flyId);
    const cartLoc = document.getElementById("cart");
    const pDiv = document.createElement("div");
    const pImage = document.createElement("img");
    pDiv.classList = styles.toCart;
    pImage.classList = styles.image;
    pImage.src = prod.img;
    pDiv.appendChild(pImage);
    pProdList.appendChild(pDiv);

    pDiv.animate(
      [
        {
          position: "fixed",
          top: pDiv.getBoundingClientRect().top + "px",
          left: pDiv.getBoundingClientRect().left + "px",
          opacity: "1",
          transform: "scale(1)",
        },
        {
          position: "fixed",
          top: "-5rem",
          left: cartLoc.getBoundingClientRect().left - 40 + "px",
          opacity: "0",
          transform: "scale(0)",
        },
      ],
      {
        duration: 1000,
        iterations: 1,
      }
    );

    setTimeout(() => {
      pProdList.removeChild(pDiv);
    }, 1000);

    const addToLocCart = (data) => {
      let storageItems = JSON.parse(localStorage.getItem("cartData"));
      let products = [];
      if (storageItems === null) {
        products.push(data);
        localStorage.setItem("cartData", JSON.stringify(products));
      } else {
        const found = storageItems.some((el) => el.id === data.id);
        if (found) {
          let idx = storageItems.findIndex((e) => e.id == data.id);
          products = storageItems
          products[idx].qty += 1
          localStorage.setItem("cartData", JSON.stringify(products));
        } else {
          products = storageItems
          products.push(data)
          localStorage.setItem("cartData", JSON.stringify(products));
        }
      }
    };
    
    addToLocCart(prod);
  };

  return (
    <div className={styles.prodlist}>
      {props.data.map((item) => (
        <Product
          key={item.id}
          id={item.id}
          title={item.title}
          img={item.image}
          price={item.price}
          qty={1}
          tocart={flyToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
