import LoginSvg from "../Svg/LoginSvg";
import Login from "../Auth/Login";
import styles from "./loginPage.module.css";
import Navbar from "../Nav/Navbar";

function LogInPage() {
  return (
    <div>
      <Navbar />
      <div className={styles.login_container}>
        <Login />
        <LoginSvg />
      </div>
    </div>
  );
}

export default LogInPage;
