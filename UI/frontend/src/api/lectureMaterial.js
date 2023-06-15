import CustomAxios from "./customAxios";

export const createLectureMaterial = async (id, file) => {
    let token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append('File', file);
    return await CustomAxios.post(`/LectureMaterial/${id}`, formData, {
      headers: {
        "Content-Type": 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  };


  export const getLectureMaterial = async (id) => {
    let token = localStorage.getItem("token");
    return await CustomAxios.get(`/LectureMaterial/byLecture/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const deleteLectureMaterial = async (id) => {
    let token = localStorage.getItem("token");
    return await CustomAxios.delete(`/LectureMaterial/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };