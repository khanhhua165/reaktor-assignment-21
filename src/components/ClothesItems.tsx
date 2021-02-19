import React, { useContext, useState } from "react";
import {
  NavLink,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { ItemsContext } from "../contexts/ItemsContext";
import DisplayedItems from "./DisplayedItems";

interface ItemParams {
  item: string;
}
type ClothesItemsProps = RouteComponentProps<ItemParams>;

export interface Item {
  id: string;
  type: string;
  name: string;
  color: string[];
  price: number;
  manufacturer: string;
}

const ClothesItems = (props: ClothesItemsProps) => {
  const [sideBarButton, setsideBarButton] = useState("hidden");
  const handleClick = (e: React.MouseEvent) => {
    // e.preventDefault();
    if (sideBarButton === "hidden") {
      setsideBarButton("");
    } else {
      setsideBarButton("hidden");
      console.log(sideBarButton);
    }
  };
  const allItems = useContext(ItemsContext);
  const currentItems = allItems[props.match.params.item];
  if (!currentItems) return null;
  const itemsPerPage = 20;
  const totalPage = [
    ...Array(Math.ceil(currentItems.length / itemsPerPage)).keys(),
  ].map((page) => page + 1);
  const pageNavigation = totalPage.map((page) => (
    <NavLink key={page} to={`${props.match.url}/${page}`} onClick={handleClick}>
      <div className="text-center rounded-lg hover:bg-blue-300 hover:border-red-500">
        {page}
      </div>
    </NavLink>
  ));
  return (
    <>
      <div className="grid grid-cols-1 gap-3 px-4 pt-16 mt-4 sm:pr-2 sm:pl-56 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Switch>
          <Route exact path={props.match.url}>
            <Redirect to={`${props.match.url}/1`} />
          </Route>
          <Route
            path={`${props.match.url}/:page`}
            render={(routeProps) => (
              <DisplayedItems {...routeProps} items={currentItems} />
            )}
          />
        </Switch>
      </div>
      <div
        className={`fixed bottom-0 left-0 z-10 ${sideBarButton} overflow-y-scroll bg-gray-300 sm:block w-52 sidebar-nav`}
      >
        <div className="grid w-full grid-cols-4 gap-0.5 px-2 py-2">
          {pageNavigation}
        </div>
      </div>
      <div
        onClick={handleClick}
        className="fixed text-gray-100 bg-blue-400 rounded-full w-14 h-14 sm:hidden bottom-4 right-4"
      >
        {sideBarButton === "hidden" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
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
        )}
      </div>
    </>
  );
};

export default ClothesItems;
