import React from "react";
import AppLayout from "../../../components/layout/AppLayout";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb";
import { Col, Container, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { createCourse, getAllCategories } from "../../../api/agent";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../../hooks/useAccount";
import { createThumbnail } from "../../../api/course";

const CreateCourse = () => {
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();
  const account = useAccount();

  const sendValues = async (values) => {
    const {
      courseName,
      courseDescription,
      courseCategoryId,
      thumbnail,
      price,
      metamaskId,
    } = values;
    try {
      const response = await createCourse({courseName, courseDescription, courseCategoryId, price, metamaskId});
      await createThumbnail(response.data.courseId, thumbnail);
      navigate(`/courses/${response.data.courseId}`);
      toast.success("Kurs başarıyla oluşturuldu!");
    } catch (error) {
      toast.error("Kurs oluşturulurken bir hatayla karşılaşıldı!");
    }
  };

  const loadCategories = async () => {
    const response = await getAllCategories();
    setCategories(response.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const validationSchema = Yup.object().shape({
    courseName: Yup.string()
      .required("*Kurs adı zorunludur")
      .min(10, "*Kurs adı en az 10 karakter olmalıdır"),
    courseDescription: Yup.string()
      .required("*Kurs açıklaması zorunludur")
      .min(10, "*Kurs açıklaması en az 10 karakter olmalıdır"),
    courseCategoryId: Yup.string().required("*Kurs kategorisi zorunludur"),
    price: Yup.number()
      .typeError("*Geçerli bir sayı girin")
      .required("*Kurs fiyatı zorunludur")
      .nullable()
      .positive("*Negatif sayılar kabul edilmez")
      .min(0, "*0 veya daha büyük bir sayı girin"),
    thumbnail: Yup.mixed()
      .required("*Dosya gereklidir.")
      .test(
        "fileFormat",
        "Geçersiz dosya türü. Sadece resim dosyaları kabul edilir.",
        (value) => {
          if (value) {
            return ["image/jpeg", "image/jpg"].includes(value.type);
          }
          return true;
        }
      ),
  });

  return (
    <AppLayout>
      <CustomBreadcrumb
        title="Yeni Kurs Oluştur"
        description="Hemen şimdi uzmanı olduğun bir alanda yeni kurs oluştur..."
      />

      <section id="course-details" className="course-details">
        <Container>
          <Formik
            enableReinitialize
            initialValues={{
              courseName: "",
              courseDescription: "",
              courseCategoryId: "",
              thumbnail: null,
              price: "",
              metamaskId: account ? account : "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await sendValues(values);
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
                <Row>
                  <Col lg={8}>
                    <Form.Group className="mt-3">
                      <Form.Label>
                        <h3>Kurs Adı</h3>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="courseName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.courseName}
                        placeholder="kurs adı..."
                      />
                    </Form.Group>
                    {errors.courseName && touched.courseName && (
                      <Form.Text className="text-danger">
                        {errors.courseName}
                      </Form.Text>
                    )}

                    <Form.Group className="mt-3">
                      <Form.Label>
                        <h3>Kurs Açıklaması</h3>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        name="courseDescription"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.courseDescription}
                        placeholder="kurs açıklaması..."
                      />
                    </Form.Group>
                    {errors.courseDescription && touched.courseDescription && (
                      <Form.Text className="text-danger">
                        {errors.courseDescription}
                      </Form.Text>
                    )}

                    <Form.Group className="mt-3">
                      <Form.Label>
                        <h3>Kurs Fiyatı</h3>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        placeholder="kurs fiyatı..."
                      />
                    </Form.Group>
                    {errors.price && touched.price && (
                      <Form.Text className="text-danger">
                        {errors.price}
                      </Form.Text>
                    )}

                    <Form.Group className="mt-3">
                      <Form.Label>
                        <h3>Kurs Kategorisi</h3>
                      </Form.Label>
                      <Form.Select
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="courseCategoryId"
                        value={values.courseCategoryId}
                      >
                        <option value="">Seçim Yapınız</option>
                        {categories &&
                          categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                    {errors.courseCategoryId && touched.courseCategoryId && (
                      <Form.Text className="text-danger">
                        {errors.courseCategoryId}
                      </Form.Text>
                    )}

                    <Form.Group className="mt-3">
                      <Form.Label>
                        <h3>Metamask Hesabı</h3>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="metamaskId"
                        onBlur={handleBlur}
                        value={values.metamaskId}
                        disabled
                        placeholder="cüzdan id..."
                      />
                    </Form.Group>

                    <Form.Group className="align-right mt-4">
                      <Button
                        size="sm"
                        className="green-btn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Kurs Oluştur
                      </Button>
                    </Form.Group>
                  </Col>

                  <Col lg={4} className="course-details-right">
                    <div className="course-details-right-inner">
                      <img
                        src="/images/create-course.jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>

                    <Form.Group className="mt-3">
                    <Form.Label>
                        <h3>Kurs Fotoğrafı</h3>
                      </Form.Label>
                      <input
                        id="thumbnail"
                        name="thumbnail"
                        type="file"
                        onChange={(event) => {
                          setFieldValue(
                            "thumbnail",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                    </Form.Group>
                    {errors.thumbnail && touched.thumbnail && (
                      <Form.Text className="text-danger">
                        {errors.thumbnail}
                      </Form.Text>
                    )}
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Container>
      </section>
    </AppLayout>
  );
};

export default CreateCourse;
