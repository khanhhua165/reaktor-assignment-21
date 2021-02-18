import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ClothesItems from "./components/ClothesItems";
import ItemsProvider from "./contexts/ItemsContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ItemsProvider>
        <div className="font-sans">
          <Navbar />
          <Switch>
            <Redirect from="/" exact to="/beanies" />
            <Route
              path="/:item"
              render={(routeProps) => <ClothesItems {...routeProps} />}
            />
          </Switch>
        </div>
      </ItemsProvider>
    </BrowserRouter>
  );
};

export default App;
