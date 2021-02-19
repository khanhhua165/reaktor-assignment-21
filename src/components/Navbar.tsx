import React from "react";
import NavItem from "./NavItem";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 z-20 w-full h-16 bg-gray-100 shadow-md">
      <div className="flex items-center justify-center h-full max-w-6xl mx-auto space-x-6 font-semibold text-gray-700">
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
