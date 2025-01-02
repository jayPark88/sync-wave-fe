import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; // index.css가 styles 폴더로 이동
import App from './App'; // App.js는 src 루트에 그대로 유지
import reportWebVitals from './services/reportWebVitals'; // reportWebVitals.js가 services 폴더로 이동
import { AuthProvider } from "./AuthContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
