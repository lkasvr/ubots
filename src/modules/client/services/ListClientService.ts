import { Client } from '@prisma/client';
import IClientsRepository from '../domain/repositories/IClientsRepository';
import ClientsRepository from '../infra/repositories/prisma/ClientsRepository';
import AppError from '@shared/errors/AppError';

export default class ListClientService {
  private clientsRepository: IClientsRepository;

  constructor() {
    this.clientsRepository = new ClientsRepository();
  }

  public async execute(): Promise<Client[] | AppError> {
    try {
      const clients = await this.clientsRepository.find();

      if (!clients) throw new AppError('Nenhum cliente encontrad.');

      return clients;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
