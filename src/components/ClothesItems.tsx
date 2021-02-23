import React, { useContext } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { ItemsContext } from "../contexts/ItemsContext";
import Spinner from "../svgs/Spinner";
import DisplayedItems from "./DisplayedItems";
import PageNavigation from "./PageNavigation";

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
  if (!currentItems) {
    return <Redirect to="/" />;
  }
  if (currentItems.length === 0) {
    return (
      <div className="flex flex-col items-center w-full mt-28">
        <Spinner classItems="w-24 mx-auto animate-spin" />
        <div className="text-xl italic font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Switch>
        <Route exact path={props.match.url}>
          <Redirect to={`${props.match.url}/1`} />
        </Route>
        <Route
          path={`${props.match.url}/:page`}
          render={(routeProps) => (
            <DisplayedItems
              {...routeProps}
              items={currentItems}
              itemParam={props.match.params.item}
            />
          )}
        />
      </Switch>
      <PageNavigation
        itemsLength={currentItems.length}
        currentUrl={props.match.url}
      />
    </div>
  );
};

export default ClothesItems;
