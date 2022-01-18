import react, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Header.module.css";
import Cart from "./Cart/Cart";
import { FiLogIn } from "react-icons/fi";

import { Link } from "react-router-dom";

const Header = (props) => {
  const [searchRes, setSearchRes] = useState(null);

  const livesearch = (e) => {
    if (e.target.value == "" || e.target.value == null) {
      setSearchRes(null);
    } else {
      fetch("https://82.211.130.15/api/v1/products/search/" + e.target.value)
        .then((response) => response.json())
        .then((data) => data.length > 0 ? setSearchRes(data) : setSearchRes([{title: "Nothing found"}]))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}><Link to={"/"}>🏪</Link></div>
        <div className={styles.menu}>
          <ul className={styles.menuC}></ul>
        </div>
        <Cart />
      </header>
      <div className={styles.uheader}>
        <div className={styles.search}>
          <input
            type="text"
            onKeyUp={livesearch}
            className={styles.searchBar}
          />
          <button className={styles.searchBtn}>Search</button>
          <div className={searchRes === null ? styles.invisible : styles.sres}>
            {searchRes !== null &&
              searchRes.map((item) => (
                <ul>
                  <li key={Math.random()}>{item.title}</li>
                </ul>
              ))}
          </div>
        </div>
        <div className={styles.auth}>
          <button className={styles.authBtn}>
            <FiLogIn />
            &nbsp;Login / Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
