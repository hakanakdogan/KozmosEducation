import CustomAxios from "./customAxios";

export const getLectures = async (id) => {
    let token = localStorage.getItem("token");
    return await CustomAxios.get(`/Lecture/GetLectures/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const createLecture = async (data) => {
    let token = localStorage.getItem("token");
    return await CustomAxios.post("/Lecture", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const updateLecture = async (data) => {
    let token = localStorage.getItem("token");
    return await CustomAxios.put("/Lecture", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const deleteLecture = async (id) => {
    let token = localStorage.getItem("token");
    return await CustomAxios.delete(`/Lecture/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };