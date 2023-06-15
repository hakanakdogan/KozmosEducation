import React from "react";
import MyCoursesSlider from "../../components/student/home/MyCoursesSlider";
import AppLayout from "../../components/layout/AppLayout";
import { Container } from "react-bootstrap";

const StudentHome = () => {
  return (
    <AppLayout>
      <section
        id="hero"
        className="d-flex justify-content-center align-items-center"
      >
        <Container className="position-relative mx-4">
          <h1>
            Bugün Öğrenmeye Başla,
            <br />
            Kendini Farklı Kıl
          </h1>
          <h2>
            KozmosEdu ile istediğin alanda kendini kolayca geliştirebilirsin.
            Hemen şimdi dene!
          </h2>
        </Container>
      </section>

      <main id="main">
        <MyCoursesSlider />
      </main>
    </AppLayout>
  );
};

export default StudentHome;
