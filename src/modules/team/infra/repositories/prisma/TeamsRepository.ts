import { PrismaClient } from '@prisma/client'
import ITeamsRepository from "@modules/team/domain/repositories//ITeamsRepository";
import { ICreateTeam } from "@modules/team/domain/models/ICreateTeam";
import { IUpdateTeam } from '@modules/team/domain/models/IUpdateTeam';

export default class ClientsRepository implements ITeamsRepository {
  private ormRepository: PrismaClient;

  constructor() {
    this.ormRepository = new PrismaClient();
  }

  public async create({ name, assistants }: ICreateTeam) {
    const team = await this.ormRepository.team.create({
      data: {
        name,
        assistants: {
          create: assistants
        }
      },
      include: {
        assistants: true
      }
    });

    await this.ormRepository.$disconnect();

    return team;
  }

  public async findById(teamId: number) {
    const team = await this.ormRepository.team.findUnique({
      where: { id: teamId },
      include: {
        assistants: true,
        requests: true
      }
    });

    await this.ormRepository.$disconnect();

    return team;
  };

  public async update({ teamId, data }: IUpdateTeam) {
    const updatedTeam = await this.ormRepository.team.update({
      where: { id: teamId },
      data
    });

    await this.ormRepository.$disconnect();

    return updatedTeam;
  };

  public async delete(teamId: number) {
    const deletedTeam = await this.ormRepository.team.delete({
      where: { id: teamId }
    });

    await this.ormRepository.$disconnect();

    return deletedTeam;
  };
}

