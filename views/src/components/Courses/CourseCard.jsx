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
} from "@ant-design/icons";
import { apiBase } from "../utility/api";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

const CardComponent = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosInstance.get("/courses");
      setItems(result.data.data.allCourse);
      console.log(result.data.data.allCourse);
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const renderItems = currentItems.map((item) => (
    <div className={styles.card} key={item._id}>
      <img
        src={`${apiBase.url}/public/img/course/${item.image}`}
        alt={item.title}
      />
      <h2>{item.title}</h2>
      <div className={styles.more_info}>
        <div>
          <p>{item.desc}</p>
          <ul className={styles.instructor_lists}>
            {item.instructor.map((inst) => {
              return (
                <li key={inst._id}>
                  {inst.firstName} {inst.lastName}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.price}>
          <p>{item.price} ETB</p>
        </div>
      </div>
      <div className={styles.course_action_btn}>
        <Button>
          <NavLink to={`/dashboard/courses/${item.title}`}>
            <EditOutlined /> Edit
          </NavLink>
        </Button>
        <Button>
          <DeleteOutlined />
          delete
        </Button>
      </div>
    </div>
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
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
