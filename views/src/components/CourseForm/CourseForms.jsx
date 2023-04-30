import React, { useEffect } from "react";
import styles from "./CourseForm.module.css";
import TextArea from "antd/es/input/TextArea";
import { Input, Select, Form, Space } from "antd";
import { useState } from "react";
import CustomInput from "../UI/Input/CustomInput";
import CustomUpload from "../UI/Upload/CustomUpload";
import CustomSelect from "../UI/Select/CustomSelect";
import { axiosInstance } from "../utility/axios";
import PrimaryBtn from "../UI/PrimaryBtn/PrimaryBtn";

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

const CourseForms = (isEditing) => {
  const [instructor, setInstructor] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);

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

  //   desc
  // :
  // "daasf"
  // image
  // :
  // {file: File, fileList: Array(1)}
  // instructor
  // :
  // ['640f6f57dca30381a36f55aa']
  // price
  // :
  // "34"
  // title
  // :
  // "Same"
  const onFinish = (item) => {
    setSubmitting(true);
    console.log(item);
    // const courseData = {

    // }
    const formData = new FormData();
    formData.append("image", item?.image?.fileList[0]?.originFileObj);
    formData.append("title", item.title);
    formData.append("desc", item.desc);
    formData.append("price", item.price);
    formData.append("instructor", item.instructor);

    axiosInstance
      .post("/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setSubmitting(false);
        console.log(res.data);
      })
      .catch((err) => {
        setSubmitting(false);
        console.log(err);
      });
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
            placeholder="Type a Course Price"
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
            // options={instructor}
            placeholder={"Enter a Course Instructor Name"}
            optionLabelProp="label"
          >
            {instructor.map((inst) => {
              return (
                <Option value={inst._id} label={inst.firstName}>
                  <Space>
                    <span role="img" aria-label="China">
                      {inst.firstName}
                    </span>
                    {inst.lastName}
                  </Space>
                </Option>
              );
            })}
          </Select>
          {/* <CustomSelect
            defaultValue={"Samson"}
            optionData={data}
            // mode={"multiple"}
            placeholder={"Select an Instructor"}
          /> */}
        </Form.Item>
        <Form.Item>
          {/* <button className={styles.btn}>Update</button> */}
          <PrimaryBtn
            message={isEditing ? "Update" : "Create"}
            isSubmitting={isSubmitting}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default CourseForms;
