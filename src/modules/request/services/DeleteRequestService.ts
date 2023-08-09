import { Request } from '@prisma/client';
import IRequestsRepository from '../domain/repositories/IRequestsRepository';
import RequestsRepository from '../infra/repositories/prisma/RequestsRepository';
import ShowRequestService from './ShowRequestService';
import AppError from '@shared/errors/AppError';

export default class DeleteRequestService {
  private requestsRepository: IRequestsRepository;

  constructor() {
    this.requestsRepository = new RequestsRepository();
  }

  public async execute(requestId: number): Promise<Request | AppError> {
    try {
      const request = await this.requestsRepository.findById(requestId);

      if (!request) throw new AppError('Solicitação não encontrada.');

      const deletedRequest = await this.requestsRepository.delete(requestId);

      return deletedRequest;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError(`${error}`);
    }
  }
}
