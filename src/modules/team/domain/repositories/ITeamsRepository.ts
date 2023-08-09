import { Team } from "@prisma/client";
import { ICreateTeam } from "../models/ICreateTeam";
import { IUpdateTeam } from "../models/IUpdateTeam";

export interface ITeamFind extends Team {
  subject: { id: number; name: string; } | null;
  assistants: { id: number; name: string; }[] | null;
  requests: { id: number; status: string; client: { id: number; name: string; } }[] | null;
}

export interface ITeamCreate extends Team {
  subject: {
    id: number;
    name: string;
  } | null;
}

export interface ITeamFindById extends Team {
  subject: { id: number; name: string; } | null;
  assistants: {
    id: number;
  }[];
}

export interface ITeamFindByName extends Team {
  subject: { id: number; name: string; } | null;
  assistants: {
    id: number;
    name: string;
    requests: { id: number; status: string; }[]
  }[];
}

export interface ITeamFindBySubject extends Team {
  assistants: {
    id: number;
    name: string;
    requests: { id: number; status: string; }[]
  }[];
}

export default interface ITeamsRepository {
  create: (data: ICreateTeam) => Promise<ITeamCreate>;
  findById: (teamId: number) => Promise<ITeamFindById | null>;
  find: () => Promise<ITeamFind[] | null>;
  findByName: (name: string) => Promise<ITeamFindByName | null>;
  findBySubject: (subject: string) => Promise<ITeamFindBySubject[] | null>;
  update: (data: IUpdateTeam) => Promise<Team>;
  delete: (teamId: number) => Promise<Team>;
}
