import React from "react";

const ColorDot = (props: { color: string }) => {
  const divStyle = {
    backgroundColor: props.color,
  };
  console.log();
  return (
    <div
      className="w-5 h-5 border-gray-900 rounded-full shadow-md"
      style={divStyle}
    ></div>
  );
};

export default ColorDot;
