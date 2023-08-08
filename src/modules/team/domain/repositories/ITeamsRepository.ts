import { Team } from "@prisma/client";
import { ICreateTeam } from "../models/ICreateTeam";

export default interface ITeamsRepository {
  create: (data: ICreateTeam) => Promise<Team>;
}
