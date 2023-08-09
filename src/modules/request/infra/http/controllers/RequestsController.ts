import { Request, Response } from 'express';
// Repository
import RequestsRepository from '../../repositories/prisma/RequestsRepository';
// Services
import CreateRequestService from '@modules/request/services/CreateRequestService';
import ListRequestService from '@modules/request/services/ListRequestService';
import DeleteRequestService from '@modules/request/services/DeleteRequestService';

export default class RequestsController {
  public async index(req: Request, res: Response): Promise<Response> {

    const listRequests = new ListRequestService(new RequestsRepository);

    const requests = await listRequests.execute();

    return res.json(requests);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      subject,
      clientId,
    } = req.body;

    const createRequest = new CreateRequestService(new RequestsRepository);

    const request = await createRequest.execute({
      subject,
      clientId,
    });

    return res.json(request);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteRequest = new DeleteRequestService(new RequestsRepository);

    const deletedRequest = await deleteRequest.execute(id);

    return res.json(deletedRequest);
  }
}
