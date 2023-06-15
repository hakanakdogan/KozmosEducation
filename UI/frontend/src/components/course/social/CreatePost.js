import React from "react";
import Avatar from "../../Avatar";
import { useDisplayName } from "../../../hooks/useDisplayName";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { createImage, createPost } from "../../../api/social";
import { toast } from "react-toastify";
import { getPost } from "../../../api/social";

const CreatePost = ({setPosts}) => {
  const displayName = useDisplayName();
  const params = useParams();

  const validationSchema = Yup.object().shape({
    courseId: Yup.string().required("*Kurs ID zorunludur"),
    text: Yup.string().required("*İçerik zorunludur"),
    imageUrl: Yup.mixed()
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

  const sendValues = async (values) => {
    const {courseId,text,imageUrl} = values;
    try {
      const response = await createPost({courseId,text});
      if(imageUrl){
        await createImage(response.data.id, imageUrl);
      }
      const {data} = await getPost(response.data.id);
      setPosts(old => [...old, data])
      toast.success("Gönderi başarıyla oluşturuldu!");
    } catch (error) {
      toast.error("Gönderi oluşturulurken bir hatayla karşılaşıldı!");
    }
  }

  return (
    <div className="social-wrapper">
      <section className="post">
        <Formik
          initialValues={{
            courseId: params.id,
            text: "",
            imageUrl: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await sendValues(values);
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
            setFieldValue
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
                  placeholder="gönderi metnini giriniz..."
                />
              </Form.Group>
              {errors.text && touched.text && (
                <Form.Text className="text-danger">{errors.text}</Form.Text>
              )}

                    <Form.Group className="mt-3">
                      <input
                        id="imageUrl"
                        name="imageUrl"
                        type="file"
                        onChange={(event) => {
                          setFieldValue(
                            "imageUrl",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                    </Form.Group>
                    {errors.imageUrl && touched.imageUrl && (
                      <Form.Text className="text-danger">
                        {errors.imageUrl}
                      </Form.Text>
                    )}

              <Form.Group>
                <div className="align-right">
                  <Button
                    className="green-btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Gönderi Oluştur
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

export default CreatePost;
