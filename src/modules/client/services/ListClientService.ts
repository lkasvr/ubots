import { Client } from '@prisma/client';
import IClientsRepository from '../domain/repositories/IClientsRepository';
//import { ICustomerPaginate } from '../domain/models/';

// type SearchParams = {
//   page: number;
//   limit: number;
// };

export default class ListClientService {
  constructor(
    private clientsRepository: IClientsRepository,
  ) { }

  public async execute(): Promise<Client[] | null> {

    const clients = await this.clientsRepository.find();

    return clients;
  }
}
