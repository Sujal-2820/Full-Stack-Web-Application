// components/LoadingSpinner.js
import React from "react";
import "./loadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div>
      <div className="loading-spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LoadingSpinner;
