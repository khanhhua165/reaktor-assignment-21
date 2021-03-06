import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ITEM_PER_PAGE } from "../constants";
import BurgerButton from "../svgs/BurgerButton";
import CloseButton from "../svgs/CloseButton";

const PageNavigation = (props: { itemsLength: number; currentUrl: string }) => {
  const [sideBarState, setsideBarState] = useState("hidden");

  const handleClick = (e: React.MouseEvent) => {
    if (sideBarState === "hidden") {
      setsideBarState("");
    } else {
      setsideBarState("hidden");
    }
  };

  const totalPage = [
    ...Array(Math.ceil(props.itemsLength / ITEM_PER_PAGE)).keys(),
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
    sideBarState === "hidden" ? <BurgerButton /> : <CloseButton />;
  return (
    <div>
      <div
        className={`fixed bottom-0 left-0 z-10 ${sideBarState} overflow-y-scroll bg-gray-300 sm:block w-52 sidebar-nav shadow-xl grid grid-cols-1`}
      >
        <div className="pt-2 pl-4 font-semibold">Pages</div>
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
