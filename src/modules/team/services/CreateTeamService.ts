import { Team } from '@prisma/client';
import { ICreateTeam } from '../domain/models/ICreateTeam';
import ITeamsRepository from '../domain/repositories/ITeamsRepository';
//import { ICustomerPaginate } from '../domain/models/';

// type SearchParams = {
//   page: number;
//   limit: number;
// };

export default class CreateTeamService {
  constructor(
    private teamsRepository: ITeamsRepository,
  ) { }

  public async execute({ name }: ICreateTeam): Promise<Team> {

    const teams = await this.teamsRepository.create({ name });

    return teams;
  }
}
