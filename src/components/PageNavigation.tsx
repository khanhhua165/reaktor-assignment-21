import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const PageNavigation = (props: { itemsLength: number; currentUrl: string }) => {
  const [sideBarState, setsideBarState] = useState("hidden");
  const handleClick = (e: React.MouseEvent) => {
    if (sideBarState === "hidden") {
      setsideBarState("");
    } else {
      setsideBarState("hidden");
    }
  };
  const itemsPerPage = 20;
  const totalPage = [
    ...Array(Math.ceil(props.itemsLength / itemsPerPage)).keys(),
  ].map((page) => page + 1);
  const pageNavigation = totalPage.map((page) => (
    <NavLink
      key={page}
      to={`${props.currentUrl}/${page}`}
      onClick={handleClick}
    >
      <div className="text-center rounded-lg hover:bg-blue-300 hover:border-red-500">
        {page}
      </div>
    </NavLink>
  ));
  const mobileButton =
    sideBarState === "hidden" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 8h16M4 16h16"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );
  return (
    <div>
      <div
        className={`fixed bottom-0 left-0 z-10 ${sideBarState} overflow-y-scroll bg-gray-300 sm:block w-52 sidebar-nav shadow-xl`}
      >
        <div className="grid w-full grid-cols-4 gap-0.5 px-2 py-2">
          {pageNavigation}
        </div>
      </div>
      <div
        onClick={handleClick}
        className="fixed flex items-center justify-center text-gray-100 bg-blue-400 rounded-full cursor-pointer w-14 h-14 sm:hidden bottom-4 right-4"
      >
        <div className="w-3/5 h-3/5">{mobileButton}</div>
      </div>
    </div>
  );
};

export default PageNavigation;
