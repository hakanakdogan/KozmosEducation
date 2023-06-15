import React from "react";
import { Container } from "react-bootstrap";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb";
import AppLayout from "../../../components/layout/AppLayout";
import AttendedCoursesComponent from "../../../components/student/AttendedCoursesComponent";

const AttendeedCourses = () => {

  return (
    <AppLayout>
      <CustomBreadcrumb
        title="Kurslarım"
        description="Daha önce satın aldığın kurslarını görebilir ve yönetebilirsin"
      />
      <Container>
        <section className="courses">
          <div className="section-title">
            <h2>Kurslar</h2>
            <p>Kurslarım</p>
          </div>

          <AttendedCoursesComponent />
        </section>
      </Container>
    </AppLayout>
  );
};

export default AttendeedCourses;
