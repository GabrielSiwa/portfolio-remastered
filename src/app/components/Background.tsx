"use client";

import React from "react";
import InteractiveStarfield from "./InteractiveStarfield";
import ConstellationLayer from "./ConstellationLayer";
import OrbitalNavigation from "./OrbitalNavigation";

const Background: React.FC = () => {
  return (
    <>
      <section id="top-spacer">
        <OrbitalNavigation size="medium" />
      </section>
      <InteractiveStarfield />
      <ConstellationLayer />
    </>
  );
};

export default Background;
