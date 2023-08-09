import { Team } from '@prisma/client';
import ITeamsRepository from '../domain/repositories/ITeamsRepository';
import ShowTeamByIdService from './ShowTeamByIdService';
import AppError from '@shared/errors/AppError';

export default class DeleteTeamService {
  constructor(
    private teamsRepository: ITeamsRepository,
  ) { }

  public async execute(teamId: number): Promise<Team> {
    const showTeamByIdService = new ShowTeamByIdService();

    const team = await showTeamByIdService.execute(teamId);

    if (!team) throw new AppError('Time inexistente.');

    if (team.assistants.length > 0) {
      team.assistants.forEach((assistant) => {

      });
    }

    const deletedTeam = await this.teamsRepository.delete(teamId);

    return deletedTeam;
  }
}
