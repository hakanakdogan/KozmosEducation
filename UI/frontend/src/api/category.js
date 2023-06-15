import CustomAxios from "./customAxios";

export const getAllCategories = async () => {
  let token = localStorage.getItem("token");
  return await CustomAxios.get("/CourseCategory", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCategory = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.get(`/CourseCategory/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
