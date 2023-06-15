import React from "react";
import CourseSections from "./CourseSections";

const CourseDetailsPane = ({course}) => {
  return (
    <>
      <h3>{course ? course.courseName : "Kurs Adı" }</h3>
      <p>{course ? course.courseDescription : "Kurs açıklaması" }</p>
      <div className="mt-5">
        <CourseSections courseModules={course.courseModules} />
      </div>
    </>
  );
};

export default CourseDetailsPane;
