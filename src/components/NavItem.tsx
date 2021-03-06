import React from "react";

interface NavItemProps {
  itemName: string;
}

const NavItem = (props: NavItemProps) => {
  return (
    <div className="px-3 py-2 text-base transition-colors rounded-md sm:text-lg sm:hover:bg-gray-100 sm:hover:text-gray-900">
      {props.itemName}
    </div>
  );
};

export default NavItem;
