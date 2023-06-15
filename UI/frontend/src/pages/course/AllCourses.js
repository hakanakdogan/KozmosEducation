import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CourseCard from "../../components/course/CourseCard";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import AppLayout from "../../components/layout/AppLayout";
import { useEffect } from "react";
import { getAllCourses } from "../../api/agent";
import SmallLoading from "../../components/loading/SmallLoading";

const AllCourses = () => {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const response = await getAllCourses();
      setCourses(response.data);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <AppLayout>
      <CustomBreadcrumb
        title="Tüm Kurslar"
        description="Eğitim verilen tüm kursları görebilir ve yönetebilirsin"
      />
      <Container>
        <section className="courses">
          <div className="section-title">
            <h2>Kurslar</h2>
            <p>Tüm Kurslar</p>
          </div>

          {
            loading ? <SmallLoading /> :
            <Row>
              {courses &&
                courses.map((course) => (
                  <Col
                    key={course.courseId}
                    lg={4}
                    md={6}
                    className="d-flex align-items-stretch mt-4 mt-md-0"
                  >
                    <CourseCard course={course} />
                  </Col>
                ))}
            </Row>
          }
        </section>
      </Container>
    </AppLayout>
  );
};

export default AllCourses;
