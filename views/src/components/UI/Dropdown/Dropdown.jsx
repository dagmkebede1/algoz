import {
  DownOutlined,
  SmileOutlined,
  SettingFilled,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";
import { NavLink } from "react-router-dom";

const items = [
  {
    key: "1",
    label: (
      <NavLink rel="noopener noreferrer" to="/dashboard">
        Dashboard
      </NavLink>
    ),
    icon: <BarChartOutlined />,
  },
  {
    key: "2",
    label: <p>log Out</p>,
    icon: <LogoutOutlined />,
    danger: true,
  },
];
const DropdownMenu = () => (
  <Dropdown
    menu={{
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <SettingOutlined />
        Space
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default DropdownMenu;
