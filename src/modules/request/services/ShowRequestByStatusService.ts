import IRequestsRepository, { IRequestFindByStatus } from '../domain/repositories/IRequestsRepository';
import RequestsRepository from '../infra/repositories/prisma/RequestsRepository';
import AppError from '@shared/errors/AppError';

export default class ShowRequestByStatusService {
  private requestsRepository: IRequestsRepository;

  constructor() {
    this.requestsRepository = new RequestsRepository();
  }

  public async execute(requestStatus: string): Promise<IRequestFindByStatus[] | AppError> {
    try {
      const request = await this.requestsRepository.findByStatus(requestStatus);

      if (!request) throw new AppError('Solicitação não encontrada.');

      return request;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
