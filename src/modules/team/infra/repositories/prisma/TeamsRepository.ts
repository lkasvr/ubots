import { PrismaClient } from '@prisma/client'
import ITeamsRepository from "@modules/team/domain/repositories//ITeamsRepository";
import { ICreateTeam } from "@modules/team/domain/models/ICreateTeam";
import { IUpdateTeam } from '@modules/team/domain/models/IUpdateTeam';

export default class TeamsRepository implements ITeamsRepository {
  private ormRepository: PrismaClient;

  constructor() {
    this.ormRepository = new PrismaClient();
  }

  public async create({ name, subject }: ICreateTeam) {
    const team = await this.ormRepository.team.create({
      data: {
        name,
        subject: {
          connectOrCreate: {
            where: { name: subject },
            create: { name: subject }
          }
        }
      },
      include: {
        subject: { select: { id: true, name: true } }
      }
    });

    return team;
  }

  public async findById(teamId: string) {
    const team = await this.ormRepository.team.findUnique({
      where: { id: teamId },
      include: {
        subject: { select: { id: true, name: true, } },
        assistants: { select: { id: true, name: true, requests: { select: { id: true, status: true } } } },
      }
    });

    return team;
  };

  public async findByName(name: string) {
    const team = await this.ormRepository.team.findUnique({
      where: { name },
      include: {
        subject: { select: { id: true, name: true, } },
        assistants: { select: { id: true, name: true, requests: { select: { id: true, status: true } } } },
      }
    });

    return team;
  };

  public async findBySubject(subject: string) {
    const team = await this.ormRepository.team.findMany({
      where: { subject: { name: { equals: subject } } },
      include: {
        assistants: { select: { id: true, name: true, requests: { select: { id: true, status: true } } } },
      }
    });

    return team;
  };

  public async find() {
    const teams = await this.ormRepository.team.findMany({
      include: {
        subject: { select: { id: true, name: true, } },
        assistants: { select: { id: true, name: true } },
        requests: { select: { id: true, status: true, client: { select: { id: true, name: true } }, assistantId: true } }
      }
    });

    return teams;
  };

  public async update({ teamId, data }: IUpdateTeam) {
    const updatedTeam = await this.ormRepository.team.update({
      where: { id: teamId },
      data: {
        subject: {

        }
      }
    });

    return updatedTeam;
  };

  public async delete(teamId: string) {
    const deletedTeam = await this.ormRepository.team.delete({
      where: { id: teamId }
    });

    return deletedTeam;
  };
}

