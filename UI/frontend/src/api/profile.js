import CustomAxios from "./customAxios";

export const getProfile = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.get(`/UserProfile/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProfile = async (data) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.post("/UserProfile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = async (data) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.put("/UserProfile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
