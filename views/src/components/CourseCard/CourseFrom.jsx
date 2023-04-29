import React from "react";
import { Form } from "antd";
import CustomInput from "../UI/Input/CustomInput";
import CustomSelect from "../UI/Select/CustomSelect";
import CustomUpload from "../UI/Upload/CustomUpload";

const CourseFrom = ({
  titleDefaultValue,
  priceDefaultValue,
  descDefaultValue,
  instDefaultValue,
  selectOptionData,
}) => {
  const onFinish = () => {};

  return (
    <>
      <Form>
        <Form.Item>
          <CustomUpload
            name={"image"}
            accept={".png, .jpeg, jpg, .gif"}
            maxFile={1}
            label={"Upload Image"}
          />
        </Form.Item>
        <Form.Item name={"title"}>
          <CustomInput
            name={"title"}
            allowClear={true}
            defaultValue={titleDefaultValue}
            placeholder={"Course Title"}
          />
        </Form.Item>
        <Form.Item name={"desc"}>
          <CustomInput
            name={"desc"}
            allowClear={true}
            defaultValue={descDefaultValue}
            placeholder={"Course Description"}
          />
        </Form.Item>
        <Form.Item name={"price"}>
          <CustomInput
            name={"price"}
            allowClear={true}
            defaultValue={priceDefaultValue}
            placeholder={"Course Price"}
          />
        </Form.Item>
        <Form.Item name={"instructor"}>
          <CustomSelect
            mode={"multiple"}
            placeholder={"Course"}
            defaultValue={instDefaultValue}
            optionData={selectOptionData}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default CourseFrom;
