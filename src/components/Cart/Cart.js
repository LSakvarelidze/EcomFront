import react, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import CartSidebar from "./CartSidebar";

const Cart = (props) => {
  let dum = JSON.parse(localStorage.getItem("cartData"));

  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  useEffect(() => {
    var forStatetotal = 0;
    
    dum !== null &&
      dum.forEach((item) => {
        forStatetotal += item.qty;
      });
    setCartCount(forStatetotal)
  }, [cartCount]);

  useEffect(() => {
    const localStorageSetHandler = function (e) {
      let total = 1;
      let countTotal = JSON.parse(localStorage.getItem("cartData"));
      if (countTotal !== null) {
        countTotal.forEach((itm) => {
          total += itm.qty;
        });
      }
      setCartCount(total);
    };

    document.addEventListener("itemInserted", localStorageSetHandler, false);
  }, []);

  // Chekout Setting defined below

  const payFunc = (link) => {
    window.location.href = link
  };

  return (
    <>
      <div className={styles.cartbar} onClick={openCart} id="cart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.cartimg}
          viewBox="0 0 24 24"
        >
          <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
        </svg>
        <div className={styles.itemcount}>{cartCount}</div>
      </div>
      {showCart && (
        <CartSidebar checkOut={payFunc} toClose={closeCart} data={dum} />
      )}
    </>
  );
};

export default Cart;
