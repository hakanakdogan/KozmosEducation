import React, { Fragment, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import SmallLoading from "../../../loading/SmallLoading";

const CreateNewLecture = ({ show, handleClose, createLecture, section }) => {
  const [loading, setLoading] = useState(false);


  const validationSchema = Yup.object().shape({
    title: Yup.string().required("*Ders adı zorunludur"),
    content: Yup.string().required("*Ders açıklaması zorunludur"),
    file: Yup.mixed().required('*Dosya gereklidir.').test(
      'fileFormat',
      'Geçersiz dosya türü. Sadece video dosyaları kabul edilir.',
      (value) => {
        if (value) {
          return ['video/mp4', 'video/mpeg'].includes(value.type);
        }
        return true;
      }
    ),
  });

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni Ders Ekle</Modal.Title>
        </Modal.Header>
        <Formik
          enableReinitialize
          initialValues={{
            courseModuleId: section.id,
            title: "",
            content: "",
            file: null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true);
            await createLecture(values);
            setLoading(false);
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
            setFieldValue,
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
                    placeholder="ders adı..."
                  />
                </Form.Group>
                {errors.title && touched.title && (
                  <Form.Text className="text-danger">{errors.title}</Form.Text>
                )}

                <Form.Group className="mt-3">
                  <Form.Control
                    as="textarea"
                    name="content"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.content}
                    placeholder="ders açıklaması..."
                  />
                </Form.Group>
                {errors.content && touched.content && (
                  <Form.Text className="text-danger">
                    {errors.content}
                  </Form.Text>
                )}

                <Form.Group className="mt-3">
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                </Form.Group>
                {errors.file && touched.file && (
                  <Form.Text className="text-danger">{errors.file}</Form.Text>
                )}

                {loading && <div className="mt-3">
                  <SmallLoading />
                  <small><center>Videonuz işleniyor, lütfen bekleyiniz...</center></small>
                  </div>}
                
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
                    Ders Oluştur
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

export default CreateNewLecture;
