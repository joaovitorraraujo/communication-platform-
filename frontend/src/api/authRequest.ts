import api from "./indexRequest";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/signIn", { email, password });
  return res.data;
};
