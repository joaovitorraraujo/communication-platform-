export type TeamType = {
  id: number;
  name: string;
  description: string;
  code: string;
  channels: ChannelType[];
};

export type ChannelType = {
  id: number;
  name: string;
  teamId: number;
};
