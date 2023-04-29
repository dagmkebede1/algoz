import React from "react";
import styles from "./CourseForm.module.css";
import TextArea from "antd/es/input/TextArea";
import { Input, Select, Form } from "antd";
import { useState } from "react";
import CustomInput from "../UI/Input/CustomInput";
import CustomUpload from "../UI/Upload/CustomUpload";
import CustomSelect from "../UI/Select/CustomSelect";

const data = [
  {
    value: "Samson",
    label: "Samson",
  },
  {
    value: "Rediet",
    label: "Rediet",
  },
  {
    value: "Alazar",
    label: "Alazar",
  },
  {
    value: "Amanuel",
    label: "Amanuel",
  },
];

const { Option } = Select;

const CourseForms = (data) => {
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = (item) => {
    console.log(item);
  };

  return (
    <div className={styles.form_container}>
      <Form action="" onFinish={onFinish}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please upload course image!",
            },
          ]}
        >
          <CustomUpload
            maxFile={1}
            listType="picture-circle"
            label="Select a Picture"
            name="courseImage"
            accept=".png, jpeg, .gif, .jpg"
          />
        </Form.Item>
        <Form.Item
          name="course_title"
          rules={[
            {
              required: true,
              message: "please input course title here",
            },
          ]}
        >
          <CustomInput
            placeholder={"Type a Course Title here"}
            allowClear={true}
            name={"courseTitle"}
            type={"text"}
          />
        </Form.Item>
        <Form.Item
          name={"desc"}
          rules={[
            {
              required: true,
              message: "please provide course description",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Course Description"
            minLength={6}
            type="text"
            name="desc"
            className="form-item"
            allowClear
          />
        </Form.Item>
        <Form.Item
          name={"course_price"}
          rules={[
            {
              required: true,
              message: "please provide course price",
            },
          ]}
        >
          <Input
            placeholder="Type a Course Title"
            allowClear
            className="form-item"
            name="course_price"
            type="number"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "please select the course Instructor",
            },
          ]}
          name="course_inst"
        >
          {/* <CustomSelect
            optionData={data}
            mode={"multiple"}
            placeholder={"Select an Instructor"}
          /> */}
        </Form.Item>
        <Form.Item>
          <button className={styles.btn}>Update</button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CourseForms;
