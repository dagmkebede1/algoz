import Card from "../UI/Card/Card";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utility/axios";
import { Skeleton } from "antd";
import style from "./CourseCard.module.css";
import { useQuery } from "react-query";
import CourseFrom from "./CourseFrom";
import { Button } from "antd";

const SkeletonLoader = () => <Skeleton active />;

const Cards = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/courses")
      .then((resp) => {
        setCourses(resp.data.data.allCourse);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(true);
      });
  }, []);

  if (isLoading) return <SkeletonLoader />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Button onClick={() => setIsEditing(true)}>Create New</Button>
      {isEditing ? <CourseFrom /> : <Card />}
      {/* <Card />; */}
    </>
  );
};

export default Cards;
