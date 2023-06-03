import React from "react";
import styles from "./CourseView.module.css";
// let img = "../../assets//blog-item-01.png";
import img from "../../assets//blog-item-01.png";
import { apiBase } from "../utility/api";

const CourseView = ({ singleCourseView }) => {
  console.log(singleCourseView);
  return (
    <section className={styles.course}>
      <div className={styles.course__image}>
        <img
          src={`${apiBase.url}/public/img/course/${singleCourseView.image}`}
          alt=""
        />
      </div>
      <div className={styles.course__info}>
        <div>
          <h2>{singleCourseView.title}</h2>
          <p>{singleCourseView.desc}</p>
        </div>
        <div className={styles.more__info}>
          <div className={styles.course__price}>
            <span>{singleCourseView.price} ETB</span>
            <div>
              <p>Course Instructors</p>
              <ul>
                {singleCourseView?.instructor?.map((inst, i) => {
                  return (
                    <li key={inst._id}>
                      {inst.firstName} {inst.lastName}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <button>Enrol Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseView;
