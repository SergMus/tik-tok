import React from "react";
import styles from "./../components/Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.lds_grid}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
