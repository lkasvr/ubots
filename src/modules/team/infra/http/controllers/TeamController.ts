import { Request, Response } from 'express';
// Repository
import TeamsRepository from '../../repositories/prisma/TeamsRepository';
// Services
import CreateTeamService from '@modules/team/services/CreateTeamService';
import ListTeamService from '@modules/team/services/ListTeamService';
import DeleteTeamService from '@modules/team/services/DeleteTeamService';

export default class TeamController {
  public async index(req: Request, res: Response): Promise<Response> {

    const listTeams = new ListTeamService();

    const teams = await listTeams.execute();

    return res.json(teams);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createTeam = new CreateTeamService();

    const team = await createTeam.execute({
      name
    });

    return res.json(team);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteTeam = new DeleteTeamService();

    const team = await deleteTeam.execute(Number(id));

    return res.json(team);
  }
}
