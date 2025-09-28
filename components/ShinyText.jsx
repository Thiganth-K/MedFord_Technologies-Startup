import React from 'react';
import './ShinyText.css';

const ShinyText = ({ text, disabled = false, speed = 5, className = '', style = {} }) => {
  const animationDuration = `${speed}s`;

  return (
    <span 
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`} 
      style={{ 
        animationDuration,
        ...style
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
