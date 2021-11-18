import React, { useEffect, useState } from "react";
import styles from "./User.module.css";
import avatar from "./../../assets/images/avatar.png";
import Spinner from "../../components/Spinner";
import { calc } from "../../helpers/calculateBarCount";
let queryData = require("./../../assets/data/user-feed.json");

const User = ({ username }) => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [likes, setLikes] = useState(0);
  const [feed, setFeed] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let maxItemsPerPage = 6;

  const changePage = (direction) => {
    if (direction === "back") {
      setCurrentPage(() => currentPage - 1);
    } else if (direction === "next") {
      setCurrentPage(() => currentPage + 1);
    }
  };

  useEffect(() => {
    fetch(`https://tiktok33.p.rapidapi.com/user/info/${username}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "tiktok33.p.rapidapi.com",
        "x-rapidapi-key": "c1257dc04cmshd888bbb072eb770p1f2b8ajsnbf16d4cd1d66",
      },
    })
      .then((response) => response.json())
      .then(
        (result) => {
          setUser(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, [username]);

  useEffect(() => {
    if (user.stats !== undefined) {
      setFollowers(calc(user.stats.followerCount));
      setFollowing(calc(user.stats.followingCount));
      setLikes(calc(user.stats.heartCount));
      setFeed(queryData.itemList);
    }
  }, [user]);

  if (error) {
    return <div>Some error occurs: {error.message}. Try again later</div>;
  } else if (!isLoaded) {
    return (
      <div className={styles.spinner_box}>
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.user_wrapper}>
          <header className={styles.header}>
            <div className={styles.contact_info}>
              <div className={styles.avatar_wrapper}>
                <img
                  src={user.user.avatarMedium ?? avatar}
                  alt="avatar"
                  className={styles.avatar_image}
                />
              </div>
              <div className={styles.about_container}>
                <h1 className={styles.title}>{user.user.nickname}</h1>
                <h2 className={styles.subtitle}>{user.user.uniqueId}</h2>
                <div className={styles.follow_btn_wrapper}>
                  <button className={styles.follow_btn}>Follow</button>
                </div>
              </div>
            </div>
            <div className={styles.dots}>
              <i className="fas fa-ellipsis-h"></i>
            </div>
            <h2 className={styles.counts_info}>
              <div className={styles.number_box}>
                <strong className={styles.number}>{following}</strong>
                <span className={styles.unit}>Following</span>
              </div>
              <div className={styles.number_box}>
                <strong className={styles.number}>{followers}</strong>
                <span className={styles.unit}>Followers</span>
              </div>
              <div className={styles.number_box}>
                <strong className={styles.number}>{likes}</strong>
                <span className={styles.unit}>Likes</span>
              </div>
            </h2>
            <h2 className={styles.desc_info}>{user.user.signature}</h2>
          </header>
          <div className={styles.content_container}>
            <div className={styles.content_navbar}>
              <h2 className={styles.navbar_title}>Videos</h2>
              <div className={styles.pagination}>
                <button
                  className={styles.pages_icon}
                  onClick={() =>
                    currentPage - 1 === 0 ? false : changePage("back")
                  }
                >
                  <i
                    className="fas fa-chevron-circle-left"
                    style={{ fontSize: 20 }}
                  ></i>
                </button>

                <button
                  className={styles.pages_icon}
                  onClick={() => changePage("next")}
                >
                  <i
                    className="fas fa-chevron-circle-right"
                    style={{ fontSize: 20 }}
                  ></i>
                </button>
              </div>
            </div>
            <div className={styles.video_container}>
              {feed
                .slice(
                  currentPage * maxItemsPerPage - maxItemsPerPage,
                  currentPage * maxItemsPerPage
                )
                .map((vid) => {
                  return (
                    <div className={styles.video_item} key={vid.id}>
                      <video
                        volume="0.125"
                        style={{ maxWidth: "100%" }}
                        controls="controls"
                        autoPlay={false}
                        src="https://v58.tiktokcdn.com/video/tos/useast5/tos-useast5-pve-0068-tx/2edd3ceaf391477880d9789f5b0ab0be/?VExpiration=1637279421&VSignature=m9j35gst8mbLVTjLQoFONw&a=1233&br=1580&bt=790&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wECRNFGnkag3-I&l=20211118175000010223066035262C25FE&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M3lsNDg6Zml5OTMzZzczNEApO2lmODQ7OTw5NzRnN2c6O2czZ3IwcjRfZC1gLS1kMS9zczRhMS1fLzFeYmMzLmA0XzE6Yw%3D%3D&vl=&vr="
                      ></video>
                      <div className={styles.views}>
                        <i
                          className="fas fa-eye"
                          style={{ color: "white" }}
                        ></i>
                        <span className={styles.views_count}>
                          {calc(vid.stats.playCount)}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default User;
