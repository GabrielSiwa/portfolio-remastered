"use client";

import React from "react";
import InteractiveStarfield from "./InteractiveStarfield";
// import OrbitalNavigation from "./OrbitalNavigation";

const Background: React.FC = () => {
  return (
    <>
      {/* <section id="top-spacer">
        <OrbitalNavigation size="medium" />
      </section> */}
      <InteractiveStarfield />
    </>
  );
};

export default Background;
