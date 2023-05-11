import {
  PlusOutlined,
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import validator from "validator";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../Redux/Reducers/authSllice";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import axios from "axios";
import Navbar from "../Nav/Navbar";
import { Button, Cascader, Checkbox, DatePicker, Form, Input } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import CustomUpload from "../UI/Upload/CustomUpload";
import CustomInput from "../UI/Input/CustomInput";
import CustomSelect from "../UI/Select/CustomSelect";
import PrimaryBtn from "../UI/PrimaryBtn/PrimaryBtn";
import SignUpNavbar from "../Nav/SignUpNav";

// initializing the cookie
const cookies = new Cookies();

const FormDisabledDemo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errResponse, setErrResponse] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  let dispatch = useDispatch();

  let handleChange = ({ fileList }) => {};

  const onFinish = (values) => {
    console.log(values);
    setIsSubmitting(true);

    let formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("passwordConfirm", values.passwordConfirm);
    formData.append("gender", values.gender);
    formData.append("phone", values.phone);
    formData.append("photo", values?.photo?.fileList[0]?.originFileObj);
    axios
      .post("http://localhost:5000/signup", formData)
      .then((res) => {
        console.log(res.data.token);
        cookies.set("jwt", res.data.token, { path: "/" });
        setIsSubmitting(false);
        dispatch(getUser());
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
        setErrResponse(err.response?.data?.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${
            err.response?.data?.message
              ? err.response?.data?.message
              : "Internal Server Error"
          }`,
        });
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <SignUpNavbar />
      <div className={styles.container}>
        <Form
          layout="horizontal"
          style={{
            width: "100%",
          }}
          onFinish={onFinish}
        >
          <Form.Item style={{ width: "100" }}>
            <CustomUpload
              name={"photo"}
              label={"Picture"}
              maxFile={1}
              listType={"picture-circle"}
            >
              <div>
                {imageUrl ? (
                  <p
                    style={{
                      width: "100%",
                    }}
                  >
                    {" "}
                    {imageUrl}
                  </p>
                ) : (
                  <>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Picture
                    </div>
                  </>
                )}
              </div>
            </CustomUpload>
          </Form.Item>
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <CustomInput
              sideLabel={"FirstName"}
              allowClear={true}
              placeholder={"First Name"}
              name={"firstName"}
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <CustomInput
              placeholder={"Last Name"}
              sideLabel={"LastName"}
              name={"lastName"}
              allowClear={true}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <CustomInput
              name={"email"}
              prefix={<UserOutlined />}
              placeholder={"Email"}
              allowClear={true}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <CustomInput
              type={"password"}
              allowClear={true}
              placeholder={"Password"}
              name={"password"}
              prefix={<LockOutlined></LockOutlined>}
            />
          </Form.Item>
          <Form.Item
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <CustomInput
              type={"password"}
              allowClear={true}
              placeholder={"Password Confirm"}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item name="gender">
            <CustomSelect
              placeholder={"Select your Gender"}
              optionData={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
            />
          </Form.Item>

          <Form.Item name="phone">
            <CustomInput
              prefix={<PhoneOutlined />}
              allowClear={true}
              placeholder={"Phone Number"}
            />
          </Form.Item>

          <Form.Item name="birthdate">
            <DatePicker placeholder="BirthDate" />
          </Form.Item>
          <Form.Item>
            <PrimaryBtn isSubmitting={isSubmitting} message={"Sign Up"} />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default () => <FormDisabledDemo />;
