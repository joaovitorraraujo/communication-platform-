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

export const getTeams = async () => {
  const res = await api.get("user/teams");

  return res.data;
};

export const joinTeamApi = async (code: string) => {
  const res = await api.post("user/joinTeam", {
    code,
  });

  return res.data.team;
};
