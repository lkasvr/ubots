import { Request, Response } from 'express';
// Services
import CreateRequestService from '@modules/request/services/CreateRequestService';
import ListRequestService from '@modules/request/services/ListRequestService';
import RequestsRepository from '../../repositories/prisma/RequestsRepository';

export default class RequestsController {
  private requestsRepository: RequestsRepository = new RequestsRepository();

  public async index(req: Request, res: Response): Promise<Response> {

    const listRequests = new ListRequestService(this.requestsRepository);

    const requests = await listRequests.execute();

    return res.json(requests);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      status,
      subject,
      clientId,
      teamId,
      assistantId
    } = req.body;

    const createRequest = new CreateRequestService(this.requestsRepository);

    const request = await createRequest.execute({
      status,
      subject,
      clientId,
      teamId,
      assistantId
    });

    return res.json(request);
  }
}
