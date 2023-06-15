import CustomAxios from "./customAxios";


export const createPost = async (data) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.post("/UserPost", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserPosts = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.get(`/UserPost/userposts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUsersPost = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.get(`/UserPost/usersposts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPost = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.get(`/UserPost/userpost/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePost = async (data) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.put("/UserPost", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePost = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.delete(`/UserPost/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const upsertReaction = async (data) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.post("/UserPost/createreaction", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const createImage = async (id, file) => {
  let token = localStorage.getItem("token");
  let formData = new FormData();
  formData.append('File', file);
  return await CustomAxios.post(`/UserPost/addImage/${id}`, formData, {
    headers: {
      "Content-Type": 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};


export const createComment = async (data) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.post("/UserPostComment", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteComment = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.delete(`/UserPostComment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPostComments = async (id) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.get(`/UserPostComment/getComments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateComment = async (data) => {
  let token = localStorage.getItem("token");
  return await CustomAxios.put("/UserPostComment", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};