import api from "./indexRequest";

export const getTeams = async () => {
  const res = await api.get("user/teams");

  return res.data;
};
