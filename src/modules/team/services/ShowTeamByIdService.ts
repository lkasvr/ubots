import ITeamsRepository, { ITeamFindById } from '../domain/repositories/ITeamsRepository';
import TeamsRepository from '../infra/repositories/prisma/TeamsRepository';


export default class ShowTeamByIdService {
  private teamsRepository: ITeamsRepository;
  constructor() {
    this.teamsRepository = new TeamsRepository();
  }

  public async execute(teamId: number): Promise<ITeamFindById | null> {

    const team = await this.teamsRepository.findById(teamId);

    return team;
  }
}
