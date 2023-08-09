import { Team } from '@prisma/client';
import ITeamsRepository from '../domain/repositories/ITeamsRepository';
import ShowTeamByIdService from './ShowTeamByIdService';
import AppError from '@shared/errors/AppError';
import TeamsRepository from '../infra/repositories/prisma/TeamsRepository';

export default class DeleteTeamService {
  private teamsRepository: ITeamsRepository;

  constructor() {
    this.teamsRepository = new TeamsRepository();
  }

  public async execute(teamId: number): Promise<Team> {
    const showTeamByIdService = new ShowTeamByIdService();

    const team = await showTeamByIdService.execute(teamId);

    if (!team) throw new AppError('Time inexistente.');

    const deletedTeam = await this.teamsRepository.delete(teamId);

    return deletedTeam;
  }
}
