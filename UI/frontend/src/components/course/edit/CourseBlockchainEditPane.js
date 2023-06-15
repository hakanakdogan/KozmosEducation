import React from "react";
import AppLayout from "../../../components/layout/AppLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateCourse } from "../../../api/agent";
import { useParams } from "react-router-dom";

const CourseBlockchainEditPane = ({course}) => {
  const params = useParams();

  const sendValues = async (values) => {
    try {
      await updateCourse(values);
      toast.success("Kurs blockchain bilgileri başarıyla güncellendi!");
    } catch (error) {
      console.log(error);
      toast.error("Kurs blockchain bilgileri güncellenirken bir hatayla karşılaşıldı!");
    }
  };

  const validationSchema = Yup.object().shape({
    metamaskId: Yup.string()
      .required("*Metamask ID zorunludur")
  });

  return (
    <AppLayout>
          <Formik
            initialValues={{
              id: params.id,
              metamaskId: course.metamaskId
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
            }) => (
              <Form onSubmit={handleSubmit}>
                      <Form.Group className="mt-3">
                      <Form.Label>
                        <h3>Metamask Hesabı</h3>
                        <div>
                          <small><b>Lütfen bu alanı güncellerken çok dikkatli olunuz! Hatalı girilen cüzdan koduna yapılacak ödemeler size ulaşmayacaktır.</b></small>
                        </div>
                        <div className="mb-2">
                          <small>Bu alan; varsayılan olarak kullandığınız Cüzdan ID değerinize ayarlıdır.</small>
                          <small>Blockchain cüzdanları hakkındaki detaylara hakim olmadan güncellememenizi öneririz.</small>
                        </div>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="metamaskId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.metamaskId}
                        placeholder="cüzdan id..."
                      />
                    </Form.Group>
                    {errors.metamaskId && touched.metamaskId && (
                      <Form.Text className="text-danger">
                        {errors.metamaskId}
                      </Form.Text>
                    )}

                    <Form.Group className="align-right mt-4">
                      <Button
                        size="sm"
                        className="green-btn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Cüzdan Bilgilerini Güncelle
                      </Button>
                    </Form.Group>
              </Form>
            )}
          </Formik>
    </AppLayout>
  );
};

export default CourseBlockchainEditPane