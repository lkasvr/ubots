import { Client } from '@prisma/client';
import IClientsRepository from '../domain/repositories/IClientsRepository';

export default class ListClientService {
  constructor(
    private clientsRepository: IClientsRepository,
  ) { }

  public async execute(): Promise<Client[] | null> {

    const clients = await this.clientsRepository.find();

    return clients;
  }
}
