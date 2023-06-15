import React, { useEffect, useState } from "react";
import CourseCard from "../../course/CourseCard";
import Slider from "react-slick";
import { getUserCourses } from "../../../api/agent";
import SmallLoading from "../../loading/SmallLoading";

const MyCoursesSlider = () => {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const response = await getUserCourses();
      setCourses(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <section id="popular-courses" className="courses">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Kurslar</h2>
          <p>Katıldığım Kurslar</p>
        </div>

        {loading ? (
          <SmallLoading />
        ) : (
          <Slider {...settings}>
            {courses &&
              courses.map((course) => (
                <div key={course.courseId}>
                  <CourseCard isMyCourse={true} course={course} />
                </div>
              ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default MyCoursesSlider;
