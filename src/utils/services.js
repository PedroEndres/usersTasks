export const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getAuthHeader = () => {
  const authorizationHeader = `Bearer ${localStorage.getItem("token")}`;
  return authorizationHeader;
};
