import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import SelectTypeBox from '../../components/landing/SelectTypeBox'
import AppLayout from '../../components/layout/AppLayout'

const LandingPage = () => {
  return (
    <AppLayout>
      <Container className="headertop">
      <Row>
        <center>
          <h1>Hangi Amaçla Kullanıyorsun?</h1>
          <p>KozmosEdu ile kolayca öğretmen olarak bir eğitim verebilir veya öğrenci olarak kendini geliştirebilirsin</p>
          </center>
        <Col md={6}>
          <SelectTypeBox
            typeName="Öğrenci"
            bgColor='#fff'
            text="Bir öğrenci olarak aramıza katıl, eğitmenlerin verdikleri kurslara katılarak kendini geliştir ve yeni şeyler öğren."
            url="student"
          />
        </Col>
        <Col md={6}>
        <SelectTypeBox
            typeName="Eğitmen"
            bgColor='#fff'
            text="Bir eğitmen olarak aramıza katıl, kurslarınla kendine bir gelir kaynağı oluştur ve yeni şeyler öğretmenin tadını çıkart."
            url="teacher"
          />
        </Col>
      </Row>
      </Container>
    </AppLayout>
  )
}

export default LandingPage