import React from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCategory } from '../../api/agent'
import { useState } from 'react'
import CustomBreadcrumb from '../../components/CustomBreadcrumb'
import { Col, Container, Row } from 'react-bootstrap'
import CourseCard from '../../components/course/CourseCard'
import SmallLoading from "../../components/loading/SmallLoading"

const CategoriesPage = () => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const loadCategoryCourses = async () => {
    setLoading(true);
    try {
      const response = await getCategory(params.id);
      setCategory(response.data);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategoryCourses();
  }, [params]);

  return category && (
    <AppLayout>
        <CustomBreadcrumb
        title={`${category.name} Kursları`}
      />
      <Container>
        {
          loading ? <SmallLoading /> :
          <section className="courses">
            <div className="section-title">
              <h2>Kurslar</h2>
              <p>{category.name} Kursları</p>
            </div>

            <Row>
              {category && category.courses &&
                category.courses.map((course) => (
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
          </section>
        }
      </Container>
    </AppLayout>
  )
}

export default CategoriesPage