import { PrismaClient } from '@prisma/client'
import IAssistantsRepository from "@modules/assistant/domain/repositories/IAssistantsRepository";
import { ICreateAssistant } from "@modules/assistant/domain/models/ICreateAssistant";
import { IUpdateAssistant } from '@modules/assistant/domain/models/IUpdateAssistant';

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

    await this.ormRepository.$disconnect();

    return assistant;
  }

  public async findById(assistantId: number) {
    const assistant = this.ormRepository.assistant.findUnique({
      where: { id: assistantId },
      include: {
        team: true,
        requests: true,
      }
    });

    await this.ormRepository.$disconnect();

    return assistant;
  };

  public async update({ assistantId, data }: IUpdateAssistant) {
    const updatedAssistant = this.ormRepository.assistant.update({
      where: { id: assistantId },
      data,
    });

    await this.ormRepository.$disconnect();

    return updatedAssistant;
  };

  public async delete(assistantId: number) {
    const deletedAssistant = this.ormRepository.assistant.delete({
      where: { id: assistantId },
    });

    await this.ormRepository.$disconnect();

    return deletedAssistant;
  };
}
