import { PrismaClient } from '@prisma/client'
import IClientsRepository from "@modules/client/domain/repositories/IClientsRepository";
import { ICreateClient } from "@modules/client/domain/models/ICreateClient";
import { IUpdateClient } from '@modules/client/domain/models/IUpdateClient';

export default class ClientsRepository implements IClientsRepository {
  private ormRepository: PrismaClient;

  constructor() {
    this.ormRepository = new PrismaClient();
  }

  public async create({ name, email }: ICreateClient) {
    const client = await this.ormRepository.client.create({
      data: {
        name,
        email,
      },
    });

    return client;
  }

  public async findById(id: string) {
    const client = await this.ormRepository.client.findUnique({
      where: { id }
    });

    return client;
  };

  public async findByEmail(email: string) {
    const client = await this.ormRepository.client.findUnique({
      where: { email },
    });

    return client;
  };

  public async find() {
    const client = await this.ormRepository.client.findMany({
      include: { requests: true }
    });

    return client;
  };

  public async update({ clientId, data }: IUpdateClient) {
    const updatedClient = await this.ormRepository.client.update({
      where: { id: clientId },
      data,
    });

    return updatedClient;
  }

  public async delete(clientId: string) {
    const deletedClient = await this.ormRepository.client.delete({
      where: { id: clientId },
    });

    return deletedClient;
  }

}
