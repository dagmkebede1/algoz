import React from "react";
import styles from "./myinput.module.css";
import TextField from "@mui/material/TextField";
import CustomUpload from "../Upload/CustomUpload";
import { InputAdornment, OutlinedInput } from "@mui/material";
import CustomSelect from "../Select/CustomSelect";
import CustomBtn from "../PrimaryBtn/PrimaryBtn";

const MyInput = ({ name, defaultValue, error }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.name);
  };

  const onChange = (e) => {
    console.log(e.target.name);
  };

  return (
    <>
      <form action="" className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form_item}>
          <CustomUpload label={"Course Image"} />
        </div>
        <div className={styles.form_item}>
          <TextField
            id="outlined-basic"
            label="Course Title"
            placeholder="Course Title Here"
            variant="outlined"
            onChange={onChange}
            // defaultValue={"ad"}
            size="small"
            name="title"
          />
        </div>
        <div className={styles.form_item}>
          <TextField
            placeholder="Course Description Here"
            id="outlined-basic"
            label="Course Descriptions"
            variant="outlined"
            onChange={onChange}
            // defaultValue={"ad"}
            name="desc"
            rows={6}
            multiline
          />
        </div>
        <div className={styles.form_item}>
          <OutlinedInput
            id="outlined-adornment-weight"
            placeholder="Price"
            endAdornment={<InputAdornment position="end">ETB</InputAdornment>}
            size="small"
            type="number"
            name="price"
          />
        </div>
        <div className={styles.form_item}>
          <CustomSelect placeholder={"Lists of Instructors"} />
        </div>
        <div className={styles.form_item}>
          <CustomBtn message={"Submit"} size="large" />
        </div>
      </form>
    </>
  );
};

export default MyInput;
