import { Request } from '@prisma/client';
import IRequestsRepository from '../domain/repositories/IRequestsRepository';

export default class ListRequestService {
  constructor(
    private requestsRepository: IRequestsRepository,
  ) { }

  public async execute(): Promise<Request[] | null> {

    const request = await this.requestsRepository.find();

    return request;
  }
}
