import React from "react";
import AppLayout from "../../../components/layout/AppLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { getAllCategories, updateCourse } from "../../../api/agent";
import { useState } from "react";
import { useEffect } from "react";
import { createThumbnail, deleteThumbnail } from "../../../api/course";

const CourseDetailsEditPane = ({ course }) => {
  const [categories, setCategories] = useState(null);

  const sendValues = async (values) => {
    const {
      courseName,
      courseDescription,
      courseCategoryId,
      thumbnail,
      price,
    } = values;
    try {
      await updateCourse({courseName, courseDescription, courseCategoryId, price, id: course.courseId});
      if(thumbnail !== null) {
        await deleteThumbnail(course.courseId);
        await createThumbnail(course.courseId, thumbnail);
      }
      toast.success("Kurs başarıyla güncellendi!");
    } catch (error) {
      toast.error("Kurs güncellenirken bir hatayla karşılaşıldı!");
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
      .nullable()
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
      <Formik
        enableReinitialize
        initialValues={{
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          courseCategoryId: categories?.find(
            (x) => x.name === course.courseCategory
          )?.id
            ? categories.find((x) => x.name === course.courseCategory).id
            : "",
          thumbnail: null,
          price: course.price,
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
          setFieldValue
        }) => (
          <Form onSubmit={handleSubmit}>
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
              <Form.Text className="text-danger">{errors.courseName}</Form.Text>
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
              <Form.Text className="text-danger">{errors.price}</Form.Text>
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
                <h3>Thumbnail</h3>
                <small>Eğer thumbnail resmini güncellemek istemiyorsanız boş bırakınız</small>
              </Form.Label>
              <div className="mt-2">
              <input
                id="thumbnail"
                name="thumbnail"
                type="file"
                onChange={(event) => {
                  setFieldValue("thumbnail", event.currentTarget.files[0]);
                }}
              />
              </div>
            </Form.Group>
            {errors.thumbnail && touched.thumbnail && (
              <Form.Text className="text-danger">{errors.thumbnail}</Form.Text>
            )}

            <Form.Group className="align-right mt-4">
              <Button
                size="sm"
                className="green-btn"
                type="submit"
                disabled={isSubmitting}
              >
                Kursu Güncelle
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
  );
};

export default CourseDetailsEditPane;
