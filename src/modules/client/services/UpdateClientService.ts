import { Client } from '@prisma/client';
import IClientsRepository from '../domain/repositories/IClientsRepository';
import ClientsRepository from '../infra/repositories/prisma/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { IUpdateClient } from '../domain/models/IUpdateClient';

export default class UpdateClientService {
  private clientsRepository: IClientsRepository;

  constructor() {
    this.clientsRepository = new ClientsRepository();
  }

  public async execute({ clientId, data }: IUpdateClient): Promise<Client | AppError> {
    try {
      if (!data.name && !data.email) throw new AppError('Nenhum dado enviado para proceder alteração.');

      const client = await this.clientsRepository.findById(clientId);

      if (!client) throw new AppError('Cliente não encontrado.');

      const updatedClient = await this.clientsRepository.update({ clientId, data });

      return updatedClient;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
