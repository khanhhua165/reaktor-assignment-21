import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ClothesItems from "./components/ClothesItems";
import ItemsProvider from "./contexts/ItemsContext";
import AvailabilityProvider from "./contexts/AvailabilityContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ItemsProvider>
        <AvailabilityProvider>
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
        </AvailabilityProvider>
      </ItemsProvider>
    </BrowserRouter>
  );
};

export default App;
