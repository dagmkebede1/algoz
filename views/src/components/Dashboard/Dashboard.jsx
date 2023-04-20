import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  OneToOneOutlined,
} from "@ant-design/icons";
import { MdCastForEducation } from "react-icons/md";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import "./Dashboard.css";
import MenuItem from "antd/es/menu/MenuItem";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { isAuth, user } = useSelector((state) => state.auth);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="ant_logo">
          <h2>{collapsed ? "AI" : "Algoz"}</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ marginTop: "50px" }}
        >
          {user.role === "admin" ? (
            <>
              {" "}
              <MenuItem key={1} icon={<DashboardOutlined />}>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : ""
                  }
                  to="/stat"
                >
                  {" "}
                  Stats
                </NavLink>
              </MenuItem>
              <MenuItem key={2} icon={<UsergroupAddOutlined />}>
                <NavLink
                  to="/dashboard/users"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : ""
                  }
                >
                  {" "}
                  Users
                </NavLink>
              </MenuItem>
              <MenuItem key={3} icon={<MdCastForEducation />}>
                <NavLink
                  to="/dashboard/courses"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : ""
                  }
                >
                  Courses
                </NavLink>
              </MenuItem>
              <MenuItem key={4} icon={<VideoCameraOutlined />}>
                <NavLink
                  to="/dashboard/resources"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : ""
                  }
                >
                  {" "}
                  Resources
                </NavLink>
              </MenuItem>
              <MenuItem key={5} icon={<OneToOneOutlined />}>
                <NavLink
                  to="/dashboard/network"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : ""
                  }
                >
                  {" "}
                  Algoz Network
                </NavLink>
              </MenuItem>
              <MenuItem key={6} icon={<UserOutlined />}>
                <NavLink
                  to="/me"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : ""
                  }
                >
                  {" "}
                  Profile
                </NavLink>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem key={1} icon={<HomeOutlined />}>
                <NavLink
                  to="#"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : ""
                  }
                >
                  {" "}
                  StudySpace
                </NavLink>
              </MenuItem>
              <MenuItem key={2} icon={<VideoCameraOutlined />}>
                <NavLink
                  to="#"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : ""
                  }
                >
                  {" "}
                  Resources
                </NavLink>
              </MenuItem>
              <MenuItem key={3} icon={<OneToOneOutlined />}>
                <NavLink
                  to="#"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : ""
                  }
                >
                  {" "}
                  Algoz Network
                </NavLink>
              </MenuItem>
              <MenuItem key={4} icon={<UserOutlined />}>
                <NavLink
                  to="#"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : ""
                  }
                >
                  {" "}
                  Profile
                </NavLink>
              </MenuItem>
            </>
          )}
          {/* 

          for Admin panel
            <MenuItem key={1} icon={<DashboardOutlined />}>
                <a href="#"> Stats</a>
            </MenuItem>
            <MenuItem key={1} icon={<UsergroupAddOutlined />}>
                <a href="#"> Users</a>
            </MenuItem>
            <MenuItem key={1} icon={<MdCastForEducation />}>
                <a href="#"> Courses</a>
            </MenuItem>
            <MenuItem key={1} icon={<VideoCameraOutlined />}>
                <a href="#"> Resources</a>
            </MenuItem>
             <MenuItem key={3} icon={<OneToOneOutlined />}>
                <a href="#"> Algoz Network</a>
            </MenuItem>
             <MenuItem key={4} icon={<UserOutlined />}>
                <a href="#"> Profile</a>
            </MenuItem>
   */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "ant_trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
