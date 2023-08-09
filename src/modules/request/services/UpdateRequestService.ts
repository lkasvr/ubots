import { Request } from '@prisma/client';
import IRequestsRepository from '../domain/repositories/IRequestsRepository';
import RequestsRepository from '../infra/repositories/prisma/RequestsRepository';
import AppError from '@shared/errors/AppError';
import { IUpdateRequest } from '../domain/models/IUpdateRequest';
import ShowRequestService from './ShowRequestService';

export default class UpdateRequestService {
  private requestsRepository: IRequestsRepository;

  constructor() {
    this.requestsRepository = new RequestsRepository();
  }

  public async execute({ requestId, assistandId, status }: IUpdateRequest): Promise<Request | AppError | null> {
    try {
      const showRequestService = new ShowRequestService();

      const request = await showRequestService.execute(requestId);

      if (!request) throw new AppError('Solicitação não encontrada.');

      if (request instanceof AppError) throw new AppError(request.message);



      if (assistandId) {
        if (request.assistantId && assistandId !== request.assistantId) {
          await this.requestsRepository.update({ requestId, disconnect: true });
          const updatedRequest = await this.requestsRepository.update({ requestId, assistandId, status: 'ADERIDO', disconnect: false });

          return updatedRequest;
        }
        if (!request.assistantId) {
          const updatedRequest = await this.requestsRepository.update({ requestId, assistandId, status: 'ADERIDO', disconnect: false });

          return updatedRequest;
        };
      } else if (status !== request.status) {
        const updatedRequest = await this.requestsRepository.update({ requestId, status, disconnect: false });

        return updatedRequest;
      }

      return null;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return null;
    }
  }
}
