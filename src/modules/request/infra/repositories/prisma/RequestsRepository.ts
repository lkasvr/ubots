import { PrismaClient } from '@prisma/client'
import IRequestsRepository, { ICreateRequestRepositoryMethod } from "@modules/request/domain/repositories/IRequestsRepository";
import { IUpdateRequest } from '@modules/request/domain/models/IUpdateRequest';

export default class RequestsRepository implements IRequestsRepository {
  private ormRepository: PrismaClient;

  constructor() {
    this.ormRepository = new PrismaClient();
  }

  public async create({ subject, status, clientId, teamId, assistantId }: ICreateRequestRepositoryMethod) {

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
        assistant: assistantId
          ? {
            connect: { id: assistantId }
          }
          : undefined
      }
    });

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

  public async find() {
    const requests = await this.ormRepository.request.findMany({
      include: {
        client: { select: { name: true, email: true } },
        team: { select: { name: true } },
      },
    });

    return requests;
  };

  public async update({ requestId, data }: IUpdateRequest) {
    const requestUpdated = await this.ormRepository.request.update({
      where: { id: requestId },
      data,
    });

    return requestUpdated;
  };

  public async delete(requestId: number) {
    const deletedRequest = await this.ormRepository.request.delete({
      where: { id: requestId },
      include: {
        client: true
      }
    });

    return deletedRequest;
  };
}
