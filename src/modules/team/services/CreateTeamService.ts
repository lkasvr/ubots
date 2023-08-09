import { Team } from '@prisma/client';
import { ICreateTeam } from '../domain/models/ICreateTeam';
import ITeamsRepository from '../domain/repositories/ITeamsRepository';
import TeamsRepository from '../infra/repositories/prisma/TeamsRepository';
import ShowTeamService from './ShowTeamService';
import AppError from '@shared/errors/AppError';

export default class CreateTeamService {
  private teamsRepository: ITeamsRepository;

  constructor() {
    this.teamsRepository = new TeamsRepository();
  }

  public async execute({ name }: ICreateTeam): Promise<Team | AppError | null> {
    try {
      const showTeamService = new ShowTeamService();

      const team = await showTeamService.execute(name);

      if (team) throw new AppError('Não é possível criar um time com este nome. Nome já esta sendo utilizado.');

      const teamCreated = await this.teamsRepository.create({ name });

      return teamCreated;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return null;
    }
  }
}
