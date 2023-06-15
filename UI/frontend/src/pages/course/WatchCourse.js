import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { Col, Container, Row } from "react-bootstrap";
import VideoPlayer from "../../components/course/watch/VideoPlayer";
import CourseSections from "../../components/course/details/CourseSections";
import { useNavigate, useParams } from "react-router-dom";
import { getCourse } from "../../api/course";
import { useState } from "react";
import { useUserId } from "../../hooks/useUserId";
import { useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { Fragment } from "react";
import SmallLoading from "../../components/loading/SmallLoading"
import { getLectureMaterial } from "../../api/lectureMaterial";
import { toast } from "react-toastify";

const WatchCourse = () => {
  const params = useParams();
  const [lectureMaterial, setLectureMaterial] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const userId = useUserId();
  const navigate = useNavigate();
  const [searchParams, ] = useSearchParams();

  const loadCourse = async () => {
    setLoading(true);
    let member = false;
    try {
      const response = await getCourse(params.id);
      response.data.attendees.forEach((x) => {
        if (x.id === userId) {
          member = true;
        }
      });

      if(!member) {
        navigate(`/courses/${params.id}`);
        toast.error("Bu kursun bir üyesi değilsiniz")
      } else {
        setCourse(response.data);
      }
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };


  const loadLectureMaterial = async (id) => {
    setVideoLoading(true);
    try {
      const response = await getLectureMaterial(id);
      setLectureMaterial(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setVideoLoading(false);
    }
  }

  useEffect(() => {
    loadCourse();
  }, []);

  useEffect(() => {
    const lectureId = searchParams.get('lecture');
    if(lectureId) {
      loadLectureMaterial(lectureId);
    }
  }, [searchParams]);

  return (
    <AppLayout>
      <Container className="wv-container headertop">
      {
        loading ? <SmallLoading /> :
        <Fragment>
          {course && (
          <Row>
            <Col md={9}>
              { videoLoading ? <SmallLoading /> :  <VideoPlayer course={course} url={lectureMaterial?.url ? lectureMaterial?.url : null} /> }
            </Col>
            <Col md={3} className="wv-sections">
              <CourseSections courseModules={course.courseModules} />
            </Col>
          </Row>
        )}
        </Fragment>
      }
      </Container>
    </AppLayout>
  );
};

export default WatchCourse;
