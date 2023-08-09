import AppError from '@shared/errors/AppError';
import ITeamsRepository, { ITeamFindBySubject } from '../domain/repositories/ITeamsRepository';
import TeamsRepository from '../infra/repositories/prisma/TeamsRepository';


export default class ShowTeamBySubjectService {
  private teamsRepository: ITeamsRepository;

  constructor() {
    this.teamsRepository = new TeamsRepository();
  }

  public async execute(subject: string): Promise<ITeamFindBySubject[] | AppError> {
    try {
      const team = await this.teamsRepository.findBySubject(subject);

      if (!team) throw new AppError('Time não encontrado.');

      return team;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}