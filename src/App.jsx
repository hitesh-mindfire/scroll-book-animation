import React from "react";
import BookScene from "./components/Book";

const App = () => {
  return (
    <div
      style={{
        height: "200vh",
        position: "relative",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(to right, #2b5876, #4e4376)",
          zIndex: -1,
          overflow: "hidden",
        }}
      ></div>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "1rem",
          textAlign: "center",
          zIndex: 10,
          fontSize: "1.5rem",
          letterSpacing: "0.05rem",
          backdropFilter: "blur(5px)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)",
          boxSizing: "border-box",
        }}
      >
        My 3D Interactive Book
      </header>

      <div
        style={{
          position: "relative",
          top: "3rem",
          width: "100vw",
          height: "calc(100vh - 3rem)",
          zIndex: 1,
        }}
      >
        <BookScene />
      </div>
    </div>
  );
};

export default App;
