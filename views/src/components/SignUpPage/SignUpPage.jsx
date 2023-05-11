import SignUpSvg from "../Svg/SignUpSvg";
import SignUp from "../Auth/Signup";
import signUpImage from "./signupTeam.svg";
import styles from "./signup.module.css";

import React from "react";

function SignUpPage() {
  return (
    // <div className="">
    <div className={styles.container}>
      <div className={styles.img_container}>
        <img src={signUpImage} alt="" />
      </div>
      <div className={styles.form}>
        <SignUp />
      </div>
    </div>
    // </div>
  );
}

export default SignUpPage;
