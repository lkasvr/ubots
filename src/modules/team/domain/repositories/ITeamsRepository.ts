import { Team } from "@prisma/client";
import { ICreateTeam } from "../models/ICreateTeam";
import { IUpdateTeam } from "../models/IUpdateTeam";

export default interface ITeamsRepository {
  create: (data: ICreateTeam) => Promise<Team>;
  findById: (teamId: number) => Promise<Team | null>;
  find: () => Promise<Team[] | null>;
  update: (data: IUpdateTeam) => Promise<Team>;
  delete: (teamId: number) => Promise<Team>;
}
