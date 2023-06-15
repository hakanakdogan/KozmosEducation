import React, { useState } from 'react'
import { useEffect } from 'react'
import { createProfile, getProfile, updateProfile } from '../../api/profile'
import {useUserId} from "../../hooks/useUserId"
import {useDisplayName} from "../../hooks/useDisplayName"
import { Fragment } from 'react'
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ProfileUpdate = () => {
    const [userProfile, setUserProfile] = useState(null);
    const userId = useUserId();
    const displayName = useDisplayName();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        interests: Yup.string().required("*İlgi alanları zorunludur"),
        education: Yup.string().required("*Eğitim zorunludur"),
      });


    const createUserProfile = async (data) => {
        try {
            await createProfile(data);
            navigate("/user/me");
            toast.success("Profil bilgileri başarıyla oluşturuldu");
        } catch (error) {
            console.log(error);
            toast.error("Profil bilgileri oluşturulurken hata oluştu");
        }
    }

    const updateUserProfile = async (data) => {
        try {
            data.profileId = userProfile.id;
            await updateProfile(data);
            navigate("/user/me");
            toast.success("Profil bilgileri başarıyla güncellendi");
        } catch (error) {
            console.log(error);
            toast.error("Profil bilgileri güncellenirken hata oluştu");
        }
    }

    const loadUserProfile = async () => {
        try {
            const response = await getProfile(userId);
            setUserProfile(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadUserProfile();
    }, []);

  return (
    <Fragment>
        <Formik
          enableReinitialize
          initialValues={{
            nameSurname: displayName,
            interests: userProfile?.interests ? userProfile.interests : "",
            education: userProfile?.education ? userProfile.education : ""
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            userProfile === null ? await createUserProfile(values) : updateUserProfile(values);
            setSubmitting(false);
            // navigation.navigate("/user/me");
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
                <Form.Label>İlgi Alanları</Form.Label>
                <Form.Control
                  type="text"
                  name="interests"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.interests}
                  placeholder="ilgi alanları..."
                />
              </Form.Group>
              {errors.interests && touched.interests && (
                <Form.Text className="text-danger">{errors.interests}</Form.Text>
              )}

              <Form.Group className="mt-3">
                <Form.Label>Eğitim</Form.Label>
                <Form.Control
                  type="text"
                  name="education"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.education}
                  placeholder="eğitim..."
                />
              </Form.Group>
              {errors.education && touched.education && (
                <Form.Text className="text-danger">{errors.education}</Form.Text>
              )}

              <Form.Group className="mt-3 align-right">
                <Button
                  size="sm"
                  variant="success"
                  type="submit"
                  className='green-btn'
                  disabled={isSubmitting}
                >
                  Kaydet
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
    </Fragment>
  )
}

export default ProfileUpdate