import { Team } from '@prisma/client';
import ITeamsRepository from '../domain/repositories/ITeamsRepository';
import AppError from '@shared/errors/AppError';
import TeamsRepository from '../infra/repositories/prisma/TeamsRepository';

export default class DeleteTeamService {
  private teamsRepository: ITeamsRepository;

  constructor() {
    this.teamsRepository = new TeamsRepository();
  }

  public async execute(teamId: number): Promise<Team | AppError> {
    try {
      const team = await this.teamsRepository.findById(teamId);

      if (!team) throw new AppError('Time inexistente.');

      const deletedTeam = await this.teamsRepository.delete(teamId);

      return deletedTeam;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
