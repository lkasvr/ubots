import { Request, Response } from 'express';
// Services
import CreateAssistantService from '@modules/assistant/services/CreateAssistantService';
import ListClientService from '@modules/assistant/services/ListAssistantService';
import DeleteAssistantService from '@modules/assistant/services/DeleteAssistantService';

export default class AssistantController {

  public async index(req: Request, res: Response): Promise<Response> {

    const listAssistants = new ListClientService();

    const assistants = await listAssistants.execute();

    return res.json(assistants);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, teamId } = req.body;

    const createAssistant = new CreateAssistantService();

    const assistant = await createAssistant.execute({
      name,
      teamId
    });

    return res.json(assistant);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteAssistant = new DeleteAssistantService();

    const assistant = await deleteAssistant.execute(Number(id));

    return res.json(assistant);
  }
}
