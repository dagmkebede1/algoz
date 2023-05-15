import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./course_card.module.css";
import { axiosInstance } from "../utility/axios";

import {
  AudioOutlined,
  RightOutlined,
  LeftOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { apiBase } from "../utility/api";
import { Button } from "antd";
import { NavLink, Link } from "react-router-dom";
import { Avatar, Card } from "antd";
import Swal from "sweetalert2";

const { Meta } = Card;
const CardComponent = ({
  courses,
  setIsEditing,
  setCourseIndex,
  fetchData,
}) => {
  // const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);

  // Edit/Update the Course Function
  const editModeHandler = (value) => {
    setCourseIndex(value);
    setIsEditing(true);
  };

  // Delete the Course Function
  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/courses/${id}`)
          .then(() => {
            fetchData();
          })
          .catch((error) => {
            console.log(error);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const renderItems = currentItems.map((item) => (
    <Card
      hoverable
      style={{
        width: 300,
      }}
      cover={
        <img
          alt={item.title}
          src={`${apiBase.url}/public/img/course/${item.image}`}
        />
      }
      actions={[
        <Link to={"/"}>
          <SettingOutlined key="setting" />
        </Link>,
        <Link to={"/dashboard/course/edit"}>
          <EditOutlined key="edit" />
        </Link>,

        <DeleteOutlined
          key="ellipsis"
          onClick={() => deleteCourse(course._id)}
        />,
      ]}
    >
      <Meta title={item.title} description={item.desc} />
      <p style={{ margin: "10px auto 0 auto" }}>{item.price} ETB</p>
    </Card>
    // <div className={styles.card} key={item._id}>
    //   <img
    //     src={`${apiBase.url}/public/img/course/${item.image}`}
    //     alt={item.title}
    //   />
    //   <h2>{item.title}</h2>
    //   <div className={styles.more_info}>
    //     <div>
    //       <p>{item.desc}</p>
    //       <ul className={styles.instructor_lists}>
    //         {item.instructor.map((inst) => {
    //           return (
    //             <li key={inst._id}>
    //               {inst.firstName} {inst.lastName}
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     </div>
    //     <div className={styles.price}>
    //       <p>{item.price} ETB</p>
    //     </div>
    //   </div>
    //   <div className={styles.course_action_btn}>
    //     <Button onClick={() => editModeHandler(item._id)}>
    //       {/* <NavLink to={`/dashboard/courses/${item.title}`}> */}
    //       <EditOutlined /> Edit
    //       {/* </NavLink> */}
    //     </Button>
    //     <Button danger={true} onClick={() => deleteHandler(item._id)}>
    //       <DeleteOutlined />
    //       delete
    //     </Button>
    //   </div>
    // </div>
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(courses.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPagination = pageNumbers.map((number) => (
    <li
      key={number}
      className={currentPage === number ? "active" : undefined}
      onClick={() => setCurrentPage(number)}
    >
      {number}
    </li>
  ));

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.card_component}>
      <div className={styles.card_container}>{renderItems}</div>
      <div className={styles.pagination_container}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <LeftOutlined />
        </button>
        <ul className={styles.pagination}>{renderPagination}</ul>
        <button
          onClick={handleNextPage}
          disabled={currentPage === pageNumbers.length}
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export default CardComponent;
