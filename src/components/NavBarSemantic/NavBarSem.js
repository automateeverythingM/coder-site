import React from "react";
import { Menu } from "semantic-ui-react";
export default function NavBarSem() {
  const [activeItem, setActiveItem] = React.useState();

  return (
    <Menu secondary dark>
      <Menu.Item name="Explore" active={activeItem === "explore"}></Menu.Item>
    </Menu>
  );
}
