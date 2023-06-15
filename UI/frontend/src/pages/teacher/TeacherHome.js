import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { Container } from "react-bootstrap";
import MyCoursesComponent from "../../components/teacher/MyCoursesComponent";

const TeacherHome = () => {
  return (
    <AppLayout>
      <section
        id="hero"
        className="d-flex justify-content-center align-items-center"
      >
        <Container className="position-relative mx-4">
          <h1>
            Bugün Öğretmeye Başla,
            <br />
            Kripto Gelir Kazan
          </h1>
          <h2>
            KozmosEdu ile uzman olduğun alanda kolayca eğitim verebilirsin.
            Hemen şimdi dene!
          </h2>
        </Container>
      </section>

      <main id="main">
      <section id="popular-courses" className="courses">
      <Container>
        <div className="section-title">
          <h2>Kurslar</h2>
          <p>Kurslarım</p>
        </div>

        <MyCoursesComponent />
      </Container>
    </section>
      </main>
    </AppLayout>
  );
};

export default TeacherHome;
