import React from "react";
import { Input, Select, Button, message, Upload, Form, Space } from "antd";

const { Option } = Select;

//mode:"multiple"
//multipleMode="multiple"
//optionData format
// const data = [
//   {
//     value: "Samson",
//     label: "Samson",
//   }
//]

const CustomSelect = ({ mode, placeholder, optionData }) => {
  return (
    <>
      <Select
        mode={mode}
        options={optionData}
        placeholder={placeholder}
        optionLabelProp="label"
      ></Select>
    </>
  );
};

export default CustomSelect;
