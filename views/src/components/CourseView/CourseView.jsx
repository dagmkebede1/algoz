import React from 'react'
import styles from "./CourseView.module.css"



const CourseView = () => {
  return (
    <section className={styles.course}>
        <div className={styles.course__image}>
            <img src="../../../../public/img/user-1679851850138-811998385.jpeg" alt="" />
        </div>
        <div className={styles.course__info}>
            <div>
                <h2>Title</h2>
                <p>Description</p>
            </div>
            <div>
                <span>1200ETB</span>
                <ul>
                    <li>
                        Samson
                    </li>
                    <li>
                        Rediet
                    </li>
                </ul>
            </div>
        </div>

    </section>
  )
}

export default CourseView