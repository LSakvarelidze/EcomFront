import react, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Modal = (props) => {
  const [msgTxt, setMsgTxt] = useState(false);

  const sendAndDisable = () => {
    props.toSlack();
    setMsgTxt(true);
  };
  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.backdrop} onClick={props.toClose}></div>
      <div className={styles.modal}>
        <div
          style={{
            border: "0px #ffffff none",
            backgroundColor: "white",
            width: props.width,
            height: props.height,
            color: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 2rem 0 2rem"
          }}
        >
          {msgTxt ? (
            <h3>შეტყობინება გაგზავნილია, მაქსიმუმ 1 წუთში მიარეფრეშე!</h3>
          ) : (
            <>
              <h3>{props.content.title}</h3>
              <br />
              <button onClick={sendAndDisable} id="slkBtnAct">
                {props.content.btnTxt}
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
