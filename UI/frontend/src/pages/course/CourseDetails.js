import React, { useEffect, useState } from "react";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import CourseDetailsPane from "../../components/course/details/CourseDetailsPane";
import CourseSocialMediaPane from "../../components/course/social/CourseSocialMediaPane";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useUserId } from "../../hooks/useUserId";
import AppLayout from "../../components/layout/AppLayout";
import { attendCourse, getCourse } from "../../api/agent";
import { toast } from "react-toastify";
import {useContract} from "../../hooks/useContract";
import { ethers } from "ethers";
import SmallLoading from "../../components/loading/SmallLoading";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const userId = useUserId();
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const { id } = params;
  const transferContract = useContract();


  const loadCourse = async () => {
    setLoading(true);
    try {
      const response = await getCourse(id);
      response.data.attendees.forEach((x) => {
        if (x.id === userId) {
          setIsMember(true);
          setIsCreator(x.isCreator);
        }
      });
      setCourse(response.data);
      setOwner(response.data.attendees.find(x => x.isCreator));
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  const attend = async () => {
    try {
      const valueInWei = ethers.utils.parseEther(course.price ? `${course.price}` : "0");
      let transaction = await transferContract.addBalance(course.metamaskId, { value: valueInWei });
      await transaction.wait();
      await attendCourse(id);
      setIsMember(true);
      toast.success("Kursa başarıyla katıldınız");
    } catch (error) {
      console.log(error);
      toast.error("Kursa katılma işlemi başarısız oldu!");
    }
  };

  useEffect(() => {
    loadCourse();
  }, []);

  return course && (
    <AppLayout>
      <CustomBreadcrumb title={course.courseName} />

      {
        loading ? <SmallLoading /> :
        <section id="course-details" className="course-details">
        <Container>
          <Row>
            <Col lg={8}>
              <Tabs defaultActiveKey="details" className="align-right">
                <Tab eventKey="details" title="Detay">
                  <CourseDetailsPane course={course} />
                </Tab>
                <Tab eventKey="social" title="Sosyal Medya">
                  <CourseSocialMediaPane isMember={isMember} />
                </Tab>
              </Tabs>
            </Col>

            <Col lg={4} className="course-details-right">
              <div className="course-details-right-inner">
                <img
                  src={course?.thumbnail ? course?.thumbnail : "/images/coursetest.png"}
                  className="img-fluid"
                  alt=""
                />
                <div className="course-info d-flex justify-content-between align-items-center mt-4">
                  <h5>Eğitmen</h5>
                  <Link className="cursor-pointer" to={`/user/${owner.id}`}><p>{owner.displayName}</p></Link>
                </div>

                <div className="course-info d-flex justify-content-between align-items-center">
                  <h5>Kurs Ücreti</h5>
                  <p>{course.price ? course.price : "0"} ETH</p>
                </div>

                <div className="align-right mt-4">
                  {isCreator && (
                    <Link to={`/courses/${id}/edit`} className="black-btn">
                      Kursu Düzenle
                    </Link>
                  )}
                  {isMember ? (
                    <Link to={`/courses/${id}/watch`} className="green-btn">
                      Kursu Aç
                    </Link>
                  ) : (
                    <Button onClick={() => attend()} className="green-btn">
                      Satın Al
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      }
    </AppLayout>
  );
};

export default CourseDetails;
