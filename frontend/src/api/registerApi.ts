import api from "./api";

const registerApi = async (userData: {
  name: string;
  username: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};
export default registerApi;
