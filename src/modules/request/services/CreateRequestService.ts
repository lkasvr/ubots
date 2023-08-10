import { Request } from '@prisma/client';
import { ICreateRequest } from '../domain/models/ICreateRequest';
import IRequestsRepository from '../domain/repositories/IRequestsRepository';
import ShowTeamBySubjectService from '@modules/team/services/ShowTeamBySubjectService';
import AppError from '@shared/errors/AppError';
import RequestsRepository from '../infra/repositories/prisma/RequestsRepository';
import ShowClientService from '@modules/client/services/ShowClientService';

export default class CreateRequestService {
  private requestsRepository: IRequestsRepository;

  constructor() {
    this.requestsRepository = new RequestsRepository();
  }

  public async execute({ subject, desc, clientId }: ICreateRequest): Promise<Request | AppError> {
    try {

      const showCLient = new ShowClientService();

      const client = await showCLient.execute(clientId);

      if (client instanceof AppError) return client;

      const showTeam = new ShowTeamBySubjectService();

      const team = await showTeam.execute(subject);

      if (team instanceof AppError) throw new AppError('Não existe time atribuído para tratar o assunto solicitado.', team, team.statusCode);

      let request: Request | null = null;

      let status = 'PENDENTE';
      let assistantId = undefined;
      if (team.assistants && team.assistants.length > 0) {
        for (const assistant of team.assistants) {
          const assignedRequests = assistant.requests.filter((request) => request.status === 'ADERIDA');
          if (assignedRequests.length < 3) {
            assistantId = assistant.id;
            status = 'ADERIDA'
            request = await this.requestsRepository.create({
              status,
              desc,
              subject,
              clientId,
              teamId: team.id,
              assistantId
            });
            break;
          }
        }
        if (request) return request;
      }

      request = await this.requestsRepository.create({
        status,
        desc,
        subject,
        clientId,
        teamId: team.id
      });

      if (!request) return new AppError('Não foi possível criar a solicitação.');

      return request;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
