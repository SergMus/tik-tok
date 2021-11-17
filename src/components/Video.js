import React, { useState, useRef, useEffect } from "react";
import styles from "./../components/Video.module.css";
import ActionBar from "./ActionBar";
import useElementOnScreen from "./../hooks/useElementOnScreen";

const Video = ({ feed }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.4,
  };
  const isVisibile = useElementOnScreen(options, videoRef);
  const onVideoClick = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(!playing);
    } else {
      videoRef.current.play();
      setPlaying(!playing);
    }
  };
  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        videoRef.current.play();
        setPlaying(true);
      }
    } else {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  }, [isVisibile, playing]);

  return (
    <div className={styles.video_wrapper}>
      <video
        src={feed.videoUrl}
        volume="0.125"
        style={{ maxWidth: "100%" }}
        controls="controls"
        muted
        loop
        preload="true"
        ref={videoRef}
        onClick={onVideoClick}
      ></video>
      <ActionBar
        heart={feed.authorMeta.heart}
        comment={feed.commentCount}
        share={feed.shareCount}
      />
    </div>
  );
};

export default Video;
