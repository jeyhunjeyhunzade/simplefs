import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  password: string;
  name: string;
}

const localserver = "http://localhost:8000";
const token = localStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const loginAccount = async (loginData: LoginData) => {
  const res = await axios.post(`${localserver}/login`, loginData);
  return res?.data;
};

export const createAccount = async (signUpData: SignUpData) => {
  const res = await axios.post(`${localserver}/signUp`, signUpData);
  return res?.data;
};

export const blockAccounts = async (userIds: string[]) => {
  const res = await axios.patch(
    `${localserver}/users/block`,
    { userIds },
    config
  );
  return res?.data;
};

export const unBlockAccounts = async (userIds: string[]) => {
  const res = await axios.patch(
    `${localserver}/users/unblock`,
    { userIds },
    config
  );
  return res?.data;
};

export const deleteAccounts = async (userIds: string[]) => {
  const res = await axios.delete(`${localserver}/users`, {
    data: { userIds },
    ...config,
  });
  return res?.data;
};
