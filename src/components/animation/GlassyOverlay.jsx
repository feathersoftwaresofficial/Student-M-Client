import React from "react";

const GlassyOverlay = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed md:hidden inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30"></div>
  );
};

export default GlassyOverlay;
