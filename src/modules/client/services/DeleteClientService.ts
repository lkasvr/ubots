import { Client } from '@prisma/client';
import IClientsRepository from '../domain/repositories/IClientsRepository';
import ClientsRepository from '../infra/repositories/prisma/ClientsRepository';

export default class DeleteClientService {
  private clientsRepository: IClientsRepository;

  constructor() {
    this.clientsRepository = new ClientsRepository();
  }

  public async execute(clientId: number): Promise<Client> {

    const deletedClient = await this.clientsRepository.delete(clientId);

    return deletedClient;
  }
}
