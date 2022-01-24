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
          <button>Login</button>
          <button>Forgot password?</button>
          <button>Register</button>
        </form>
      </div>
  );
};

export default Login;
