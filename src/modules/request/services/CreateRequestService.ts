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

  public async execute({ subject, clientId }: ICreateRequest): Promise<Request | AppError> {
    try {

      const showCLient = new ShowClientService();

      const client = await showCLient.execute(clientId);

      if (client instanceof AppError) return client;

      const showTeam = new ShowTeamBySubjectService();

      const team = await showTeam.execute(subject);

      if (team instanceof AppError) throw new AppError(team.message);

      if (team[0] && team.length === 1) {
        let status = '';
        let assistantId = undefined;
        if (team[0].assistants.length > 0) {
          team[0].assistants.forEach((assistant) => {
            const assignedRequests = assistant.requests.filter((request) => {
              return request.status === 'ADERIDO';
            });

            if (assignedRequests.length < 3) {
              assistantId = assistant.id;
              status = 'ADERIDO'
            } else { status = 'PENDENTE' };
          });
        } else { status = 'PENDENTE' }

        const request = await this.requestsRepository.create({
          status,
          subject,
          clientId,
          teamId: team[0].id,
          assistantId
        });

        return request;
      };

      throw new AppError(`A solicitão '${subject}', ainda não possui time para solucioná-la.`);
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
