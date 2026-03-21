import React from 'react';

const LoadingOverlay = ({ message = "Please wait while data is loading..." }) => {
  return (
    <div className="global-loading-overlay">
      <div className="loading-content">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div>
          <p className="mb-0">{message}</p>
          <small>Backend may be slow on free-tier (startup up to 30s).</small>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
