import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const UpdatePost = ({post, updatePost, show, handleClose}) => {

    const validationSchema = Yup.object().shape({
        postId: Yup.string().required("*Kurs ID zorunludur"),
        text: Yup.string().required("*İçerik zorunludur"),
      });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Gönderi Düzenle</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize
        initialValues={{
            postId: post.id,
            text: post.text,
            imageUrl: post.imageUrl,
          }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await updatePost({...post, text: values.text, imageUrl: values.imageUrl});
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
                        className="post-textarea"
                        as="textarea"
                        name="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.text}
                        placeholder="gönderi metnini giriniz..."
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
                  Gönderiyi Düzenle
                </Button>
              </Form.Group>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdatePost;
