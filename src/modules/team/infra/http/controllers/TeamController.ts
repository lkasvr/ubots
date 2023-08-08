import { Request, Response } from 'express';
// Services
import CreateTeamService from '@modules/team/services/CreateTeamService';
import ListTeamService from '@modules/team/services/ListTeamService';
import TeamsRepository from '../../repositories/prisma/TeamsRepository';

export default class TeamController {
  public async index(req: Request, res: Response): Promise<Response> {

    const listTeams = new ListTeamService(new TeamsRepository);

    const teams = await listTeams.execute();

    return res.json(teams);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createTeam = new CreateTeamService(new TeamsRepository);

    const team = await createTeam.execute({
      name
    });

    return res.json(team);
  }
}
