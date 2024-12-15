import React, { useState } from 'react';

const ProgressionLine = ({currentStep,steps}) => {
  return (
    <div className="progression-container">
      <div className="progress-bar">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index + 1 <= currentStep ? "active" : ""}`}
          >
            <div className="circle">{index + 1}</div>
            <span className="label">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressionLine;