import LoginSvg from "../Svg/LoginSvg";
import Login from "../../components/Auth/Form";
import "./LogInpage.css";

function LogInPage() {
  return (
    <div className="">
      <div className="login-container">
        <Login />
        <LoginSvg />
      </div>
    </div>
  );
}

export default LogInPage;
