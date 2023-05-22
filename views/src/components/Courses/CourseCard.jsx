import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./course_card.module.css";
import { axiosInstance } from "../utility/axios";
import { useSelector } from "react-redux";
import { getUser } from "../Redux/Reducers/authSllice";

import {
  RightOutlined,
  LeftOutlined,
  DeleteOutlined,
  EditOutlined,
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
  setCourseView,
  setSelectedID,
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
  // getting the state from the redux
  const { user } = useSelector((state) => state.auth);

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

  const openCourse = (id) => {
    setCourseView(true);
    setIsEditing(false);
    setSelectedID(id);
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
          style={{
            maxHeight: "200px",
            objectFit: "cover",
          }}
          src={`${apiBase.url}/public/img/course/${item.image}`}
        />
      }
      actions={
        (user.role === "admin" && [
          <Button onClick={() => openCourse(item._id)}>More</Button>,
          <Button onClick={() => editModeHandler(item._id)}>
            <EditOutlined key="edit" />
          </Button>,

          <DeleteOutlined
            key="ellipsis"
            onClick={() => deleteHandler(item._id)}
          />,
        ]) || [<Button onClick={() => openCourse(item._id)}>More</Button>]
      }
    >
      <Meta title={item.title} description={item.desc.slice(0, 100) + "..."} />
      <p style={{ margin: "10px auto 0 auto" }}>{item.price} ETB</p>
    </Card>
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
