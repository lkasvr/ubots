import { PrismaClient } from '@prisma/client'
import IAssistantsRepository from "@modules/assistant/domain/repositories/IAssistantsRepository";
import { ICreateAssistant } from "@modules/assistant/domain/models/ICreateAssistant";

export default class AssistantsRepository implements IAssistantsRepository {
  private ormRepository: PrismaClient;

  constructor() {
    this.ormRepository = new PrismaClient();
  }

  public async create({ name, teamId }: ICreateAssistant) {
    const assistant = await this.ormRepository.assistant.create({
      data: {
        name,
        team: {
          connect: { id: teamId }
        },
      }
    });

    return assistant;
  }


}
