import CustomAxios from "./customAxios";

export const getCourseModule = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.get(`/CourseModule/CourseModules/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCourseModule = async (data) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.post("/CourseModule", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCourseModule = async (data) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.put("/CourseModule", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCourseModule = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.delete(`/CourseModule/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
