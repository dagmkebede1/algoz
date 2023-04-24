import style from "./Hero.module.css";
import hero from "./hero.svg";
import React from "react";
import { easeInOut, motion } from "framer-motion";
import Navbar from "../Nav/Navbar";

const Hero = () => {
  return (
    <>
      <Navbar />
      <div className={style.hero}>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, easings: ["easeIn", "easeOut"] }}
        >
          <div className={style.info}>
            <h1>A place where talents discoverd</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
              explicabo ullam atque consequatur similique commodi repellat
              placeat molestiae earum at, vel quis impedit, exercitationem
              dolorum assumenda deserunt minima dignissimos facere!
            </p>
            <button className={style.btn}>
              <a href="#">Join now</a>
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, easings: ["easeIn, easeInOut"] }}
        >
          <div className={style.image}>
            <img src={hero} alt="" />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Hero;
