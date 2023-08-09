import { Request, Response } from 'express';
// Repository
import TeamsRepository from '../../repositories/prisma/TeamsRepository';
// Services
import CreateTeamService from '@modules/team/services/CreateTeamService';
import ListTeamService from '@modules/team/services/ListTeamService';
import DeleteTeamService from '@modules/team/services/DeleteTeamService';
import ShowTeamByIdService from '@modules/team/services/ShowTeamByIdService';

export default class TeamController {
  public async index(req: Request, res: Response): Promise<Response> {

    const listTeams = new ListTeamService();

    const teams = await listTeams.execute();

    return res.json(teams);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, subject } = req.body;

    const createTeam = new CreateTeamService();

    const team = await createTeam.execute({
      name,
      subject
    });

    return res.json(team);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showTeam = new ShowTeamByIdService();

    const team = await showTeam.execute(id);

    return res.json(team);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteTeam = new DeleteTeamService();

    const team = await deleteTeam.execute(id);

    return res.json(team);
  }
}
