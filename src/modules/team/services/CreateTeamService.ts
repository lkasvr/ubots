import { Team } from '@prisma/client';
import { ICreateTeam } from '../domain/models/ICreateTeam';
import ITeamsRepository from '../domain/repositories/ITeamsRepository';
import TeamsRepository from '../infra/repositories/prisma/TeamsRepository';

export default class CreateTeamService {
  private teamsRepository: ITeamsRepository;

  constructor() {
    this.teamsRepository = new TeamsRepository();
  }

  public async execute({ name }: ICreateTeam): Promise<Team> {

    const teams = await this.teamsRepository.create({ name });

    return teams;
  }
}
