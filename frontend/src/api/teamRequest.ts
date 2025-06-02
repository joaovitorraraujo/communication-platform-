import api from "./indexRequest";

export const createTeamAPI = async (name: string, description: string) => {
  const res = await api.post("user/createTeam", {
    name,
    description,
  });

  return res.data;
};

export const getTeamApi = async (teamId: string) => {
  const res = await api.get(`user/team/${teamId}`);

  return res.data;
};
