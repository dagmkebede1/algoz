import style from "./Hero.module.css";
import hero from "./hero.svg";
import React from "react";

const Hero = () => {
  return (
    <div className={style.hero}>
      <div className={style.info}>
        <h1>A place where talents discoverd</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
          explicabo ullam atque consequatur similique commodi repellat placeat
          molestiae earum at, vel quis impedit, exercitationem dolorum assumenda
          deserunt minima dignissimos facere!
        </p>
        <button className={style.btn}>
          <a href="#">Join now</a>
        </button>
      </div>
      <div className={style.image}>
        <img src={hero} alt="" />
      </div>
    </div>
  );
};

export default Hero;
