import { Assistant } from '@prisma/client';
import IAssistantsRepository from '../domain/repositories/IAssistantsRepository';
import AssistantsRepository from '../infra/repositories/prisma/AssistantsRepository';
import AppError from '@shared/errors/AppError';

export default class ListAssistantService {
  private assistantsRepository: IAssistantsRepository;
  constructor() {
    this.assistantsRepository = new AssistantsRepository();
  }

  public async execute(): Promise<Assistant[] | AppError> {
    try {
      const assistants = await this.assistantsRepository.find();

      if (!assistants) throw new AppError('Nenhum assistente encontrado');

      return assistants;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError(`${error}`);
    }
  }
}
