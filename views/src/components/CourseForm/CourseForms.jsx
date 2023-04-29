import React, { useEffect } from "react";
import styles from "./CourseForm.module.css";
import TextArea from "antd/es/input/TextArea";
import { Input, Select, Form } from "antd";
import { useState } from "react";
import CustomInput from "../UI/Input/CustomInput";
import CustomUpload from "../UI/Upload/CustomUpload";
import CustomSelect from "../UI/Select/CustomSelect";
import { axiosInstance } from "../utility/axios";

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

const CourseForms = () => {
  const [instructor, setInstructor] = useState([]);

  useEffect(() => {
    axiosInstance.get("/manage/users").then((res) => {
      // console.log(res.data.allUser);
      let filteredInst = res.data.allUser.filter(
        (user) => user.role == "instructor"
      );
      console.log(filteredInst);
      setInstructor(filteredInst);
    });
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const onFinish = (item) => {
    console.log(item);
    const formData = new FormData();
    formData.append("image", item?.image?.fileList[0]?.originFileObj);
    formData.append("title", item.title);
    formData.append("desc", item.desc);
    formData.append("price", item.price);
    formData.append("instructor", item.instructor);
  };

  return (
    <div className={styles.form_container}>
      <h2>Create A Crourse </h2>
      <Form action="" onFinish={onFinish} className={styles.form}>
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
            name="image"
            accept=".png, jpeg, .gif, .jpg"
          />
        </Form.Item>
        <Form.Item
          name="title"
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
          name={"price"}
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
          name="instructor"
        >
          <Select
            style={{
              padding: "0px 0",
            }}
            // defaultValue={"Samson"}
            mode={"multiple"}
            options={instructor}
            placeholder={"Enter a Course Instructor Name"}
            optionLabelProp="label"
          ></Select>
          {/* <CustomSelect
            defaultValue={"Samson"}
            optionData={data}
            // mode={"multiple"}
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
