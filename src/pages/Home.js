import React from "react";
import "../styles/Home.css"; // 스타일을 별도 CSS 파일로 분리
import { Link } from "react-router-dom"; // 버튼을 통해 다른 페이지로 이동

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to SyncWave</h1>
      <p className="home-description">
        This is a simple schedule management web application designed to make your life easier.
      </p>
      {/* CTA 버튼 */}
      <Link to="/about" className="home-button">
        Learn More
      </Link>
    </div>
  );
}

export default Home;
