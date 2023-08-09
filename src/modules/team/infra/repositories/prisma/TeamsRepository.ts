import { PrismaClient } from '@prisma/client'
import ITeamsRepository from "@modules/team/domain/repositories//ITeamsRepository";
import { ICreateTeam } from "@modules/team/domain/models/ICreateTeam";
import { IUpdateTeam } from '@modules/team/domain/models/IUpdateTeam';

export default class TeamsRepository implements ITeamsRepository {
  private ormRepository: PrismaClient;

  constructor() {
    this.ormRepository = new PrismaClient();
  }

  public async create({ name }: ICreateTeam) {
    const team = await this.ormRepository.team.create({
      data: {
        name
      },
    });

    return team;
  }

  public async findById(teamId: number) {
    const team = await this.ormRepository.team.findUnique({
      where: { id: teamId },
      include: {
        assistants: { select: { id: true } }
      }
    });

    return team;
  };

  public async findByName(name: string) {
    const team = await this.ormRepository.team.findUnique({
      where: { name },
      include: {
        assistants: { select: { id: true, name: true, requests: { select: { id: true } } } },
      }
    });

    return team;
  };

  public async find() {
    const teams = await this.ormRepository.team.findMany({
      include: {
        assistants: { select: { id: true, name: true } },
        requests: { select: { id: true, status: true, subject: true, client: { select: { id: true, name: true } } } }
      }
    });

    return teams;
  };

  public async update({ teamId, data }: IUpdateTeam) {
    const updatedTeam = await this.ormRepository.team.update({
      where: { id: teamId },
      data
    });

    return updatedTeam;
  };

  public async delete(teamId: number) {
    const deletedTeam = await this.ormRepository.team.delete({
      where: { id: teamId }
    });

    return deletedTeam;
  };
}

