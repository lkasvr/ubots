import { Request, Response } from 'express';
// Services
import CreateAssistantService from '@modules/assistant/services/CreateAssistantService';
import ListClientService from '@modules/assistant/services/ListAssistantService';
import DeleteAssistantService from '@modules/assistant/services/DeleteAssistantService';
import ShowAssistantService from '@modules/assistant/services/ShowAssistantService';
import UpdateAssistantService from '@modules/assistant/services/UpdateAssistantService';

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

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showAssistantService = new ShowAssistantService();

    const assistant = await showAssistantService.execute(Number(id));

    return res.json(assistant);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { assistantId, name } = req.body;

    const updateAssistantService = new UpdateAssistantService();

    const assistant = await updateAssistantService.execute({ assistantId: Number(assistantId), data: { name } });

    return res.json(assistant);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteAssistant = new DeleteAssistantService();

    const assistant = await deleteAssistant.execute(Number(id));

    return res.json(assistant);
  }
}
