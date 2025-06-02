export type TeamType = {
  id: number;
  name: string;
  description?: string | null;
  code: string;
  channels: ChannelType[];
  members: MemberType[];
};

export type MemberType = {
  id: number;
  userId: number;
  teamId: number;
  role: UserRole;
  user: UserType;
};

export type UserRole = "MEMBER" | "ADMIN" | "OWNER";

export type UserType = {
  id: number;
  name: string;
  email: string;
  cpf?: string | null;
  birth?: string | null;
  companyName?: string | null;
  cnpj?: string | null;
  companyPhone?: string | null;
  sectors?: string | null;
};

export type ChannelType = {
  id: number;
  name: string;
  teamId: number;
};

export type MessageType = {
  id: number;
  content: string;
  fileUrl?: string | null;
  channelId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: UserType;
};
