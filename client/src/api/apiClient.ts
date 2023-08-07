export const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const serverUrl = "http://localhost:8000";
