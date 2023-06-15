import React, { Fragment } from "react";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsPencilSquare, BsArrowsMove, BsFillTrashFill } from "react-icons/bs";
import {AiOutlineVideoCameraAdd} from "react-icons/ai";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Col, Row, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const DragItem = ({ index, item, updateModuleName, deleteModule, setSelectedSection }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("*Modül açıklaması zorunludur"),
  });

  const DragItemModal = () => (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modül Düzenle</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          title: item.title,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await updateModuleName({...item, title:values.title});
          handleClose();
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mt-3">
                <Form.Label>
                  <h5>Modül Adı</h5>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  placeholder="modül adı..."
                />
              </Form.Group>
              {errors.title && touched.title && (
                <Form.Text className="text-danger">{errors.title}</Form.Text>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                size="sm"
                className="black-btn"
                onClick={() => handleClose()}
              >
                Kapat
              </Button>
              <Form.Group>
                <Button
                  size="sm"
                  className="black-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Modül Güncelle
                </Button>
              </Form.Group>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );

  return (
    <Fragment>
      <DragItemModal />
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
              <Col sm={2} {...provided.dragHandleProps}>
                <BsArrowsMove />
              </Col>
              <Col sm={6}>
                <p>{item.title}</p>
              </Col>
              <Col sm={2} className="align-right">
                <BsPencilSquare
                  size={24}
                  className="cursor-pointer"
                  onClick={() => handleShow()}
                />
                <BsFillTrashFill
                  size={24}
                  className="cursor-pointer mx-2"
                  onClick={() => deleteModule(item.id)}
                />
              </Col>
              <Col sm={2} className="align-right">
                <Button onClick={() => setSelectedSection(item)} size="sm" className="green-btn">
                  Dersler
                </Button>
              </Col>
              {/* <Col sm={1}> */}
                {/* <Button size="sm" className="green-btn">
                  Dersler
                </Button> */}
              {/* <AiOutlineVideoCameraAdd
                  onClick={() => setSelectedSection(item)}
                  className="cursor-pointer mx-3"
                /> */}
              {/* </Col> */}
            </Row>
          </div>
        )}
      </Draggable>
    </Fragment>
  );
};

export default DragItem;
