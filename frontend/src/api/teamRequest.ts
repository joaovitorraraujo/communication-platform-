import api from "./indexRequest";

export const createTeamAPI = async (name: string, description: string) => {
  const res = await api.post("user/createTeam", {
    name,
    description,
  });

  return res.data;
};
