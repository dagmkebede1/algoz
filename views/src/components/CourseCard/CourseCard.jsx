import Card from "../UI/Card/Card";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utility/axios";
import { Skeleton } from "antd";
import style from "./CourseCard.module.css";
import { useQuery } from "react-query";

const SkeletonLoader = () => <Skeleton active />;

const Cards = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      <Card />;
    </>
  );
};

export default Cards;
