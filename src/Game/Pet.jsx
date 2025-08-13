// Pet.jsx
import React, { forwardRef } from "react";

const Pet = forwardRef(({ position }, ref) => {
  return (
    <div
      ref={ref}
      className="pet"
      style={{
        left: `${position}px`,
      }}
    >
      🐱
    </div>
  );
});

export default Pet;
