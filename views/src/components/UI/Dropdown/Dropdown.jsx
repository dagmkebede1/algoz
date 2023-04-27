import {
  DownOutlined,
  SmileOutlined,
  SettingFilled,
  SettingOutlined,
  LogoutOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";
import { NavLink } from "react-router-dom";
import { logout } from "../../Redux/Reducers/authSllice";
import { useDispatch } from "react-redux";

const DropdownMenu = () => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logout());
  };

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
      label: <p onClick={logOutHandler}>log Out</p>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
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
};
export default DropdownMenu;
