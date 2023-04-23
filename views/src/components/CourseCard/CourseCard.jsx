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

  // const { isLoading, error, data } = useQuery("course", () =>
  //   axiosInstance
  //     .get("/courses")
  //     .then(
  //       (resp) => resp.data.data.allCourse

  //       // setCourses(resp.data.data.allCourse);
  //       // setLoading(false);
  //     )
  //     .catch((err) => {
  //       return err.response.data;
  //     })
  // );

  if (isLoading) return <SkeletonLoader />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Card />;
    </>
  );
};

export default Cards;