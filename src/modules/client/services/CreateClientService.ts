import { Client } from '@prisma/client';
import { ICreateClient } from '../domain/models/ICreateClient';
import IClientsRepository from '../domain/repositories/IClientsRepository';
import ClientsRepository from '../infra/repositories/prisma/ClientsRepository';

export default class CreateClientService {
  private clientsRepository: IClientsRepository;

  constructor() {
    this.clientsRepository = new ClientsRepository();
  }

  public async execute({ name, email }: ICreateClient): Promise<Client> {

    const client = await this.clientsRepository.create({ name, email });

    return client;
  }
}
