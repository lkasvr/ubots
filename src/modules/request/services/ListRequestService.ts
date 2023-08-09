import { Request } from '@prisma/client';
import IRequestsRepository from '../domain/repositories/IRequestsRepository';
import RequestsRepository from '../infra/repositories/prisma/RequestsRepository';
import AppError from '@shared/errors/AppError';

export default class ListRequestService {
  private requestsRepository: IRequestsRepository;

  constructor() {
    this.requestsRepository = new RequestsRepository();
  }

  public async execute(): Promise<Request[] | AppError> {
    try {
      const request = await this.requestsRepository.find();

      if (!request) throw new AppError("Nenhuma solicitação encontrada.");

      return request;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
