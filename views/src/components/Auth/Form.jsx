import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import Cookies from "universal-cookie";
import validator from "validator";
import { useState } from "react";
import "./Form.css";
import { NavLink } from "react-router-dom";
import { getUser } from "../Redux/Reducers/authSllice";
import { useSelector, useDispatch } from "react-redux";

const cookies = new Cookies();
const App = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errResponse, setErrResponse] = useState("");

  const onFinish = (values) => {
    setIsSubmitting(true);
    axios
      .post("http://localhost:5000/login", values)
      .then((res) => {
        console.log(res.data.token);
        cookies.set("us_id", res.data.token, {
          path: "/",
          // secure: false,
          // httpOnly: true,
          expires: new Date(res.data.expires),
        });
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrResponse(err.response.data.message);
        setIsSubmitting(false);
      });
    console.log("Received values of form: ", values);
  };

  return (
    <div className="login">
      <h2>Sign In</h2>
      {errResponse &&
        errResponse.split(",").map((err) => {
          return <p style={{ color: "red", paddingBottom: "5px" }}>{err}</p>;
        })}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
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
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            <FaSpinner
              className={isSubmitting ? "loading-icon load" : "loading-icon"}
            />
            Log in
          </Button>
          no Acount ? <NavLink to={"/signup"}>register now!</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
};
export default App;
