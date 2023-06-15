import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const UpdateComment = ({comment, updateComment, show, handleClose}) => {

    const validationSchema = Yup.object().shape({
        id: Yup.string().required("*Yorum ID zorunludur"),
        text: Yup.string().required("*İçerik zorunludur"),
      });
      console.log("TORUM: ", comment);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Yorum Düzenle</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize
        initialValues={{
            id: comment ? comment.id : "",
            text: comment ? comment.text : "",
          }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await updateComment(values);
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
                    <Form.Control
                        className="comment-textarea"
                        as="textarea"
                        name="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.text}
                        placeholder="yorum metnini giriniz..."
                    />
              </Form.Group>
              {errors.text && touched.text && (
                <Form.Text className="text-danger">{errors.text}</Form.Text>
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
                  className="green-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Yorumu Düzenle
                </Button>
              </Form.Group>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateComment;
