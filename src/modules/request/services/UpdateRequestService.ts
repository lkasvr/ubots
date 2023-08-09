import { Request } from '@prisma/client';
import IRequestsRepository from '../domain/repositories/IRequestsRepository';
import RequestsRepository from '../infra/repositories/prisma/RequestsRepository';
import AppError from '@shared/errors/AppError';
import { IUpdateRequest } from '../domain/models/IUpdateRequest';
import ShowAssistantService from '@modules/assistant/services/ShowAssistantService';

export default class UpdateRequestService {
  private requestsRepository: IRequestsRepository;

  constructor() {
    this.requestsRepository = new RequestsRepository();
  }

  public async execute({ requestId, assistantId, status }: IUpdateRequest): Promise<Request | AppError> {
    try {
      const request = await this.requestsRepository.findById(requestId);

      if (!request) throw new AppError('Solicitação não encontrada.');

      if (assistantId) {
        const showAssistantService = new ShowAssistantService();

        const assistant = await showAssistantService.execute(assistantId);

        if (assistant instanceof AppError) return assistant;

        if (!assistant.team) throw new AppError('Assistente ainda sem um time designado.');

        if (assistant.team && assistant.teamId !== request.teamId)
          throw new AppError('Assistente não pode ser atribuído para esta solicitação porque pertence a um time distinto, ou porque a solicitação ainda não foi encaminhada para nenhum time de atendimento.');

        if (assistant.requests) {
          const assignedRequests = assistant.requests.filter((request) => {
            return request.status === 'ADERIDO';
          });

          if (assignedRequests.length >= 3) throw new AppError('Assistente atingiu o limite de solicitações designadas.');
        }

        if (request.assistantId && assistantId !== request.assistantId) {
          await this.requestsRepository.update({ requestId, disconnect: true });
          const updatedRequest = await this.requestsRepository.update({ requestId, assistantId, status: 'ADERIDO', disconnect: false });

          return updatedRequest;
        }
        if (!request.assistantId) {
          const updatedRequest = await this.requestsRepository.update({ requestId, assistantId, status: 'ADERIDO', disconnect: false });

          return updatedRequest;
        };
      } else if (status && status !== request.status) {
        const updatedRequest = await this.requestsRepository.update({ requestId, status, disconnect: false });

        return updatedRequest;
      }

      return new AppError('Não foi possível atualizar a solicitação.');
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
