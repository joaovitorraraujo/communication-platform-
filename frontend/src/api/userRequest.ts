import api from "./indexRequest";

export const getMyUser = async () => {
  const res = await api.get("user/me");

  return res.data;
};
