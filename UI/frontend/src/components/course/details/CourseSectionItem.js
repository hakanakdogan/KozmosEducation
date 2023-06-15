import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import { getLectures } from "../../../api/agent";
import { Link, useParams } from "react-router-dom";

const CourseSectionItem = ({ module }) => {
  const [lectures, setLectures] = useState([]);
  const params = useParams();

  const loadLectures = async () => {
    try {
      const response = await getLectures(module.id);
      setLectures(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadLectures();
  }, []);


  return (
    <Accordion.Item eventKey={module.order} className="mt-3">
      <Accordion.Header><b>{`${module.order}. Kısım - ${module.title}`}</b></Accordion.Header>
      <Accordion.Body>
        <ListGroup>
          {
            lectures && lectures.map(lecture => (
              <ListGroup.Item key={lecture.id} className="mt-1" style={{border:"none"}}><small><Link className="text-black" to={`/courses/${params.id}/watch?lecture=${lecture.id}`}>{`${lecture.order}. ${lecture.title}`}</Link></small></ListGroup.Item>
            ))
          }
        </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default CourseSectionItem;
