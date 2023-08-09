import AppError from '@shared/errors/AppError';
import ITeamsRepository, { ITeamFind } from '../domain/repositories/ITeamsRepository';
import TeamsRepository from '../infra/repositories/prisma/TeamsRepository';

export default class ListTeamService {
  private teamsRepository: ITeamsRepository;

  constructor() {
    this.teamsRepository = new TeamsRepository();
  }

  public async execute(): Promise<ITeamFind[] | AppError> {
    try {
      const teams = await this.teamsRepository.find();

      if (!teams) throw new AppError('Nenhum time encontrado.');

      return teams;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError(`${error}`);
    }
  }
}
