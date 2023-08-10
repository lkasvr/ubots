import { Client } from '@prisma/client';
import { ICreateClient } from '../domain/models/ICreateClient';
import IClientsRepository from '../domain/repositories/IClientsRepository';
import ClientsRepository from '../infra/repositories/prisma/ClientsRepository';
import AppError from '@shared/errors/AppError';

export default class CreateClientService {
  private clientsRepository: IClientsRepository;

  constructor() {
    this.clientsRepository = new ClientsRepository();
  }

  public async execute({ name, email }: ICreateClient): Promise<Client | AppError> {
    try {
      const thereIsClient = await this.clientsRepository.findByEmail(email);

      if (thereIsClient) throw new AppError('Não foi possível criar um Cliente. Email informado já em uso.');

      const client = await this.clientsRepository.create({ name, email });

      if (!client) throw new AppError('Não foi possível criar um Cliente.');

      return client;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
