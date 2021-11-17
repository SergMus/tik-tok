import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/images/logo.jpg";
import styles from "./../components/Header.module.css";

const Header = () => {
  return (
    <div className={styles.header_container}>
      <div className={styles.header_content}>
        <div className={styles.header_logo}>
          <Link to="/">
            <img id={styles.tiktok_image} src={logo} alt="logo" />
          </Link>
        </div>
        <div className={styles.search_container}>
          <form action="/search" className={styles.header_form}>
            <input
              type="search"
              placeholder="search accounts and videos"
              className={styles.header_input}
            />
            <span className={styles.split}></span>
            <button type="submit" className={styles.header_search_btn}>
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <button type="button" className={styles.login_btn}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
