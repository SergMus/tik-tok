import React, { useEffect, useState } from "react";
import styles from "./TrendingFeed.module.css";
import { Link } from "react-router-dom";
import avatar from "./../../assets/images/avatar.png";
import Spinner from "./../../components/Spinner";
import Video from "./../../components/Video";

const TrendingFeed = ({ setUsername }) => {
  const [feed, setFeed] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://tiktok33.p.rapidapi.com/trending/feed", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "tiktok33.p.rapidapi.com",
        "x-rapidapi-key": "c1257dc04cmshd888bbb072eb770p1f2b8ajsnbf16d4cd1d66",
      },
    })
      .then((response) => response.json())
      .then(
        (result) => {
          setFeed(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);
  if (error) {
    return <div>Some error occurs: {error.message}. Try again later</div>;
  } else if (!isLoaded) {
    return (
      <div className={styles.spinner_box}>
        <Spinner />
      </div>
    );
  } else {
    console.log(feed);
    return (
      <div className={styles.trending_container}>
        {feed.map((feed) => {
          return (
            <div className={styles.content_wrapper} key={feed.id}>
              <Link to="/user">
                <span
                  className={styles.avatar_tiktok_box}
                  onClick={() => setUsername(feed.authorMeta.name)}
                >
                  <img
                    src={feed.authorMeta.avatar ?? avatar}
                    alt=""
                    className={styles.avatar_image}
                  />
                </span>
              </Link>
              <div className={styles.feed_item_content}>
                <div className={styles.author_info}>
                  <Link to="/user">
                    <h3
                      style={{ marginRight: 5 }}
                      onClick={() => setUsername(feed.authorMeta.name)}
                    >
                      {feed.authorMeta.name}
                    </h3>
                  </Link>
                  <Link to="/user">
                    <h4 onClick={() => setUsername(feed.authorMeta.name)}>
                      {feed.authorMeta.nickName}
                    </h4>
                  </Link>
                </div>
                <div className={styles.video_caption}>
                  {feed.authorMeta.signature}
                </div>
                <div className={styles.item_follow_wrapper}>
                  <button className={styles.item_follow_btn}>Follow</button>
                </div>
                <Link to="/user">
                  <div className={styles.soundtrack}>
                    <i className="fas fa-music"></i> {feed.musicMeta.musicName}
                  </div>
                </Link>
                <div className={styles.video_container}>
                  <Video feed={feed} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default TrendingFeed;
