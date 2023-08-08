import { Client } from '@prisma/client';
import IClientsRepository from '../domain/repositories/IClientsRepository';

export default class DeleteClientService {
  constructor(
    private clientsRepository: IClientsRepository,
  ) { }

  public async execute(clientId: number): Promise<Client> {

    const deletedClient = await this.clientsRepository.delete(clientId);

    return deletedClient;
  }
}
