import LoginSvg from "../Svg/LoginSvg";
import Login from "../Auth/Login";
import styles from "./loginPage.module.css";
import Navbar from "../Nav/Navbar";
import { motion } from "framer-motion";

function LogInPage() {
  return (
    <div>
      <Navbar />
      <div className={styles.login_container}>
        <Login />
        <motion.div
          initial={{ y: 0, opacity: 0.3 }}
          animate={{ y: 100, opacity: 1 }}
          transition={{ duration: 1, easing: "easeIn" }}
        >
          <LoginSvg />
        </motion.div>
      </div>
    </div>
  );
}

export default LogInPage;
