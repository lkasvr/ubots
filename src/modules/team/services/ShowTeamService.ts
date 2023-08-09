import ITeamsRepository, { ITeamFindByName } from '../domain/repositories/ITeamsRepository';
import TeamsRepository from '../infra/repositories/prisma/TeamsRepository';


export default class ShowTeamService {
  private teamsRepository: ITeamsRepository;
  constructor() {
    this.teamsRepository = new TeamsRepository();
  }

  public async execute(teamName: string): Promise<ITeamFindByName | null> {

    const team = await this.teamsRepository.findByName(teamName);

    return team;
  }
}
