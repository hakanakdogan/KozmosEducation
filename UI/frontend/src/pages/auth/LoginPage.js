import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { batch, useDispatch } from "react-redux";
import {
  setDisplayName,
  setEmail,
  setId,
  setRole,
  setUsername,
} from "../../store/slices/userInfo";
import AppLayout from "../../components/layout/AppLayout";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("*Email zorunludur"),
    password: Yup.string().required("*Şifre zorunludur"),
  });

  const loginUser = async (values) => {
    setError("");
    try {
      const response = await axios.post(
        "https://localhost:7044/api/account/login",
        values
      );

      localStorage.setItem("token", response.data.token);
      batch(() => {
        dispatch(setDisplayName(response.data.displayName));
        dispatch(setEmail(response.data.email));
        dispatch(setUsername(response.data.username));
        dispatch(setId(response.data.id));
        dispatch(setRole(response.data.role[0]));
      });
      
      navigate("/");
    } catch (error) {
      setError("Giriş yapılamadı");
    }
  };

  return (
    <AppLayout>
      <CustomBreadcrumb title="Giriş Yap" />
      <Container className="auth-container pt-5">
        {error && <div className="mt-2 mb-2 alert alert-danger">{error}</div>}

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await loginUser(values);
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
                  value={values.email}
                  placeholder="email"
                />
              </Form.Group>
              {errors.email && touched.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
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
                <small>Henüz kayıt olmadın mı? <Link to="/student/register"><b>Aramıza Katıl</b></Link></small>
                <Button
                  className="green-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Giriş Yap
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Container>
    </AppLayout>
  );
};

export default LoginPage;
