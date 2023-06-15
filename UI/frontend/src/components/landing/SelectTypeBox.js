import React from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const SelectTypeBox = ({ typeName, bgColor, text, url }) => {
  return (
    <Card
      style={{ minHeight: 350, backgroundColor: bgColor, fontWeight: "bold" }}
      className="p-4 mt-5"
    >
      <Card.Body className="select-typebox">
        <div className="top">
          <div className="top-typename">
            <Image rounded thumbnail src={typeName === "Öğrenci" ? "/images/ogrenci.jpg" : "/images/egitmen.jpg"} alt="..." className="landing-avatar" />
            <h2>{typeName}</h2>
          </div>
          <p>{text}</p>
        </div>

        <div className="mt-4 landing-btn-container">
          <Link to={"/login"} className="green-btn">
            Giriş Yap
          </Link>
          <Link to={`${url}/register`} className="blue-btn">
            Kayıt Ol
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SelectTypeBox;
