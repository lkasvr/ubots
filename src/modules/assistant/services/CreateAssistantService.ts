import { Assistant } from '@prisma/client';
import { ICreateAssistant } from '../domain/models/ICreateAssistant';
import IAssistantsRepository from '../domain/repositories/IAssistantsRepository';
import AssistantsRepository from '../infra/repositories/prisma/AssistantsRepository';
import ShowTeamByIdService from '@modules/team/services/ShowTeamByIdService';
import AppError from '@shared/errors/AppError';

export default class CreateAssistantService {
  private assistantsRepository: IAssistantsRepository;
  constructor() {
    this.assistantsRepository = new AssistantsRepository();
  }

  public async execute({ name, teamId }: ICreateAssistant): Promise<Assistant | AppError | null> {
    try {
      const showTeamByIdService = new ShowTeamByIdService();
      const team = await showTeamByIdService.execute(teamId);

      if (!team) throw new AppError('Não é possível criar um Assistente sem um time válido ou existente.');

      const assistant = await this.assistantsRepository.create({ name, teamId });

      return assistant;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return null;
    }
  }
}
