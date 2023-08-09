import { Request, Response } from 'express';
// Repository
import TeamsRepository from '../../repositories/prisma/TeamsRepository';
// Services
import CreateTeamService from '@modules/team/services/CreateTeamService';
import ListTeamService from '@modules/team/services/ListTeamService';
import DeleteTeamService from '@modules/team/services/DeleteTeamService';

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

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteTeam = new DeleteTeamService(new TeamsRepository);

    const team = await deleteTeam.execute(Number(id));

    return res.json(team);
  }
}
