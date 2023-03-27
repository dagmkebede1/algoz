import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import "./NavBar.css";
import { Menu } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const items = [
  {
    label: "Home",
    key: "mail",
    // icon: <MailOutlined />,
  },
  {
    label: "Services",
    key: "app",
    // icon: <AppstoreOutlined />,
  },
  {
    label: "login",
    key: "app",
    // icon: <AppstoreOutlined />,
  },
  {
    label: "sign up",
    key: "app",
    // icon: <AppstoreOutlined />,
  },
  {
    label: "Navigation Three - Submenu",
    key: "SubMenu",
    // icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          {
            label: "Option 3",
            key: "setting:3",
          },
          {
            label: "Option 4",
            key: "setting:4",
          },
        ],
      },
    ],
  },
  //   {
  //     label: (
  //       <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //         Navigation Four - Link
  //       </a>
  //     ),
  //     key: "alipay",
  //   },
];
const App = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Menu
      //   onClick={onClick}
      //   selectedKeys={[current]}
      mode="horizontal"
      style={{
        display: "flex",

        justifyContent: "flex-end",
      }}
      //   items={items}
    >
      <Menu.Item className="nav">
        <NavLink to={"/"}>Home</NavLink>
      </Menu.Item>
      <Menu.Item className="nav">
        <NavLink to={"/"}>Services</NavLink>
      </Menu.Item>
      <Menu.Item className="nav">
        <NavLink to={"/"}>About</NavLink>
      </Menu.Item>
      <Menu.Item className="nav">
        <NavLink to={"/"}>Login</NavLink>
      </Menu.Item>
      <Menu.Item className="nav">
        <NavLink to={"/"}>SignUp</NavLink>
      </Menu.Item>
    </Menu>
  );
};
export default App;
