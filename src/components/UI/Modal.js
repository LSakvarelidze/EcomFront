import react from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.backdrop} onClick={props.toClose}></div>
      <div className={styles.modal}>
        <iframe
          src={props.link}
          style={{"border":"0px #ffffff none;", "backgroundColor": "white"}}
          name="myiFrame"
          scrolling="no"
          frameborder="1"
          marginheight="0px"
          marginwidth="0px"
          height="600px"
          width="600px"
          allowfullscreen
        ></iframe>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
