import React, { Fragment, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { getCourseModule } from "../../../../api/agent";
import SmallLoading from "../../../loading/SmallLoading";

const EditLecture = ({ lecture, show, handleClose, updateLecture }) => {
  const [courseSections, setCourseSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const loadCourseSections = async () => {
    const response = await getCourseModule(params.id);
    setCourseSections(response.data);
  };

  useEffect(() => {
    loadCourseSections();
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("*Ders adı zorunludur"),
    content: Yup.string().required("*Ders açıklaması zorunludur"),
    file: Yup.mixed().nullable().test(
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
          <Modal.Title>Ders Güncelle</Modal.Title>
        </Modal.Header>
        <Formik
          enableReinitialize
          initialValues={{
            id: lecture.id,
            courseModuleId: lecture.courseModuleId,
            title: lecture.title,
            content: lecture.content,
            file: null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true);
            await updateLecture(values);
            setLoading(false);
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
            setFieldValue
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
                  <Form.Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="courseModuleId"
                    value={values.courseModuleId}
                  >
                    <option value="">Seçim Yapınız</option>
                    {courseSections &&
                      courseSections.map((courseSection) => (
                        <option key={courseSection.id} value={courseSection.id}>
                          {courseSection.title}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
                {errors.courseCategoryId && touched.courseCategoryId && (
                  <Form.Text className="text-danger">
                    {errors.courseCategoryId}
                  </Form.Text>
                )}


                <Form.Group className="mt-5">
                  <Form.Label><h5>Videoyu Güncelle</h5></Form.Label>
                  <div><small className="text-danger">Eğer videoyu güncellemek istemiyorsanız dosya seçimi yapmanıza gerek yoktur.</small></div>
                  <input
                    className="mt-2"
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

                {loading && <SmallLoading />}


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
                    Dersi Güncelle
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

export default EditLecture;
