import React from "react";
import "../styles/About.css"; // 스타일을 별도 CSS 파일로 분리

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About SyncWave</h1>
      <p className="about-description">
        SyncWave helps groups manage schedules effectively and collaborate efficiently.
      </p>
    </div>
  );
}

export default About;
