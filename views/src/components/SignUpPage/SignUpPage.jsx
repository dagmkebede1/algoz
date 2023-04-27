import SignUpSvg from "../Svg/SignUpSvg";
import Signup from "../Auth/Signup";
// import "./SignUpPage.css";

import React from "react";

function SignUpPage() {
  return (
    <div className="">
      {/* <p
        style={{
          color: "green",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Let's Create you Acount !
      </p> */}
      <div className="">
        {/* <SignUpSvg /> */}
        <Signup />
      </div>
    </div>
  );
}

export default SignUpPage;
