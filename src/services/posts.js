import { checkResponse, getAuthHeader } from "@/utils/services";

const { VITE_API_URL: baseUrl } = import.meta.env;

export const getPosts = async () => {
  const response = await fetch(`${baseUrl}/posts`, {
    headers: {
      Authorization: getAuthHeader(),
    },
  });
  return checkResponse(response);
};

export const getPost = async (id) => {
  const response = await fetch(`${baseUrl}/posts/${id}`, {
    headers: {
      Authorization: getAuthHeader(),
    },
  });
  return checkResponse(response);
};

export const createPost = async (postData) => {
  const response = await fetch(`${baseUrl}/posts`, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  return checkResponse(response);
};

export const updatePost = async (Id, postData) => {
  const response = await fetch(`${baseUrl}/posts/${Id}`, {
    method: "PUT",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  return checkResponse(response);
};

export const deletePost = async (id) => {
  const response = await fetch(`${baseUrl}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: getAuthHeader(),
    },
  });
  return checkResponse(response);
};
