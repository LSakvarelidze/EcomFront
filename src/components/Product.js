import react, { Children, cloneElement } from "react";
import styles from "./Product.module.css";
import Button from "./UI/Button";

const Product = (props) => {
  const flyId = `flyCart${props.id}`

  const prodHook = () => {
    props.tocart(props, flyId)
  }
  return (
    <div className={styles.product} id={flyId}>
      <h3 className={styles.title}>{props.title}</h3>
      <img src={props.img} className={styles.image} />
      <span className={styles.price}>{props.price} ₾</span>
      <Button addToCart={prodHook}>Add to cart</Button>
    </div>
  );
};

export default Product;
