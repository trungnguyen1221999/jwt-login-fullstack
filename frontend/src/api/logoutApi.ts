import api from "./api";

const logoutApi = async (): Promise<void> => {
  const response = await api.post("/users/logout");
  return response.data;
};
export default logoutApi;
