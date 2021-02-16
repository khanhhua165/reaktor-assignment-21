import React from "react";
import NavItem from "./NavItem";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <div className="flex justify-center max-w-6xl px-3 py-2 mx-auto space-x-6 text-gray-700">
        <NavLink to="/beanies">
          <NavItem itemName="Beanies" />
        </NavLink>
        <NavLink to="/facemasks">
          <NavItem itemName="Face Masks" />
        </NavLink>
        <NavLink to="/gloves">
          <NavItem itemName="Gloves" />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
