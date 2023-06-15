import React, { useEffect, useState } from 'react'
import { getTeacherCourses } from '../../api/agent';
import { Col, Row } from 'react-bootstrap';
import CourseCard from '../course/CourseCard';
import SmallLoading from "../../components/loading/SmallLoading";
import { getTeacherCoursesById } from '../../api/course';

const MyCoursesComponent = ({isProfileSection=false, id=null}) => {
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadCourses = async () => {
      setLoading(true);
      try {
        if(isProfileSection) {
          const response = await getTeacherCoursesById(id);
          setCourses(response.data);
        } else {
          const response = await getTeacherCourses();
          setCourses(response.data);
        }
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
}

export default MyCoursesComponent