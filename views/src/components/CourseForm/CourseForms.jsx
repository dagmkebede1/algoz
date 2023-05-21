import React, { useEffect } from "react";
import styles from "./CourseForm.module.css";
import TextArea from "antd/es/input/TextArea";
import { BsCardImage } from "react-icons/bs";
// import { Input, Select, Form, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Input, Select, Button, message, Upload, Form, Space } from "antd";
import { useState } from "react";
// import CustomInput from "../UI/Input/CustomInput";
// import CustomUpload from "../UI/Upload/CustomUpload";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utility/axios";
import PrimaryBtn from "../UI/PrimaryBtn/PrimaryBtn";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const CourseForm = () => {
  const formik = useFormik({
    initialValues: {
      image: "",
      title: "",
      desc: "",
      price: "",
      instructor: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        // .min(5, "Must be 5 characters or more")
        .required("Please Enter a Course Title"),
      desc: Yup.string()
        // .min(20, "Must be 20 characters or more")
        .required("Please Enter a Course description"),
      price: Yup.number().required("Please Enter a Course Price"),
      instructor: Yup.string(),
      // .required("Please Enter a Course instructors"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <section className={styles.form__container}>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="image">
          {/* {"Upload Image"} */}
          {/* {formik.values.image ? (
            <img src={formik.values.image[1]} alt="image" width={"50"} />
          ) : ( */}
          <BsCardImage size={30} label="Upload" prefix="Upload" />
          {/* )} */}

          {formik.values.image
            ? formik.values.image.slice(12, formik.values.image.length)
            : "Upload Image"}
        </label>

        <input
          style={{ display: "none" }}
          id="image"
          name="image"
          type="file"
          onChange={formik.handleChange}
          // {...formik.getFieldProps("image")}
        />
        <label htmlFor="title">Course Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={formik.errors.title ? styles.error__input : ""}
          {...formik.getFieldProps("title")}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className={styles.form__error}>{formik.errors.title}</div>
        ) : null}

        <label htmlFor="desc">Course Description</label>
        <TextArea
          rows={5}
          id="desc"
          type="text"
          name="desc"
          {...formik.getFieldProps("desc")}
        />
        {formik.touched.desc && formik.errors.desc ? (
          <div className={styles.form__error}>{formik.errors.desc}</div>
        ) : null}

        <label htmlFor="price">Course Price</label>
        <input
          id="price"
          type="number"
          name="price"
          {...formik.getFieldProps("price")}
        />
        {formik.touched.price && formik.errors.price ? (
          <div className={styles.form__error}>{formik.errors.price}</div>
        ) : null}
        <label htmlFor="instructor">Course Price</label>
        <select
          id="instructor"
          name="instructor"
          onChange={formik.handleChange}
        >
          <option value={"Rediet"}>Rediet</option>
          <option value={"Samson"}>Samson</option>
        </select>
        {formik.touched.instructor && formik.errors.instructor ? (
          <div className={styles.form__error}>{formik.errors.instructor}</div>
        ) : null}

        <PrimaryBtn message={"Submit"} isSubmitting={false} size={"medium"}>
          {}
        </PrimaryBtn>
        {/* <button type="submit">Submit</button> */}
      </form>
    </section>
  );
};

export default CourseForm;

// const { Option } = Select;

// const CourseForms = ({ setIsEditing, singleCourse, isEditing }) => {
//   console.log(singleCourse);
//   const [instructor, setInstructor] = useState([]);
//   const [isSubmitting, setSubmitting] = useState(false);
//   // const [isError, setError] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     axiosInstance.get("/manage/users").then((res) => {
//       let filteredInst = res.data.allUser.filter(
//         (user) => user.role == "instructor"
//       );
//       console.log(filteredInst);
//       setInstructor(filteredInst);
//     });
//   }, []);

//   const onFinish = (item) => {
//     setSubmitting(true);
//     console.log(item);

//     const formData = new FormData();
//     formData.append("image", item?.image?.fileList[0]?.originFileObj);
//     formData.append("title", item.title);
//     formData.append("desc", item.desc);
//     formData.append("price", item.price);
//     formData.append("instructor", item.instructor);
//     {
//       isEditing
//         ? axiosInstance
//             .patch(`/courses/${singleCourse._id}`, formData, {
//               headers: { "Content-Type": "multipart/form-data" },
//             })
//             .then((res) => {
//               setSubmitting(false);
//               setIsEditing(false);
//             })
//             .catch((err) => {
//               setSubmitting(false);

//               Swal.fire({
//                 title: "Oops !",
//                 text: err?.response?.data?.message,
//               });
//             })
//         : axiosInstance
//             .post(`/courses`, formData, {
//               headers: { "Content-Type": "multipart/form-data" },
//             })
//             .then((res) => {
//               setSubmitting(false);
//               navigate("/dashboard/courses");
//             })
//             .catch((err) => {
//               setSubmitting(false);

//               Swal.fire({
//                 title: "Oops !",
//                 text: err?.response?.data?.message,
//               });
//             });
//     }
//   };
//   // Props for Upload Form Item
//   const props = {
//     name: "file",
//     beforeUpload(file) {
//       console.log(file);
//       return false;
//     },
//   };
//   return (
//     <div className={styles.form_container}>
//       <h2>{isEditing ? "Update a Course" : "Create A Course"} </h2>

