import api from "./indexRequest";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/signIn", { email, password });
  return res.data;
};
export const register = async (
  name: string,
  email: string,
  password: string,
  cpf: string,
  birth: string
) => {
  const res = await api.post("/auth/signUp", {
    name,
    email,
    password,
    cpf,
    birth,
  });
  return res.data;
};
