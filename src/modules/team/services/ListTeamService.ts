import { Team } from '@prisma/client';
import ITeamsRepository from '../domain/repositories/ITeamsRepository';

export default class ListTeamService {
  constructor(
    private teamsRepository: ITeamsRepository,
  ) { }

  public async execute(): Promise<Team[] | null> {

    const teams = await this.teamsRepository.find();

    return teams;
  }
}
