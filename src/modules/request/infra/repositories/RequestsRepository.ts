import { PrismaClient } from '@prisma/client'
import IRequestsRepository from "@modules/request/domain/repositories/IRequestsRepository";
import { ICreateRequests } from "@modules/request/domain/models/ICreateRequest";

export default class ClientsRepository implements IRequestsRepository {
  private ormRepository: PrismaClient;

  constructor() {
    this.ormRepository = new PrismaClient();
  }

  public async create({ subject, status, clientId, teamId }: ICreateRequests) {
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

    return request;
  }


}
