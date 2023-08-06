import axios from "axios";

const localserver = "http://localhost:8000";

export const getUsers = async () => {
  const token = localStorage.getItem("token");
  console.log("token: ", token);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${localserver}/users`, config);
  return res?.data;
};
