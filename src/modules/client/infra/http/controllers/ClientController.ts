import { Request, Response } from 'express';
// Services
import CreateClientService from '@modules/client/services/CreateClientService';
import ListClientService from '@modules/client/services/ListClientService';
import DeleteClientService from '@modules/client/services/DeleteClientService';
import ShowClientService from '@modules/client/services/ShowClientService';
import UpdateClientService from '@modules/client/services/UpdateClientService';

export default class ClientController {
  public async index(req: Request, res: Response): Promise<Response> {

    const listClients = new ListClientService();

    const clients = await listClients.execute();

    return res.json(clients);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createClient = new CreateClientService();

    const client = await createClient.execute({
      name,
      email,
    });

    return res.json(client);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showClientService = new ShowClientService();

    const client = await showClientService.execute(Number(id));

    return res.json(client);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { clientId, name, email } = req.body;

    const updateClientService = new UpdateClientService();

    const client = await updateClientService.execute({ clientId: Number(clientId), data: { name, email } });

    return res.json(client);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteClient = new DeleteClientService();

    const deletedClient = await deleteClient.execute(Number(id));

    return res.json(deletedClient);
  }
}
