import { Team } from '@prisma/client';
import { ICreateTeam } from '../domain/models/ICreateTeam';
import ITeamsRepository from '../domain/repositories/ITeamsRepository';
import TeamsRepository from '../infra/repositories/prisma/TeamsRepository';
import AppError from '@shared/errors/AppError';

export default class CreateTeamService {
  private teamsRepository: ITeamsRepository;

  constructor() {
    this.teamsRepository = new TeamsRepository();
  }

  public async execute({ name, subject }: ICreateTeam): Promise<Team | AppError> {
    try {
      const teamBySubject = await this.teamsRepository.findBySubject(subject);

      if (teamBySubject && teamBySubject.length !== 0)
        throw new AppError(`Não é possível criar um time para tratar do assunto '${subject}'. Pois já existe um time para isso.`);

      const teamByName = await this.teamsRepository.findByName(name);

      if (teamByName) throw new AppError(`Não é possível criar um time com esse nome. Pois já existe um time chamado ${name}.`);

      const teamCreated = await this.teamsRepository.create({ name, subject });

      return teamCreated;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
