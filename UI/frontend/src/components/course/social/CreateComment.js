import React from "react";
import Avatar from "../../Avatar";
import { useDisplayName } from "../../../hooks/useDisplayName";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const CreateComment = ({createComment}) => {
  const displayName = useDisplayName();

  const validationSchema = Yup.object().shape({
    text: Yup.string().required("*İçerik zorunludur"),
  });


  return (
    <div className="comment-card">
      <section className="post">
        <Formik
          initialValues={{
            text: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await createComment(values);
            setSubmitting(false);
            resetForm();
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
              <div className="content">
                <Avatar name={displayName} />
                <div className="details">
                  <p>{displayName}</p>
                </div>
              </div>

              <Form.Group className="mt-3">
                <Form.Control
                  className="post-textarea"
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

              <Form.Group className="mt-2">
                <div className="align-right">
                  <Button
                    className="green-btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Yorum Yap
                  </Button>
                </div>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
};

export default CreateComment;
