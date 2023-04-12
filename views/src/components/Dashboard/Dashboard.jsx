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

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="ant_logo">
          <h1>{collapsed ? "AI" : "Algoz"}</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ marginTop: "50px" }}
        >
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
          <MenuItem key={1} icon={<HomeOutlined />}>
            <a href="#"> StudySpace</a>
          </MenuItem>
          <MenuItem key={2} icon={<VideoCameraOutlined />}>
            <a href="#"> Resources</a>
          </MenuItem>
          <MenuItem key={3} icon={<OneToOneOutlined />}>
            <a href="#"> Algoz Network</a>
          </MenuItem>
          <MenuItem key={4} icon={<UserOutlined />}>
            <a href="#"> Profile</a>
          </MenuItem>
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
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
