/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../index.css";

function Pet({ frameIndex, frameCount = 10 }) {
  // Original sprite dimensions
  const originalFrameSize = 32;
  const originalSheetWidth = 320; // 32px * 10 frames = 320px
  
  const style = {
    backgroundImage: "url(/Idle.png)",
    // Use CSS custom properties to handle the positioning and sizing
    // This will be overridden by CSS classes for different screen sizes
    backgroundPosition: `calc(-${frameIndex} * var(--sprite-size, 64px)) 0px`,
    backgroundSize: `calc(var(--sprite-size, 64px) * 10) var(--sprite-size, 64px)`,
    backgroundRepeat: "no-repeat",
    imageRendering: "pixelated",
  };
  
  return <div className="pet-sprite" style={style} />;
}

function NameTag({ name }) {
  return <div className="pet-name">{name}</div>;
}

function PetContainer({ name }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const frameCount = 10; // total frames in your sprite

  useEffect(() => {
    // Change frame every 150ms (~6-7 frames per second)
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frameCount);
    }, 250);

    return () => clearInterval(interval);
  }, [frameCount]);

  return (
    <div className="pet-container">
      <NameTag name={name} />
      <Pet frameIndex={frameIndex} frameCount={frameCount} />
    </div>
  );
}

export default PetContainer;