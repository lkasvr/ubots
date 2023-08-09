import { Assistant } from '@prisma/client';
import IAssistantsRepository from '../domain/repositories/IAssistantsRepository';
import AssistantsRepository from '../infra/repositories/prisma/AssistantsRepository';
import AppError from '@shared/errors/AppError';
import UpdateRequestService from '@modules/request/services/UpdateRequestService';

export default class DeleteAssistantService {
  private assistantsRepository: IAssistantsRepository;
  constructor() {
    this.assistantsRepository = new AssistantsRepository();
  }

  public async execute(assistantId: number): Promise<Assistant | AppError> {
    try {
      const assistant = await this.assistantsRepository.findById(assistantId);

      if (!assistant) throw new AppError('Assistente não encontrado.');

      if (assistant.requests) {
        const updateRequestService = new UpdateRequestService();

        assistant.requests.forEach(async (request) => {
          if (request.status !== 'PENDENTE' && request.status !== 'CONCLUIDO')
            await updateRequestService.execute({ requestId: request.id, status: 'PENDENTE' });
        });
      }

      const deletedAssistant = await this.assistantsRepository.delete(assistantId);

      return deletedAssistant;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
