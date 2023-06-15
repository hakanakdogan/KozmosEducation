import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AppLayout from "../../components/layout/AppLayout";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { batch, useDispatch } from "react-redux";
import {
  setDisplayName,
  setEmail,
  setId,
  setRole,
  setUsername,
} from "../../store/slices/userInfo";

const TeacherRegister = () => {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("*Email zorunludur"),
    displayName: Yup.string().required("*İsim zorunludur"),
    username: Yup.string().required("*Kullanıcı adı zorunludur"),
    password: Yup.string().required("*Şifre zorunludur"),
  });

  const registerUser = async (values) => {
    setErrors([]);
    try {
      const response = await axios.post(
        "https://localhost:7044/api/account/register",
        values
      );
      response !== null
        ? toast.success("Kullanıcı başarıyla kayıt edildi")
        : toast.error("Kullanıcı kayıt edilemedi");

      if (response !== null) {
        localStorage.setItem("token", response.data.token);
        batch(() => {
          dispatch(setDisplayName(response.data.displayName));
          dispatch(setEmail(response.data.email));
          dispatch(setUsername(response.data.username));
          dispatch(setId(response.data.id));
          dispatch(setRole(response.data.role[0]));
        });

        navigate("/");
      }
    } catch (error) {
      if (error.response.data && typeof error.response.data === "string") {
        setErrors((oldArray) => [...oldArray, error.response.data]);
      } else if (
        error.response.data.errors &&
        typeof error.response.data.errors === "object"
      ) {
        Object.keys(error.response.data.errors).forEach(function (key, index) {
          error.response.data.errors[key].forEach((x) => {
            setErrors((oldArray) => [...oldArray, x]);
          });
        });
      }
    }
  };

  return (
    <AppLayout>
      <CustomBreadcrumb
        title="Kayıt Ol"
        description="Bir eğitmen hesabı oluştur ve öğretmeye başla..."
      />
      <Container className="auth-container pt-3">
        {message !== "" && (
          <div className="mt-2 mb-2 alert alert-info">{message}</div>
        )}

        {errors.length > 0 && (
          <div className="mt-2 mb-2 alert alert-danger">
            {errors.map((error) => (
              <p>{error}</p>
            ))}
          </div>
        )}

        <Formik
          initialValues={{
            email: "",
            displayName: "",
            username: "",
            password: "",
            role: "Eğitmen",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await registerUser(values);
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
                <Form.Label>Email Adresi</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.productName}
                  placeholder="email"
                />
              </Form.Group>
              {errors.email && touched.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              )}

              <Form.Group className="mt-3">
                <Form.Label>Adınız</Form.Label>
                <Form.Control
                  type="text"
                  name="displayName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.displayName}
                  placeholder="isim"
                />
              </Form.Group>
              {errors.displayName && touched.displayName && (
                <Form.Text className="text-danger">
                  {errors.displayName}
                </Form.Text>
              )}

              <Form.Group className="mt-3">
                <Form.Label>Kullanıcı Adınız</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  placeholder="kullanıcı adı"
                />
              </Form.Group>
              {errors.username && touched.username && (
                <Form.Text className="text-danger">{errors.username}</Form.Text>
              )}

              <Form.Group className="mt-3">
                <Form.Label>Şifre</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="şifre"
                />
              </Form.Group>
              {errors.password && touched.password && (
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              )}

              <Form.Group className="mt-3 align-auth">
                <div>
                  <div>
                    <small>
                      Zaten üye misin?{" "}
                      <Link to="/login">
                        <b>Giriş Yap</b>
                      </Link>
                    </small>
                  </div>
                  <div>
                    <small>
                      Öğrenci misin?{" "}
                      <Link to="/student/register">
                        <b>Öğrenci Olarak Katıl</b>
                      </Link>
                    </small>
                  </div>
                </div>
                <Button
                  className="green-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Kayıt Ol
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Container>
    </AppLayout>
  );
};

export default TeacherRegister;
