import React from "react";

interface NavItemProps {
  itemName: string;
}

const NavItem = (props: NavItemProps) => {
  return (
    <div className="px-4 py-2 text-sm transition-colors rounded-md sm:text-base hover:bg-gray-300">
      {props.itemName}
    </div>
  );
};

export default NavItem;
