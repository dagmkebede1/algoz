import { useState, useEffect } from "react";
import styles from "./course_wrapper.module.css";
import { Input, Space, Button, Select } from "antd";
const { Search } = Input;
import { AudioOutlined } from "@ant-design/icons";
import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";

const CourseWrapper = () => {
  const [query, setQuery] = useState({});
  const navigate = useNavigate();

  const onSearch = () => {};
  const handleChange = () => {};
  const createNewCourseHandler = () => {
    navigate("/dashboard/courses/new");
  };

  return (
    <>
      <section className={styles.filter}>
        <div>
          <Button onClick={createNewCourseHandler}> Create New</Button>
        </div>
        <div>
          <Search
            placeholder="input search text"
            allowClear
            enterButton
            onSearch={onSearch}
            suffix={<AudioOutlined />}
          />
        </div>
        <div>
          {/* <select name="" id=""></select> */}
          <Select
            defaultValue="MERN Development"
            placeholder="Catagories"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
            ]}
          />
        </div>
      </section>
      <section className={styles.courseList}>
        <CourseCard />
      </section>
    </>
  );
};

export default CourseWrapper;
