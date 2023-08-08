import { PrismaClient } from '@prisma/client'
import ITeamsRepository from "@modules/team/domain/repositories//ITeamsRepository";
import { ICreateTeam } from "@modules/team/domain/models/ICreateTeam";

export default class ClientsRepository implements ITeamsRepository {
  private ormRepository: PrismaClient;

  constructor() {
    this.ormRepository = new PrismaClient();
  }

  public async create({ name, assistants }: ICreateTeam) {
    const team = this.ormRepository.team.create({
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

    return team;
  }

}
