// components/common/LoadingOverlay.js
import React from "react";
import { useLoading } from "../../contexts/LoadingContext";
import "../../styles/LoadingOverlay.css";

const LoadingOverlay = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner" />
    </div>
  );
};

export default LoadingOverlay;
