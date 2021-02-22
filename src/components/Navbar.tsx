import React from "react";
import NavItem from "./NavItem";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const items = [
    { path: "/beanies", name: "Beanies" },
    { path: "/facemasks", name: "Face Masks" },
    { path: "/gloves", name: "Gloves" },
  ];
  const navItems = items.map((item) => (
    <NavLink key={item.name} activeClassName="main-active" to={item.path}>
      <NavItem itemName={item.name} />
    </NavLink>
  ));
  return (
    <div className="fixed top-0 left-0 z-20 w-full h-16 bg-indigo-700 shadow-md">
      <div className="flex items-center justify-center h-full max-w-6xl mx-auto space-x-6 font-semibold text-white">
        {navItems}
      </div>
    </div>
  );
};

export default Navbar;
