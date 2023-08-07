import axios from "axios";

const localserver = "http://localhost:8000";

const token = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getUsers = async () => {
  const res = await axios.get(`${localserver}/users`, config);
  return res?.data;
};
