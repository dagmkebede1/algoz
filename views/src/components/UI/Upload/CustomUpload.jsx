import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Input, Select, Button, message, Upload, Form, Space } from "antd";

//  maxCount={1}
//  listType="picture-circle"
//  accept=".png, .jpeg, .jpg"
//  name="courseImage"

const CustomUpload = ({ maxFile, listType, accept, name, label, url }) => {
  const props = {
    name: "file",
    beforeUpload(file) {
      console.log(file);
      return false;
    },
  };
  const propsRealTime = {
    name: name,
    action: url,
    // headers: {
    //   authorization: "authorization-text",
    // },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      {url ? (
        <Form.Item name={name}>
          <Upload
            maxCount={maxFile}
            listType={listType}
            accept={accept}
            name={name}
            {...propsRealTime}
          >
            <Button icon={<UploadOutlined />}>{label}</Button>
          </Upload>
        </Form.Item>
      ) : (
        <Form.Item name={name}>
          <Upload
            maxCount={maxFile}
            listType={listType}
            accept={accept}
            name={name}
            {...props}
          >
            <Button icon={<UploadOutlined />}>{label}</Button>
          </Upload>
        </Form.Item>
      )}
    </>
  );
};

export default CustomUpload;
