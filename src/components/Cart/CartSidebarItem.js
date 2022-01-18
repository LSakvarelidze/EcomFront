import { data } from "jquery";
import react, { useState } from "react";
import styles from "./CartSidebarItem.module.css";

const CartSidebarItem = (props) => {
  const [curQty, setCurQty] = useState(props.qty);

  const qtyHandler = (e) => {
    let datas = JSON.parse(localStorage.getItem("cartData"))
    let index = datas.findIndex(p => p.id == props.id);
    props.qtymod(e.target.innerText, index);
  };

  return (
    <div className={styles.inCartItems}>
      <div className={styles.itm}>
        <div className={styles.itmLeft}>
          <h2>{props.title}</h2>
          <img src={props.img} width="100px" />
          <span>Price: {props.price} ₾</span>
          <div className={styles.itmRight}>
            <span>QTY: {props.qty}</span>
            <button className={styles.qtyBtn} onClick={qtyHandler}>
              +
            </button>
            <button className={styles.qtyBtn} onClick={qtyHandler}>
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebarItem;
