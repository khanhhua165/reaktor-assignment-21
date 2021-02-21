import React, { useContext } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { ItemsContext } from "../contexts/ItemsContext";
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
  if (!currentItems) return null;

  return (
    <div>
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
      <PageNavigation
        itemsLength={currentItems.length}
        currentUrl={props.match.url}
      />
    </div>
  );
};

export default ClothesItems;
