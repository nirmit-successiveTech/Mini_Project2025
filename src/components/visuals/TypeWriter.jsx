"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

export default function MyComponent() {
  const handleDone = () => {
    console.log(`Done after 5 loops!`);
  };

  return (
    <div className="App">
      <h1 className="text-4xl font-semibold  mt-10"
      >
        Our Mission{" "}
        <span className="text-purple-700 font-semibold">
          <Typewriter
            words={[
              "Share Food",
              "Spread Love",
              "Fight Hunger",
              "Build Community",
            ]}
            loop={5}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onLoopDone={handleDone}
          />
        </span>
      </h1>
    </div>
  );
}
