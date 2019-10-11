import React from "react";

const NavList = props => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem
  } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem
              ? "list-group-item active clickable"
              : "list-group-item clickable"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

NavList.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default NavList;
