import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="flex flex-col items-start pl-4 bg-white rounded-md shadow-lg">
      <div className="w-20 h-4 mt-1 bg-gray-200 rounded-sm animate-pulse"></div>
      <div className="w-24 h-3 mb-4 bg-gray-200 animate-pulse"></div>
      <div className="h-4 bg-gray-200 w-14 animate-pulse"></div>
      <div className="w-32 h-4 bg-gray-200 animate-pulse"></div>
      <div className="h-4 bg-gray-200 w-36 animate-pulse"></div>
      <div className="h-4 mb-1 bg-gray-200 w-44 animate-pulse"></div>
    </div>
  );
};

export default SkeletonCard;
