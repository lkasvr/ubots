import { Team } from '@prisma/client';
import ITeamsRepository from '../domain/repositories/ITeamsRepository';
import TeamsRepository from '../infra/repositories/prisma/TeamsRepository';

export default class ListTeamService {
  private teamsRepository: ITeamsRepository;

  constructor() {
    this.teamsRepository = new TeamsRepository();
  }

  public async execute(): Promise<Team[] | null> {

    const teams = await this.teamsRepository.find();

    return teams;
  }
}
