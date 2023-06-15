import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ isMyCourse = false, course }) => {
  const url = `/courses/${course ? course.courseId : ""}`;
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    setOwner(course?.attendees?.find((x) => x.isCreator));
  }, []);

  return (
    course && (
      <div className="course-item">
        <div className="course-card-img-container">
          <img
            src={
              course?.thumbnail ? course?.thumbnail : "/images/coursetest.png"
            }
            className="img-fluid course-card-img"
            alt="..."
          />
        </div>
        <div className="course-content">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>
              {course.courseCategory ? course.courseCategory : "Kategori"}
            </h4>
            {!isMyCourse && (
              <p className="price">{course.price ? course.price : "0"} ETH</p>
            )}
          </div>

          <div className="course-content-info">
            <h3>
              <Link to={url}>{course ? course.courseName.substring(0, 70) : "Kurs Adı"}</Link>
            </h3>
            <p>
              {course
                ? course.courseDescription.substring(0, 20)
                : "Kurs Açıklaması"}
              ...
            </p>
          </div>
          <div className="trainer d-flex justify-content-between align-items-center">
            <div className="trainer-profile d-flex align-items-center">
              <span>{owner ? owner.displayName : "No Name"}</span>
            </div>
            <div className="trainer-rank">
              <Link to={url} className="blue-btn">
                Kursa Git
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CourseCard;
