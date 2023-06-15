import CustomAxios from "./customAxios";

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    const response = await CustomAxios.get("/Account/getcurrentuser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  return null;
};

export const getUserById = async (id) => {
  const token = localStorage.getItem("token");
  return await CustomAxios.get(`/Account/getuserbyid/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
