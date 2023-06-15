import React from 'react'
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import CustomBreadcrumb from '../../components/CustomBreadcrumb'
import AppLayout from '../../components/layout/AppLayout'
import CourseDetailsEditPane from '../../components/course/edit/CourseDetailsEditPane'
import CourseSectionsEditPane from '../../components/course/edit/sections/CourseSectionsEditPane'
import CourseBlockchainEditPane from "../../components/course/edit/CourseBlockchainEditPane"
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserId } from '../../hooks/useUserId'
import { getCourse } from '../../api/agent'
import { useEffect } from 'react'
import SmallLoading from "../../components/loading/SmallLoading"

const EditCourse = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { id } = params;
  const userId = useUserId();
  const navigate = useNavigate();

  const loadCourse = async () => {
    setLoading(true);
    try {
      const response = await getCourse(id);
      let isCreator = false;
      response.data.attendees.forEach((x) => {
        if (x.id === userId) {
          if(x.isCreator) {
              isCreator = true;
          }
        }
      });

      isCreator ? setCourse(response.data) : navigate(`/courses/${id}`);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourse();
  },[]);


  return course && (
    <AppLayout>
      <CustomBreadcrumb title="Kursu Düzenle" />

      {
        loading ? <SmallLoading /> :
        <section id="course-details" className="course-details">
        <Container>
          <Row>
            <Col lg={8}>
              <Tabs defaultActiveKey="details" className="align-right">
                <Tab eventKey="details" title="Genel Ayarlar">
                  <CourseDetailsEditPane course={course} />
                </Tab>
                <Tab eventKey="sections" title="Kurs Bölümleri">
                  <CourseSectionsEditPane course={course} />
                </Tab>
                <Tab eventKey="blockchain" title="Blockchain Ayarları">
                  <CourseBlockchainEditPane course={course} />
                </Tab>
              </Tabs>
            </Col>

            <Col lg={4} className="course-details-right">
              <div className="course-details-right-inner">
                <img
                  src="/images/update-course.jpg"
                  className="img-fluid"
                  alt=""
                />

                <Button onClick={() => navigate(`/courses/${id}`)} className="blue-btn w-100 mt-3">
                  Kurs Sayfasına Git
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      }

    </AppLayout>
  )
}

export default EditCourse