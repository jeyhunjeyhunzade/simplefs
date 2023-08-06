import axios from "axios";

const localserver = "http://localhost:8000";

interface LoginData {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export const loginAccount = async (loginData: LoginData) => {
  const res = await axios.post(`${localserver}/login`, loginData);
  return res?.data;
};

export const createAccount = async (signUpData: SignUpData) => {
  const res = await axios.post(`${localserver}/signUp`, signUpData);
  return res?.data;
};
