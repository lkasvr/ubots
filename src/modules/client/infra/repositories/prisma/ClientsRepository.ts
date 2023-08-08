import { PrismaClient } from '@prisma/client'
import IClientsRepository from "@modules/client/domain/repositories/IClientsRepository";
import { ICreateClient } from "@modules/client/domain/models/ICreateClient";
import { IDeleteClient } from '@modules/client/domain/models/IDeleteCLient';
import { IUpdateClient } from '@modules/client/domain/models/IUpdateClient';
import { IReadClient } from '@modules/client/domain/models/IReadClient';

export default class ClientsRepository implements IClientsRepository {
  private ormRepository: PrismaClient;

  constructor() {
    this.ormRepository = new PrismaClient();
  }

  public async create({ name, email, requests }: ICreateClient) {
    const client = await this.ormRepository.client.create({
      data: {
        name,
        email,
        requests: {
          create: requests
        }
      },
      include: {
        requests: true,
      }
    });

    await this.ormRepository.$disconnect();

    return client;
  }

  public async findById({ clientId }: IReadClient) {
    const client = await this.ormRepository.client.findUnique({
      where: { id: clientId }
    });

    await this.ormRepository.$disconnect();

    return client;
  };

  public async findByEmail(email: string) {
    const client = await this.ormRepository.client.findUnique({
      where: { email },
      include: { requests: true }
    });

    await this.ormRepository.$disconnect();

    return client;
  };

  public async update({ clientId, data }: IUpdateClient) {
    const updatedClient = await this.ormRepository.client.update({
      where: { id: clientId },
      data,
    });

    await this.ormRepository.$disconnect();

    return updatedClient;
  }

  public async delete({ clientId }: IDeleteClient) {
    const deletedClient = await this.ormRepository.client.delete({
      where: { id: clientId },
    });

    await this.ormRepository.$disconnect();

    return deletedClient;
  }

}
