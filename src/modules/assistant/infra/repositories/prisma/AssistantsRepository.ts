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
      },
      include: {
        team: { select: { name: true } }
      }
    });

    return assistant;
  }

  public async findById(assistantId: string) {
    const assistant = await this.ormRepository.assistant.findUnique({
      where: { id: assistantId },
      include: {
        team: { select: { name: true } },
        requests: { select: { id: true, status: true } }
      }
    });

    return assistant;
  };

  public async find() {
    const assistants = await this.ormRepository.assistant.findMany({
      include: {
        team: { select: { name: true } },
        requests: { select: { id: true, status: true, subject: { select: { id: true, name: true } }, client: { select: { id: true, name: true } } } },
      }
    });

    return assistants;
  };

  public async update({ assistantId, data }: IUpdateAssistant) {
    const updatedAssistant = await this.ormRepository.assistant.update({
      where: { id: assistantId },
      data,
    });

    return updatedAssistant;
  };

  public async delete(assistantId: string) {
    const deletedAssistant = await this.ormRepository.assistant.delete({
      where: { id: assistantId },
    });

    return deletedAssistant;
  };
}
