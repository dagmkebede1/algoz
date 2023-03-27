import { PlusOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { FaSpinner } from "react-icons/fa";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import validator from "validator";
import "./Signup.css";
import axios from "axios";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const cookies = new Cookies();

const FormDisabledDemo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errResponse, setErrResponse] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  let handleChange = ({ fileList }) => {
    //---------------^^^^^----------------
    // this is equivalent to your "const img = event.target.files[0]"
    // here, antd is giving you an array of files, just like event.target.files
    // but the structure is a bit different that the original file
    // the original file is located at the `originFileObj` key of each of this files
    // so `event.target.files[0]` is actually fileList[0].originFileObj
    // console.log("fileList", fileList);
    // setForField({ fileList });
    // console.log(forField);
    // you store them in state, so that you can make a http req with them later
    //   this.setState({ fileList });
  };

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
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
        setErrResponse(err.response?.data?.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response?.data?.message}`,
          // footer: `${(<NavLink to={"/signup"}>Return to the Form</NavLink>)}`,
        });
        setIsSubmitting(false);
      });
  };
  return (
    <>
      <div className="signup-container">
        {
          // errResponse &&
          //   Swal.fire({
          //     icon: "error",
          //     title: "Oops...",
          //     text: `${errResponse}`,
          //     footer: '<a href="">Why do I have this issue?</a>',
          //   })
          // errResponse.split(".").map((err) => {
          //   return <p style={{ color: "red", paddingBottom: "5px" }}>{err}</p>;
          // })
        }
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            textAlign: "center",
          }}
          onFinish={onFinish}
        >
          <Form.Item name="photo">
            <Upload
              listType="picture-circle"
              className="avatar-uploader"
              maxCount={1}
              customRequest={(info) => {
                console.log(info.file);
              }}
              onChange={handleChange}
              showUploadList={false}
              beforeUpload={() => false}
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
            </Upload>
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
            <Input className="form-item" placeholder="First Name" />
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
            <Input className="form-item" placeholder="Last Name" />
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
            <Input
              prefix={
                <UserOutlined className="site-form-item-icon form-item" />
              }
              placeholder="email address"
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
            <Input
              prefix={
                <LockOutlined className="site-form-item-icon form-item" />
              }
              type="password"
              placeholder="Password"
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
            <Input
              prefix={
                <LockOutlined className="site-form-item-icon form-item" />
              }
              type="password"
              placeholder="Password Confirmation"
            />
          </Form.Item>
          <Form.Item name="gender">
            <Select placeholder="Gender">
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="phone">
            <Input placeholder="Phone Number" />
          </Form.Item>

          <Form.Item name="birthdate">
            <DatePicker placeholder="BirthDate" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              <FaSpinner
                className={isSubmitting ? "loading-icon load" : "loading-icon"}
              />
              <p style={{ color: "white" }}>Create </p>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default () => <FormDisabledDemo />;
