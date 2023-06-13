import { Anchor } from "antd";
import { useNavigate, NavLink, useParams, Outlet } from "react-router-dom";
import styles from "./Resourse.module.css";
const App = () => {
  let navigate = useNavigate();
  let anyP = useParams();
  console.log(anyP);
  //   const navigation = [
  //   { label: "Home", key: 1, target: "/" },
  //   { label: "Holiday Calendar", key: 2, "/holidaycalendar" },
  //   { label: "Event", key: 3, "/event" },
  // ];
  //   ({ isActive, isPending }) =>
  //     isPending ? "pending" : isActive ? "active" : ""
  //   }
  let styles = {
    color: "black",
  };
  const navigation = [
    {
      title: (
        <NavLink
          className={({ isActive }) => {
            return isActive ? "ant-anchor-link-title-active" : "";
          }}
          style={styles}
          to={"/dashboard/resources/modules"}
        >
          Modules
        </NavLink>
      ),
      key: 1,
      href: "/dashboard/resources/modules",
    },
    {
      title: (
        <NavLink
          //   className={"ant-anchor-link-title ant-anchor-link-title-active"}
          style={styles}
          to={"/dashboard/resources/videos"}
        >
          Video
        </NavLink>
      ),
      key: 2,
      href: "/dashboard/resources/videos",
    },
    {
      title: (
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? "ant-anchor-link-title ant-anchor-link-title-active"
              : "";
          }}
          style={styles}
          to={"/dashboard/resources/notes"}
        >
          Notes
        </NavLink>
      ),
      key: 3,
      href: "/dashboard/resources/notes",
    },
    {
      title: (
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? "ant-anchor-link-title ant-anchor-link-title-active"
              : "";
          }}
          style={styles}
          to={"/dashboard/resources/tasks"}
        >
          Tasks
        </NavLink>
      ),
      key: 4,
      href: "/dashboard/resources/tasks",
    },
    // { title: "Tasks", key: 4, target: "/event" },
  ];

  const handleMenuClick = (e) => {
    let {
      target: { innerText: key },
    } = e;
    // console.log(e.view.getSelection());
    const { target } = navigation.find((item) => item.title === key) || {};
    if (target) {
      navigate(target);
    }
  };
  let onChange = (e) => {
    // console.log(e);
  };
  let path = window.location;
  let getCurrentAnchor = (e) => {
    if (path?.pathname == e) {
      return e;
    } else {
      return null;
    }
  };
  return (
    <>
      <Anchor
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        getCurrentAnchor={getCurrentAnchor}
        onChange={onChange}
        onClick={handleMenuClick}
        affix={false}
        direction="horizontal"
        items={navigation}
      >
        {/* {navigation.map((item) => {
            return <NavLink to={item.href} />;
        })} */}
      </Anchor>
      <Outlet />
    </>
  );
};

export default App;
