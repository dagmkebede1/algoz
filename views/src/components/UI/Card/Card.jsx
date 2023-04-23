import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utility/axios";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const { Meta } = Card;

const CardTest = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(isLoading);

  const deleteCourse = (id) => {
    setIsLoading(true);
    axiosInstance
      .delete("/courses/" + id)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log("useEffect running");
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
  }, [isLoading]);

  return (
    <>
      {courses?.map((course) => {
        return (
          <>
            <Card
              hoverable
              style={{
                width: 300,
              }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Link to={"/"}>
                  <SettingOutlined key="setting" />
                </Link>,
                <Link to={"/"}>
                  <EditOutlined key="edit" />
                </Link>,

                <DeleteOutlined
                  key="ellipsis"
                  onClick={() => deleteCourse(course._id)}
                />,
              ]}
            >
              <Meta
                // avatar={
                //   <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                // }
                title={course.title}
                description={course.desc}
              />
              <p style={{ margin: "10px auto 0 auto" }}>{course.price} ETB</p>
            </Card>
          </>
        );
      })}
    </>
  );
};

export default CardTest;
