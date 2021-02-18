import React, { useContext } from "react";
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
  const allItems = useContext(ItemsContext);
  const currentItems = allItems[props.match.params.item];
  if (!currentItems) return null;
  const itemsPerPage = 20;
  const totalPage = [
    ...Array(Math.ceil(currentItems.length / itemsPerPage)).keys(),
  ].map((page) => page + 1);
  const pageNavigation = totalPage.map((page) => (
    <NavLink key={page} to={`${props.match.url}/${page}`}>
      {page}
    </NavLink>
  ));
  return (
    <>
      <div className="grid grid-cols-1 gap-3 px-2 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
      <div className="flex flex-wrap w-4/5 mx-auto space-x-2">
        {pageNavigation}
      </div>
    </>
  );
};

export default ClothesItems;
