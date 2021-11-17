import React from "react";
import styles from "./../components/TrendingSidebar.module.css";

const TrendingSidebar = () => {
  return (
    <div className={styles.sidebar_container}>
      <div className={styles.btn} style={{ color: "#fe2c55" }}>
        <i
          className="fas fa-home"
          style={{ marginRight: "10px", fontSize: 20 }}
        ></i>
        For you
      </div>
      <div className={styles.btn}>
        <i
          className="fas fa-user-friends"
          style={{ marginRight: "10px", fontSize: 20 }}
        ></i>
        Following
      </div>
      <hr className={styles.btns_line}></hr>
      <div className={styles.content_text}>
        Log in to follow creators, like videos, and view comments.
      </div>
      <div className={styles.login_button}>Log in</div>
      <hr className={styles.btns_line}></hr>
    </div>
  );
};

export default TrendingSidebar;
