import styles from "./input.module.css";
import React from "react";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { Input, Select, Button, message, Upload, Form, Space } from "antd";

const CustomInput = ({
  onChange,
  name,
  className,
  placeholder,
  allowClear,
  type,
  defaultValue,
  sideLabel,
}) => {
  //   console.log(name, placeholder, onChange);
  return (
    <>
      {type === "password" ? (
        <Input.Password
          placeholder={placeholder}
          allowClear={allowClear}
          className={className}
          onChange={onChange}
          defaultValue={defaultValue}
          name={name}
          type={type}
          onBeforeInput={sideLabel}
        />
      ) : (
        <Input
          placeholder={placeholder}
          allowClear={allowClear}
          className={className}
          onChange={onChange}
          defaultValue={defaultValue}
          onBeforeInput={sideLabel}
          name={name}
          type={type}
        />
      )}
    </>
  );
};

export default CustomInput;
