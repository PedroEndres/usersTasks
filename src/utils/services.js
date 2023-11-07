import { useAuthStore } from "@/store/auth";

export const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getAuthHeader = () => {
  const { token } = useAuthStore.getState();
  return `Bearer ${token}`;
};
