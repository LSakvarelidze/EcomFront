import react, { useEffect, useReducer, useState } from "react";
import styles from "./CartSidebar.module.css";
import CartSidebarItem from "./CartSidebarItem";
import loaderImg from "../../img/cartload.gif";

const CartSidebar = (props) => {
  const [totalAmt, setTotalAmt] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [qtyChange, setQtyChange] = useState(0)

  useEffect(() => {
    let tempTotal = 0;
    props.data !== null &&
      props.data.map((item) => {
        tempTotal += item.qty * item.price;
      });
    setTotalAmt(tempTotal.toFixed(2));
  }, [qtyChange]);

  const checkoutHandler = () => {
    setLoading(true);

    async function postData(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    postData("https://82.211.130.15/api/v1/payments/checkout", {
      amount: totalAmt,
    }).then((data) => {
      props.checkOut(data.data.links[1].uri); // JSON data parsed by `data.json()` call
    });
  };

  const qtyModHandler = (action, id) => {
    let getQtyData = JSON.parse(localStorage.getItem("cartData"))
    if(action === "+") {
      getQtyData[id].qty += 1
      localStorage.setItem("cartData", JSON.stringify(getQtyData))
    } 
    if(action === "-") {
      if(getQtyData[id].qty == 1) {
        getQtyData.splice(id, 1)
        localStorage.setItem("cartData", JSON.stringify(getQtyData))
      } else {
        getQtyData[id].qty -= 1
        localStorage.setItem("cartData", JSON.stringify(getQtyData))
      }
    }
    setQtyChange(Math.random())
  }

  return (
    <>
      <div className={styles.backdrop} onClick={props.toClose}></div>
      <div className={styles.sideBar} id="sideBar">
        <div className={styles.header}>Items in Cart</div>
        {props.data !== null &&
          props.data.map((el) => (
            <CartSidebarItem
              key={Math.random()}
              id={el.id}
              title={el.title}
              price={el.price}
              img={el.img}
              qty={el.qty}
              qtymod={qtyModHandler}
            />
          ))}
        {isLoading ? (
          <div className={styles.loadanim}>
            <img src={loaderImg} alt="loading..." />
          </div>
        ) : totalAmt == 0 ? (
          <span className={styles.total}>No items in the cart!</span>
        ) : (
          <>
            <span className={styles.total}>Total: {totalAmt} ₾</span>
            <button className={styles.sideBarBtn} onClick={checkoutHandler}>
              Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
