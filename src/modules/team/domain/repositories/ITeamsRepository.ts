import { Team } from "@prisma/client";
import { ICreateTeam } from "../models/ICreateTeam";
import { IUpdateTeam } from "../models/IUpdateTeam";

export interface ITeamFindByName extends Team {
  assistants: {
    id: number;
    name: string;
    requests: { id: number; }[]
  }[];
}

export interface ITeamFindById extends Team {
  assistants: {
    id: number;
  }[];
}

export default interface ITeamsRepository {
  create: (data: ICreateTeam) => Promise<Team>;
  findById: (teamId: number) => Promise<ITeamFindById | null>;
  find: () => Promise<Team[] | null>;
  findByName: (name: string) => Promise<ITeamFindByName | null>;
  update: (data: IUpdateTeam) => Promise<Team>;
  delete: (teamId: number) => Promise<Team>;
}
