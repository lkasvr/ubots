import IAssistantsRepository, { IAssistantFindById } from '../domain/repositories/IAssistantsRepository';
import AssistantsRepository from '../infra/repositories/prisma/AssistantsRepository';
import AppError from '@shared/errors/AppError';

export default class ShowAssistantService {
  private assistantsRepository: IAssistantsRepository;
  constructor() {
    this.assistantsRepository = new AssistantsRepository();
  }

  public async execute(assistandId: number): Promise<IAssistantFindById | AppError> {
    try {
      const assistant = await this.assistantsRepository.findById(assistandId);

      if (!assistant) throw new AppError('Assistente não encontrado');

      return assistant;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError(`${error}`);
    }
  }
}
