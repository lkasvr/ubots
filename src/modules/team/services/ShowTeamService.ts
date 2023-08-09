import AppError from '@shared/errors/AppError';
import ITeamsRepository, { ITeamFindByName } from '../domain/repositories/ITeamsRepository';
import TeamsRepository from '../infra/repositories/prisma/TeamsRepository';


export default class ShowTeamService {
  private teamsRepository: ITeamsRepository;

  constructor() {
    this.teamsRepository = new TeamsRepository();
  }

  public async execute(teamName: string): Promise<ITeamFindByName | AppError | null> {
    try {
      const team = await this.teamsRepository.findByName(teamName);

      if (!team) throw new AppError('Time não encontrado.');

      return team;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return null;
    }
  }
}
