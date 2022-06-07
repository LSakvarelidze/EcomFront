import react, { useState } from "react";
import styles from "./SkeletonProduct.module.css";
import Button from "./UI/Button";
import axios from "axios";
import Modal from "../components/UI/Modal";

const SkeletonProduct = (props) => {
  const [modalMsg, setModalMsg] = useState(false);

  const toLevan = () => {
    let slk = [
      "https:",
      "",
      "hooks.slack.com",
      "services",
      "TNX589ZLM",
      "B038X3V726P",
      "bRWCzXBhuzhqCVt8TcpAFJ1V",
    ];
    let fslk = slk.join("/");
    var config = {
      method: "post",
      url: fslk,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { text: "საიტი გათიშულია, ჩართე!" },
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  setTimeout(() => {
    setModalMsg(true);
  }, 3000);

  return modalMsg ? (
    <Modal
      toSlack={toLevan}
      width="400px"
      height="200px"
      content={{
        title: "როგორ ჩანს სერვერი გათიშულია",
        btnTxt: "მოითხოვე ჩართვა!",
      }}
    />
  ) : (
    <div className={styles.container}>
      <div className={styles.product}>
        <h3 className={styles.title}></h3>
        <div className={styles.image}></div>
        <span className={styles.price}></span>
        <button className={styles.button}></button>
      </div>
      <div className={styles.product}>
        <h3 className={styles.title}></h3>
        <div className={styles.image}></div>
        <span className={styles.price}></span>
        <button className={styles.button}></button>
      </div>
      <div className={styles.product}>
        <h3 className={styles.title}></h3>
        <div className={styles.image}></div>
        <span className={styles.price}></span>
        <button className={styles.button}></button>
      </div>
    </div>
  );
};

export default SkeletonProduct;
