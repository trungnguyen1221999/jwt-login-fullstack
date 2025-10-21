import api from "./api";

const loginApi = async (username: string, password: string) => {
  const response = await api.post("/users/login", { username, password });
  return response.data;
};

export default loginApi;
