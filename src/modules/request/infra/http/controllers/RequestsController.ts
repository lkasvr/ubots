import { Request, Response } from 'express';
// Services
import CreateRequestService from '@modules/request/services/CreateRequestService';
import ListRequestService from '@modules/request/services/ListRequestService';
import DeleteRequestService from '@modules/request/services/DeleteRequestService';
import ShowRequestService from '@modules/request/services/ShowRequestService';
import UpdateRequestService from '@modules/request/services/UpdateRequestService';

export default class RequestsController {
  public async index(req: Request, res: Response): Promise<Response> {

    const listRequests = new ListRequestService();

    const requests = await listRequests.execute();

    return res.json(requests);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      subject,
      clientId,
    } = req.body;

    const createRequest = new CreateRequestService();

    const request = await createRequest.execute({
      subject,
      clientId,
    });

    return res.json(request);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showRequest = new ShowRequestService();

    const request = await showRequest.execute(Number(id));

    return res.json(request);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { requestId, assistantId, status } = req.body;

    const updateRequestService = new UpdateRequestService();

    const request = await updateRequestService.execute({ requestId: Number(requestId), assistantId: Number(assistantId), status });

    return res.json(request);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteRequest = new DeleteRequestService();

    const deletedRequest = await deleteRequest.execute(Number(id));

    return res.json(deletedRequest);
  }
}
