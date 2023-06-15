import React from "react";
import CourseCard from "../../course/CourseCard";
import { Row } from "react-bootstrap";

const PopularCourses = () => {
  
  return (
    <section id="popular-courses" className="courses">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Kurslar</h2>
          <p>Popüler Kurslar</p>
        </div>

        <Row data-aos="zoom-in" data-aos-delay="100">
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
            <CourseCard />
          </div>
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
            <CourseCard />
          </div>
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
            <CourseCard />
          </div>
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
            <CourseCard />
          </div>
        </Row>
      </div>
    </section>
  );
};

export default PopularCourses;
