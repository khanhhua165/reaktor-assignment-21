import React from "react";

const ColorDot = (props: { color: string }) => {
  const divStyle = {
    backgroundColor: props.color,
  };
  return (
    <>
      <div
        className="w-5 h-5 border-2 border-gray-700 rounded-full shadow-sm border-opacity-30"
        style={divStyle}
      ></div>
      <div>{props.color}</div>
    </>
  );
};

export default ColorDot;
