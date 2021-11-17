import React, { useEffect, useState } from "react";
import styles from "../components/ActionBar.module.css";
import { calc } from "../helpers/calculateBarCount";

const ActionBar = ({ heart, comment, share }) => {
  const [hearts, setHearts] = useState(null);
  const [comments, setComments] = useState(null);
  const [shares, setShares] = useState(null);

  useEffect(() => {
    setHearts(calc(heart));
    setComments(calc(comment));
    setShares(calc(share));
  }, [heart, comment, share]);

  return (
    <div className={styles.action_bar}>
      <div className={styles.item_bar_wrapper}>
        <div className={styles.item_bar_icon}>
          <i className="fas fa-heart"></i>
        </div>
        <div className={styles.item_bar_text}>{hearts}</div>
      </div>
      <div className={styles.item_bar_wrapper}>
        <div className={styles.item_bar_icon}>
          <i className="fas fa-comment-dots"></i>
        </div>
        <div className={styles.item_bar_text}>{comments}</div>
      </div>
      <div className={styles.item_bar_wrapper}>
        <div className={styles.item_bar_icon}>
          <i className="fas fa-share"></i>
        </div>
        <div className={styles.item_bar_text}>{shares}</div>
      </div>
    </div>
  );
};

export default ActionBar;
