import React, { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
// import "./Other.css";
import Cookies from "universal-cookie";
import validator from "validator";
import SweetAlert from "sweetalert2";

const cookies = new Cookies();
const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorData, setErrorData] = useState([]);
  const [isError, setIsError] = useState(false);

  let emailHandler = (e) => {
    setLoginInfo((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  };
  let passwordHandler = (e) => {
    setLoginInfo((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  };
  let submitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!loginInfo.email) {
      setIsError(true);
      setErrorData(errorData.push("Please enter your Email address"));
    }
    if (!loginInfo.password) {
      setIsError(true);
      setErrorData(errorData.push("Please enter your Password"));
    }
    if (!validator.isEmail(loginInfo.email)) {
      setIsError(true);
      setErrorData(errorData.push("Please enter a valid Password"));
    } else {
      console.log(loginInfo);
      setIsError(false);
      setErrorData([]);
      axios
        .post("http://localhost:5000/login", loginInfo)
        .then((res) => {
          console.log(res.data.token);
          cookies.set("jwt", res.data.token, { path: "/" });
          setIsSubmitting(false);
        })
        .catch(() => {
          console.log(err.response.data);
          setIsSubmitting(false);
        });
    }
  };
  return (
    <div>
      <div className="formbg-outer">
        <div className="formbg">
          <div className="formbg-inner padding-horizontal--48">
            <span className="padding-bottom--15">Sign in to your account</span>
            {
              isError &&
                SweetAlert.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Check every Required feilds",
                  footer: '<a href="">Why do I have this issue?</a>',
                })
              // errorData.map((err) => {
              //   return (
              //     <>
              //       <p>{err}</p>
              //     </>
              //   );
              // })
            }

            <form onSubmit={submitHandler}>
              <div className="field padding-bottom--24">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={emailHandler} />
              </div>
              <div className="field padding-bottom--24">
                <div className="grid--50-50">
                  <label htmlFor="password">Password</label>
                  <div className="reset-pass">
                    <a href="#">Forgot your password?</a>
                  </div>
                </div>
                <input
                  type="password"
                  name="password"
                  onChange={passwordHandler}
                />
              </div>
              <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                <label htmlFor="checkbox">
                  <input type="checkbox" name="checkbox" /> Stay signed in for a
                  week
                </label>
              </div>
              <div className="field padding-bottom--24">
                <button
                  type="submit"
                  name="submit"
                  value="Continue"
                  disabled={isSubmitting}
                >
                  <FaSpinner
                    className={
                      isSubmitting ? "loading-icon load" : "loading-icon"
                    }
                  />
                  <p>Sign In</p>
                </button>
              </div>
              <div className="field">
                <a className="ssolink" href="#">
                  Use single sign-on (Google) instead
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="footer-link padding-top--24">
          <span>
            Don't have an account? <a href="">Sign up</a>
          </span>
          <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
            <span>
              <a href="#">© Stackfindover</a>
            </span>
            <span>
              <a href="#">Contact</a>
            </span>
            <span>
              <a href="#">Privacy & terms</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
