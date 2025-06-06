// import { cookies } from "next/headers";
import Cookies from "js-cookie";
import api from "./indexRequest";

export const loginAPI = async (email: string, password: string) => {
  const res = await api.post("/auth/signIn", { email, password });

  const token = res.data.token;

  Cookies.set("token", token);

  return res.data;
};

export const registerAPI = async (
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

  const token = res.data.token;
  Cookies.set("token", token);

  return res.data;
};

export const signOutAPI = async () => {
  Cookies.remove("token");
};
