import { Client } from '@prisma/client';
import { ICreateClient } from '../domain/models/ICreateClient';
import IClientsRepository from '../domain/repositories/IClientsRepository';

export default class CreateClientService {
  constructor(
    private clientsRepository: IClientsRepository,
  ) { }

  public async execute({ name, email }: ICreateClient): Promise<Client> {

    const client = await this.clientsRepository.create({ name, email });

    return client;
  }
}
