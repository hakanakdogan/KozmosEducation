import React, { Fragment } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const CreateNewSection = ({ show, handleClose, createSection }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("*Modül açıklaması zorunludur"),
  });

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni Modül Ekle</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            title: ""
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await createSection(values);
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
                  <Form.Control
                    name="title"
                    type="text"
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
                <Button size="sm" className="black-btn" onClick={() => handleClose()}>
                  Kapat
                </Button>
                <Form.Group>
                  <Button
                    size="sm"
                    className="green-btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Modül Oluştur
                  </Button>
                </Form.Group>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
};

export default CreateNewSection;
