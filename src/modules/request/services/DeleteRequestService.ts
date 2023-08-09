import { Request } from '@prisma/client';
import IRequestsRepository from '../domain/repositories/IRequestsRepository';
import RequestsRepository from '../infra/repositories/prisma/RequestsRepository';

export default class DeleteRequestService {
  private requestsRepository: IRequestsRepository;

  constructor() {
    this.requestsRepository = new RequestsRepository();
  }

  public async execute(requestId: string): Promise<Request> {

    const deletedRequest = await this.requestsRepository.delete(Number(requestId));

    return deletedRequest;
  }
}
