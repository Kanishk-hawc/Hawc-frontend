import axios from "axios";

const API_URL = "http://lms.hawc.in/api/login";

export interface UserData {
  token: string;
  name: string;
  role_id: number;
  role_name: string;
}

export const login = async (email: string, password: string) => {
  const response = await axios.post(API_URL, { email, password });
  if (response.data.success) {
    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getUser = (): UserData | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
