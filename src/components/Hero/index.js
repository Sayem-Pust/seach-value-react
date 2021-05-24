import React from "react";

export default function Hero({ children }) {
  return (
    <div className="hero">
      <div className="banner">
        <h1>Think, code and deploy</h1>
        <p>embrance your choices</p>
        {children}
      </div>
    </div>
  );
}
