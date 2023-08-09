import { Client } from '@prisma/client';
import IClientsRepository from '../domain/repositories/IClientsRepository';
import ClientsRepository from '../infra/repositories/prisma/ClientsRepository';

export default class ListClientService {
  private clientsRepository: IClientsRepository;

  constructor() {
    this.clientsRepository = new ClientsRepository();
  }

  public async execute(): Promise<Client[] | null> {

    const clients = await this.clientsRepository.find();

    return clients;
  }
}
