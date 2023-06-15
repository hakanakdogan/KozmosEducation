import CustomAxios from "./customAxios";
import {ATTEND_PRIVATE_KEY} from "../constants/privateKey";

export const getAllCourses = async () => {
  let token = localStorage.getItem("token");
  return await CustomAxios.get("/Course", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserCourses = async () => {
  let token = localStorage.getItem("token");
  return await CustomAxios.get("/Course/usercourses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTeacherCourses = async () => {
  let token = localStorage.getItem("token");
  return await CustomAxios.get("/Course/instructorcourses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTeacherCoursesById = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.get(`/Course/instructorcourses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCourse = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.get(`/Course/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const attendCourse = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.post(`/Course/attend`, {
    attendPrivateKey: ATTEND_PRIVATE_KEY,
    courseId: id
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCourse = async (data) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.post("/Course", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCourse = async (data) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.put("/Course", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createThumbnail = async (id, file) => {
  let token = localStorage.getItem("token");
  let formData = new FormData();
  formData.append('File', file);
  return await CustomAxios.post(`/Course/addThumbnail/${id}`, formData, {
    headers: {
      "Content-Type": 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteThumbnail = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.delete(`/Course/deleteThumbnail/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCourse = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.delete(`/Course/deleteThumbnail/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};