import React from "react";

interface NavItemProps {
  itemName: string;
}

const NavItem = (props: NavItemProps) => {
  return (
    <div className="px-3 py-2 text-base transition-colors rounded-md sm:text-lg hover:bg-gray-300">
      {props.itemName}
    </div>
  );
};

export default NavItem;
