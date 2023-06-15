import React, { Fragment } from "react";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsPencilSquare, BsArrowsMove, BsFillTrashFill } from "react-icons/bs";
import { Form, Col, Row, Button } from "react-bootstrap";
import EditLecture from "./EditLecture";

const LectureDragItem = ({ index, item, deleteLecture, updateLecture }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <EditLecture updateLecture={updateLecture} lecture={item} show={show} handleClose={handleClose} />

      <Draggable index={index} draggableId={item.id}>
        {(provided, snapshot) => (
          <div
            className="drag-item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
              background: snapshot.isDragging ? "pink" : "transparent",
            }}
          >
            <Row>
              <Col sm={1} {...provided.dragHandleProps}>
                <BsArrowsMove />
              </Col>
              <Col sm={9}>
                <p>{item.title}</p>
              </Col>
              <Col sm={2} className="align-right">
                <BsPencilSquare
                  className="cursor-pointer mx-2"
                  onClick={() => handleShow()}
                />
                <BsFillTrashFill
                  className="cursor-pointer"
                  onClick={() => deleteLecture(item.id)}
                />
              </Col>
            </Row>
          </div>
        )}
      </Draggable>
    </Fragment>
  );
};

export default LectureDragItem;
