import { Request } from '@prisma/client';
import { ICreateRequest } from '../domain/models/ICreateRequest';
import IRequestsRepository from '../domain/repositories/IRequestsRepository';

export default class CreateRequestService {
  constructor(
    private requestsRepository: IRequestsRepository,
  ) { }

  public async execute({ status, subject, clientId, teamId, assistantId }: ICreateRequest): Promise<Request> {

    const request = await this.requestsRepository.create({
      status,
      subject,
      clientId,
      teamId,
      assistantId
    });

    return request;
  }
}
