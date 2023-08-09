import { Client } from '@prisma/client';
import IClientsRepository from '../domain/repositories/IClientsRepository';
import ClientsRepository from '../infra/repositories/prisma/ClientsRepository';
import AppError from '@shared/errors/AppError';

export default class ShowClientService {
  private clientsRepository: IClientsRepository;

  constructor() {
    this.clientsRepository = new ClientsRepository();
  }

  public async execute(clientId: number): Promise<Client | AppError> {
    try {
      const client = await this.clientsRepository.findById(clientId);

      if (!client) throw new AppError('Cliente não encontrado.');

      return client;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
