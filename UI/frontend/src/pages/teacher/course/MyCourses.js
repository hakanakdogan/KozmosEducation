import React from "react";
import {Container } from "react-bootstrap";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb";
import AppLayout from "../../../components/layout/AppLayout";
import MyCoursesComponent from "../../../components/teacher/MyCoursesComponent";

const MyCourses = () => {
  return (
    <AppLayout>
      <CustomBreadcrumb
        title="Eğitim Verdiğim Kurslar"
      />

      <section id="popular-courses" className="courses">
      <Container>
        <div className="section-title">
          <h2>Kurslar</h2>
          <p>Kurslarım</p>
        </div>

        <MyCoursesComponent />
      </Container>
    </section>
    </AppLayout>
  );
};

export default MyCourses;
