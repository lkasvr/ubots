import { Request } from '@prisma/client';
import IRequestsRepository from '../domain/repositories/IRequestsRepository';
import RequestsRepository from '../infra/repositories/prisma/RequestsRepository';
import AppError from '@shared/errors/AppError';
import { IUpdateRequest } from '../domain/models/IUpdateRequest';

export default class UpdateRequestService {
  private requestsRepository: IRequestsRepository;

  constructor() {
    this.requestsRepository = new RequestsRepository();
  }

  public async execute({ requestId, data }: IUpdateRequest): Promise<Request | AppError | null> {
    try {


      const request = await this.requestsRepository.update({ requestId, data });

      return request;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return null;
    }
  }
}
