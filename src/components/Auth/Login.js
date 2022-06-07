import react from "react";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.loginWindow}>
      <div className={styles.notify}>Sample Text will be shown on error!</div>
      <form>
        <label>Username: </label>
        <input type="text"></input>
        <label>Password: </label>
        <input type="password"></input>
        <div className={styles.authbtns}>
          <button>Login</button>
          <div>
            <button>Forgot password?</button>
            <button>Register</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
