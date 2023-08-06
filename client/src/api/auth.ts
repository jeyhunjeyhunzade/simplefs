import axios from "axios";

const localserver = "http://localhost:8000";

interface LoginData {
  email: string;
  password: string;
}

export const loginAccount = async (loginData: LoginData) => {
  const res = await axios.post(`${localserver}/login`, loginData);
  return res?.data;
};
