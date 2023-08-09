import { Team } from "@prisma/client";
import { ICreateTeam } from "../models/ICreateTeam";
import { IUpdateTeam } from "../models/IUpdateTeam";

export interface ITeamFind extends Team {
  subject: { id: string; name: string; } | null;
  assistants: { id: string; name: string; }[] | null;
  requests: { id: string; status: string; client: { id: string; name: string; } }[] | null;
}

export interface ITeamCreate extends Team {
  subject: {
    id: string;
    name: string;
  } | null;
}

export interface ITeamFindById extends Team {
  subject: { id: string; name: string; } | null;
  assistants: {
    id: string;
  }[];
}

export interface ITeamFindByName extends Team {
  subject: { id: string; name: string; } | null;
  assistants: {
    id: string;
    name: string;
    requests: { id: string; status: string; }[]
  }[];
}

export interface ITeamFindBySubject extends Team {
  assistants: {
    id: string;
    name: string;
    requests: { id: string; status: string; }[]
  }[];
}

export default interface ITeamsRepository {
  create: (data: ICreateTeam) => Promise<ITeamCreate>;
  findById: (teamId: string) => Promise<ITeamFindById | null>;
  find: () => Promise<ITeamFind[] | null>;
  findByName: (name: string) => Promise<ITeamFindByName | null>;
  findBySubject: (subject: string) => Promise<ITeamFindBySubject[] | null>;
  update: (data: IUpdateTeam) => Promise<Team>;
  delete: (teamId: string) => Promise<Team>;
}
