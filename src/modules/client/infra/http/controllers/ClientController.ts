import { Request, Response } from 'express';
// Repository
import ClientsRepository from '../../repositories/prisma/ClientsRepository';
// Services
import CreateClientService from '@modules/client/services/CreateClientService';
import ListClientService from '@modules/client/services/ListClientService';
import DeleteClientService from '@modules/client/services/DeleteClientService';

export default class ClientController {
  public async index(req: Request, res: Response): Promise<Response> {

    const listClients = new ListClientService(new ClientsRepository);

    const clients = await listClients.execute();

    return res.json(clients);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, requestsIds } = req.body;

    const createClient = new CreateClientService(new ClientsRepository);

    const client = await createClient.execute({
      name,
      email,
      requestsIds
    });

    return res.json(client);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteClient = new DeleteClientService(new ClientsRepository);

    const deletedClient = await deleteClient.execute(Number(id));

    return res.json(deletedClient);
  }
}
