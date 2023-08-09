import { Assistant } from '@prisma/client';
import IAssistantsRepository from '../domain/repositories/IAssistantsRepository';
import AssistantsRepository from '../infra/repositories/prisma/AssistantsRepository';
import AppError from '@shared/errors/AppError';
import { IUpdateAssistant } from '../domain/models/IUpdateAssistant';

export default class UpdateAssistantService {
  private assistantsRepository: IAssistantsRepository;
  constructor() {
    this.assistantsRepository = new AssistantsRepository();
  }

  public async execute({ assistantId, data }: IUpdateAssistant): Promise<Assistant | AppError> {
    try {
      const assistant = await this.assistantsRepository.findById(assistantId);

      if (!assistant) throw new AppError('Assistente não encontrado');

      const updatedAssistant = await this.assistantsRepository.update({ assistantId, data });

      return updatedAssistant;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
