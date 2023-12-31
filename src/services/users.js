import { checkResponse, getAuthHeader } from "@/utils/services";

const { VITE_API_URL: baseUrl } = import.meta.env;

export const getUsers = async () => {
  const response = await fetch(`${baseUrl}/users`, {
    headers: {
      Authorization: getAuthHeader(),
    },
  });
  return checkResponse(response);
};

export const getUser = async (id) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    headers: {
      Authorization: getAuthHeader(),
    },
  });
  return checkResponse(response);
};

export const createUser = async (user) => {
  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return checkResponse(response);
};

export const updateUser = async (id, user) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "PUT",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return checkResponse(response);
};

export const deleteUser = async (id) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: getAuthHeader(),
    },
  });
  return checkResponse(response);
};
