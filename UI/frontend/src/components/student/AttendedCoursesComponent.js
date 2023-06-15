import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CourseCard from "../course/CourseCard";
import { getUserCourses } from "../../api/agent";
import SmallLoading from "../loading/SmallLoading";

const AttendedCoursesComponent = ({isProfileSection=false}) => {
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

  return loading ? <SmallLoading /> : (
    <Row>
      {courses &&
        courses.map((course) => (
          <Col
            key={course.courseId}
            lg={isProfileSection ? 6 : 4}
            md={6}
            className="d-flex align-items-stretch mt-4 mt-md-0"
          >
            <CourseCard course={course} />
          </Col>
        ))}
    </Row>
  );
};

export default AttendedCoursesComponent;
