import AppError from '@shared/errors/AppError';
import ITeamsRepository, { ITeamFindById } from '../domain/repositories/ITeamsRepository';
import TeamsRepository from '../infra/repositories/prisma/TeamsRepository';


export default class ShowTeamByIdService {
  private teamsRepository: ITeamsRepository;

  constructor() {
    this.teamsRepository = new TeamsRepository();
  }

  public async execute(teamId: string): Promise<ITeamFindById | AppError> {
    try {
      const team = await this.teamsRepository.findById(teamId);

      if (!team) throw new AppError('Time não encontrado.');

      return team;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
