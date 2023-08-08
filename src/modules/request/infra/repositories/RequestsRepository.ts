import { PrismaClient } from '@prisma/client'
import IRequestsRepository from "@modules/request/domain/repositories/IRequestsRepository";
import { ICreateRequest } from "@modules/request/domain/models/ICreateRequest";
import { IUpdateRequest } from '@modules/request/domain/models/IUpdateRequest';

export default class ClientsRepository implements IRequestsRepository {
  private ormRepository: PrismaClient;

  constructor() {
    this.ormRepository = new PrismaClient();
  }

  public async create({ subject, status, clientId, teamId }: ICreateRequest) {
    const request = this.ormRepository.request.create({
      data: {
        subject,
        status,
        client: {
          connect: { id: clientId }
        },
        team: {
          connect: { id: teamId }
        },
        assistant: {
          connect: { id: teamId }
        }
      }
    });

    await this.ormRepository.$disconnect();

    return request;
  }

  public async findById(requestId: number) {
    const request = await this.ormRepository.request.findUnique({
      where: { id: requestId },
      include: {
        client: true,
        assistant: true,
      }
    });

    await this.ormRepository.$disconnect();

    return request;
  };

  public async findByStatus(status: string) {
    const request = await this.ormRepository.request.findMany({
      where: { status },
      include: {
        client: true,
        assistant: true,
        team: true,
      }
    });

    await this.ormRepository.$disconnect();

    return request;
  };

  public async findBySubject(subject: string) {
    const request = await this.ormRepository.request.findMany({
      where: { subject },
      include: {
        client: true,
        assistant: true,
        team: true,
      }
    });

    return request;
  };

  public async findByAssistant(assistantId: number) {
    const request = await this.ormRepository.request.findMany({
      where: { assistantId },
      include: {
        client: true,
        team: true,
      }
    });

    return request;
  };

  public async update({ requestId, data }: IUpdateRequest) {
    const requestUpdated = await this.ormRepository.request.update({
      where: { id: requestId },
      data,
    });

    await this.ormRepository.$disconnect();

    return requestUpdated;
  };

  public async delete(requestId: number) {
    const deletedRequest = await this.ormRepository.request.delete({
      where: { id: requestId },
      include: {
        client: true
      }
    });

    await this.ormRepository.$disconnect();

    return deletedRequest;
  };
}