//       {isEditing && singleCourse ? (
//         <Form action="" onFinish={onFinish} className={styles.form}>
//           <Form.Item
//             rules={[
//               {
//                 required: true,
//                 message: "Please upload course image!",
//               },
//             ]}
//           >
//             <Upload
//               maxCount={1}
//               listType={"picture-circle"}
//               accept={".png, jpeg, .gif, .jpg"}
//               name={"image"}
//               {...props}
//             >
//               <Button icon={<UploadOutlined />}>Select a Picture</Button>
//             </Upload>
//           </Form.Item>
//           <Form.Item
//             name="title"
//             rules={[
//               {
//                 required: true,
//                 message: "please input course title here",
//               },
//             ]}
//           >
//             <Input
//               placeholder={"Type a Course Title here"}
//               allowClear={true}
//               // className={className}
//               defaultValue={singleCourse?.title ? singleCourse.title : ""}
//               // addonBefore={sideLabel}
//               name={"courseTitle"}
//               type={"text"}
//             />
//           </Form.Item>
//           <Form.Item
//             name={"desc"}
//             rules={[
//               {
//                 required: true,
//                 message: "please provide course description",
//               },
//             ]}
//           >
//             <TextArea
//               rows={4}
//               placeholder="Course Description"
//               minLength={6}
//               type="text"
//               name="desc"
//               className="form-item"
//               defaultValue={singleCourse ? singleCourse.desc : ""}
//               allowClear
//             />
//           </Form.Item>
//           <Form.Item
//             name={"price"}
//             rules={[
//               {
//                 required: true,
//                 message: "please provide course price",
//               },
//             ]}
//           >
//             <Input
//               placeholder="Type a Course Price"
//               allowClear
//               className="form-item"
//               name="course_price"
//               defaultValue={singleCourse ? singleCourse.price : ""}
//               type="number"
//             />
//           </Form.Item>
//           <Form.Item
//             rules={[
//               {
//                 required: true,
//                 message: "please select the course Instructor",
//               },
//             ]}
//             name="instructor"
//           >
//             <Select
//               style={{
//                 padding: "0px 0",
//               }}
//               // defaultValue={singleCourse.instructor.map((item) => item)}
//               // defaultValue={"Samson"}
//               mode={"multiple"}
//               // options={instructor}
//               placeholder={"Enter a Course Instructor Name"}
//               optionLabelProp="label"
//             >
//               {instructor.map((inst) => {
//                 return (
//                   <Option value={inst._id} label={inst.firstName}>
//                     <Space>
//                       <span role="img" aria-label="China">
//                         {inst.firstName}
//                       </span>
//                       {inst.lastName}
//                     </Space>
//                   </Option>
//                 );
//               })}
//             </Select>
//           </Form.Item>
//           <Form.Item>
//             <PrimaryBtn
//               message={isEditing ? "Update" : "Create"}
//               isSubmitting={isSubmitting}
//             />
//           </Form.Item>
//         </Form>
//       ) : (
//         <h1></h1>
//       )}
//       {!isEditing && (
//         <Form action="" onFinish={onFinish} className={styles.form}>
//           <Form.Item
//             rules={[
//               {
//                 required: true,
//                 message: "Please upload course image!",
//               },
//             ]}
//           >
//             <Upload
//               maxCount={1}
//               listType={"picture-circle"}
//               accept={".png, jpeg, .gif, .jpg"}
//               name={"image"}
//               {...props}
//             >
//               <Button icon={<UploadOutlined />}>Select a Picture</Button>
//             </Upload>
//           </Form.Item>
//           <Form.Item
//             name="title"
//             rules={[
//               {
//                 required: true,
//                 message: "please input course title here",
//               },
//             ]}
//           >
//             <Input
//               placeholder={"Type a Course Title here"}
//               allowClear={true}
//               // className={className}
//               // onChange={onChange}
//               // defaultValue={defaultValue}
//               // addonBefore={sideLabel}
//               name={"courseTitle"}
//               type={"text"}
//               // prefix={prefix}
//               // suffix={suffix}
//             />
//           </Form.Item>
//           <Form.Item
//             name={"desc"}
//             rules={[
//               {
//                 required: true,
//                 message: "please provide course description",
//               },
//             ]}
//           >
//             <TextArea
//               rows={4}
//               placeholder="Course Description"
//               minLength={6}
//               type="text"
//               name="desc"
//               className="form-item"
//               allowClear
//             />
//           </Form.Item>
//           <Form.Item
//             name={"price"}
//             rules={[
//               {
//                 required: true,
//                 message: "please provide course price",
//               },
//             ]}
//           >
//             <Input
//               placeholder="Type a Course Price"
//               allowClear
//               className="form-item"
//               name="course_price"
//               type="number"
//             />
//           </Form.Item>
//           <Form.Item
//             rules={[
//               {
//                 required: true,
//                 message: "please select the course Instructor",
//               },
//             ]}
//             name="instructor"
//           >
//             <Select
//               style={{
//                 padding: "0px 0",
//               }}
//               mode={"multiple"}
//               placeholder={"Enter a Course Instructor Name"}
//               optionLabelProp="label"
//             >
//               {instructor.map((inst) => {
//                 return (
//                   <Option value={inst._id} label={inst.firstName}>
//                     <Space>
//                       <span role="img" aria-label="China">
//                         {inst.firstName}
//                       </span>
//                       {inst.lastName}
//                     </Space>
//                   </Option>
//                 );
//               })}
//             </Select>
//           </Form.Item>
//           <Form.Item>
//             <PrimaryBtn
//               message={isEditing ? "Update" : "Create"}
//               isSubmitting={isSubmitting}
//             />
//           </Form.Item>
//         </Form>
//       )}
//     </div>
//   );
// };

// export default CourseForms;
