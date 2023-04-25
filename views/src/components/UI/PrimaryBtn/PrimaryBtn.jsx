import React from "react";
import styles from "./primaryBtn.module.css";
import { Button } from "antd";
import { FaSpinner } from "react-icons/fa";

const PrimaryBtn = ({ message, isSubmitting }) => {
  return (
    <>
      <Button
        type="primary"
        htmlType="submit"
        className={styles.btn}
        style={{ width: "100%" }}
      >
        <FaSpinner
          className={
            isSubmitting ? styles.loading_icon_load : styles.loading_icon
          }
        />
        {message}
      </Button>
    </>
  );
};

export default PrimaryBtn;
