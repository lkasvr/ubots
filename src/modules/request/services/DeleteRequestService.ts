import { Request } from '@prisma/client';
import IRequestsRepository from '../domain/repositories/IRequestsRepository';

export default class DeleteRequestService {
  constructor(
    private requestsRepository: IRequestsRepository,
  ) { }

  public async execute(requestId: string): Promise<Request> {

    const deletedRequest = await this.requestsRepository.delete(Number(requestId));

    return deletedRequest;
  }
}
