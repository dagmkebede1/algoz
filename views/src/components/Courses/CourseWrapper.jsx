import { useState, useEffect } from "react";
import styles from "./course_wrapper.module.css";
import { Input, Space, Button, Select } from "antd";
const { Search } = Input;
import { AudioOutlined } from "@ant-design/icons";
import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utility/axios";
import CourseForms from "../CourseForm/CourseForms";

const CourseWrapper = () => {
  const [query, setQuery] = useState({ title: "" });
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [courseIndex, setCourseIndex] = useState(0);
  const [singleCourse, setSingleCourse] = useState({});

  const navigate = useNavigate();

  const onSearch = (q) => {
    console.log(q.nativeEvent.target.defaultValue);
    let titleQuery = q.nativeEvent.target.defaultValue;
    setQuery((prev) => {
      return { ...prev, title: titleQuery };
    });
  };

  const handleChange = (q) => {
    console.log(q);
  };

  const createNewCourseHandler = () => {
    navigate("/dashboard/courses/new");
  };


  // Fetching the course from the api
  const fetchData = async () => {
    const result = await axiosInstance.get(`/courses?title=${query.title}`);
    setCourses(result.data.data.allCourse);
    // console.log(result.data.data.allCourse);
  };


  useEffect(() => {
    fetchData();
    console.log("useEffect runing...");
    let foundCourse = courses.find((item) => item._id == courseIndex);
    setSingleCourse(foundCourse);
  }, [query]);

  return (
    <>
      {!isEditing && (
        <section className={styles.filter}>
          <div>
            <Button onClick={createNewCourseHandler}> Create New</Button>
          </div>
          <div>
            <Search
              placeholder="input search text"
              allowClear
              enterButton
              // onSearch={onSearch}
              onChange={onSearch}
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
      )}
      {!isEditing && (
        <section className={styles.courseList}>
          <CourseCard
            courses={courses}
            fetchData={fetchData}
            setIsEditing={setIsEditing}
            setCourseIndex={setCourseIndex}
          />
        </section>
      )}
      {isEditing && (
        <section>
          <CourseForms
            fetchData={fetchData}
            singleCourse={singleCourse}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
          />
        </section>
      )}
    </>
  );
};

export default CourseWrapper;
