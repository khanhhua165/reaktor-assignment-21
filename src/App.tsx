import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ClothesItems from "./components/ClothesItems";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="font-sans">
        <Navbar />
        <Switch>
          <Redirect from="/" exact to="/beanies" />
          <Route path="/:item" render={ClothesItems} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
