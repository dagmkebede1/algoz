import { useState, useEffect } from "react";
import styles from "./course_wrapper.module.css";
import { Input, Space, Button, Select } from "antd";
const { Search } = Input;
import { AudioOutlined } from "@ant-design/icons";
import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utility/axios";
import CourseForms from "../CourseForm/CourseForms";
import CourseView from "../CourseView/CourseView";

const CourseWrapper = () => {
  const [query, setQuery] = useState({ title: "" });
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [courseView, setCourseView] = useState(false);
  const [courseIndex, setCourseIndex] = useState(0);
  const [singleCourse, setSingleCourse] = useState({});
  const [selectedID, setSelectedID] = useState(null);

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
    setNewCourse(true);
    // navigate("/dashboard/courses/new");
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

  const backHandler = () => {
    setNewCourse(false);
    setCourseView(false);
    setIsEditing(false);
  };

  let singleCourseView = courses.find((item) => item._id == selectedID);

  return (
    <>
      {!isEditing && !newCourse && !courseView && (
        <section className={styles.filter}>
          <div>
            <Button onClick={createNewCourseHandler}> Create New</Button>
          </div>
          <div>
            <Search
              placeholder="input search text"
              allowClear
              enterButton
              onChange={onSearch}
              suffix={<AudioOutlined />}
            />
          </div>
          <div>
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
      {!isEditing && !newCourse && !courseView && (
        <section className={styles.courseList}>
          <CourseCard
            setSelectedID={setSelectedID}
            courses={courses}
            fetchData={fetchData}
            setIsEditing={setIsEditing}
            setCourseIndex={setCourseIndex}
            setCourseView={setCourseView}
          />
        </section>
      )}
      {newCourse && !isEditing && !courseView && (
        <CourseForms
          fetchData={fetchData}
          backHandler={backHandler}
          setIsEditing={setIsEditing}
          setNewCourse={setNewCourse}
          isEditing={isEditing}
        />
      )}
      {isEditing && !newCourse && !courseView && (
        <section>
          <CourseForms
            fetchData={fetchData}
            backHandler={backHandler}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            courses={courses}
            courseIndex={courseIndex}
            currentCourse={courses.find((course) => course._id === courseIndex)}
          />
        </section>
      )}
      {!newCourse && !isEditing && courseView && (
        <section>
          <Button onClick={backHandler}>Back</Button>
          <CourseView singleCourseView={singleCourseView} />
        </section>
      )}
    </>
  );
};

export default CourseWrapper;
