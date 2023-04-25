import styles from "./input.module.css";
import React from "react";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { Input, Select, Button, message, Upload, Form, Space } from "antd";

const CustomInput = ({
  prefix,
  suffix,
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
          addonBefore={sideLabel}
          prefix={prefix}
          suffix={suffix}
        />
      ) : (
        <Input
          placeholder={placeholder}
          allowClear={allowClear}
          className={className}
          onChange={onChange}
          defaultValue={defaultValue}
          addonBefore={sideLabel}
          name={name}
          type={type}
          prefix={prefix}
          suffix={suffix}
        />
      )}
    </>
  );
};

export default CustomInput;
