import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css"; // 전역 스타일 파일
import App from "./App"; // 애플리케이션의 주요 컴포넌트

// React 애플리케이션의 루트를 가져와 렌더링
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App /> {/* 애플리케이션 진입점 */}
  </React.StrictMode>
);

// 성능 측정 로직 (옵션)
// console.log로 출력하거나, 다른 로깅 서비스와 통합 가능
reportWebVitals();
