import SignUpSvg from "../Svg/SignUpSvg";
import Signup from "../Auth/Signup";
import "./SignUpPage.css";

import React from "react";

function SignUpPage() {
  return (
    <div className="container">
      <p
        style={{
          color: "green",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        Let's Create you Acount !
      </p>
      <div className="signup-page-container">
        <SignUpSvg />
        <Signup />
      </div>
    </div>
  );
}

export default SignUpPage;
