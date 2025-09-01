"use client";
import React from "react";

const BigInput: React.FC = () => {
  return (
    <div
      style={{
        width: "400px",
        height: "100px",
        margin: "50px auto",
        position: "relative",
      }}
    >
      {/* Big Rounded Input Container */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "1000px",
          backdropFilter: "blur(10px)",
          background:
            "linear-gradient(270deg, rgba(23,23,23,0.9) 0%, rgba(47,47,47,0.9) 50%, rgba(23,23,23,0.9) 100%)",
          boxShadow: "inset 0px -2px 0px 0px rgb(104,247,187)",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          position: "relative",
        }}
      >
        {/* Input Field */}
        <input
          type="text"
          placeholder="Type something..."
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: "18px",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        />

        {/* Button / Primary Icon */}
        <button
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgb(104,247,187) 0%, rgb(0,163,96) 100%)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          <img
            src="https://framerusercontent.com/images/GKCytVxQSJRVNVfE5PYctxhUz1Q.svg"
            alt="Arrow Icon"
            style={{ width: "20px", height: "20px" }}
          />
        </button>

        {/* Secondary Icon */}
        <div
          style={{
            position: "absolute",
            left: "-30px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.15) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.7,
          }}
        >
          <img
            src="https://framerusercontent.com/images/nM6hjXyf17yvFKkOW98mFJPbBh8.svg"
            alt="Icon"
            style={{
              width: "16px",
              height: "16px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>

      {/* Glow Background */}
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          backgroundColor: "rgb(104,247,187)",
          filter: "blur(100px)",
          top: "-50px",
          left: "-50px",
          opacity: 0.8,
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          backgroundColor: "rgb(104,247,187)",
          filter: "blur(100px)",
          bottom: "-50px",
          right: "-50px",
          opacity: 0.7,
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default BigInput;
