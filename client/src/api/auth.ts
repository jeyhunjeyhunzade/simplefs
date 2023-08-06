import axios from "axios";

const localserver = "http://localhost:8000";

export const login = (): Promise<any> => {
  return axios.get(`${localserver}/login`).then((res) => res.data);
};
