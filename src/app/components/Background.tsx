"use client";

import React from "react";
import InteractiveStarfield from "./InteractiveStarfield";
import ConstellationLayer from "./ConstellationLayer";

const Background: React.FC = () => {
  return (
    <>
      <InteractiveStarfield />
      <ConstellationLayer />
    </>
  );
};

export default Background;
