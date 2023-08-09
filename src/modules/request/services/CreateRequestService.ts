import { Request } from '@prisma/client';
import { ICreateRequest } from '../domain/models/ICreateRequest';
import IRequestsRepository from '../domain/repositories/IRequestsRepository';
import ShowTeamService from '@modules/team/services/ShowTeamService';
import AppError from '@shared/errors/AppError';
import { ITeamFindByName } from '@modules/team/domain/repositories/ITeamsRepository';
import RequestsRepository from '../infra/repositories/prisma/RequestsRepository';

export default class CreateRequestService {
  private requestsRepository: IRequestsRepository;

  constructor() {
    this.requestsRepository = new RequestsRepository();
  }

  public async execute({ subject, clientId }: ICreateRequest): Promise<Request | AppError | null> {
    try {
      const showTeam = new ShowTeamService();
      let team: ITeamFindByName | AppError | null = null;

      switch (subject) {
        case 'Problemas com cartão':
          team = await showTeam.execute('CARTÕES');
          break;
        case 'Contratação de Empréstimos':
          team = await showTeam.execute('EMPRÉSTIMOS');
          break;
        case 'Outros Assuntos':
          team = await showTeam.execute('OUTROS ASSUNTOS');
          break;
      };

      if (!team) throw new AppError('Time inexistente para tratar do assunto informado.');

      if (team instanceof AppError) throw new AppError(team.message);

      let status = '';
      let assistantId = undefined;
      if (team.assistants.length > 0) {
        team.assistants.forEach((assistant) => {
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
        teamId: team.id,
        assistantId
      });

      return request;
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return null;
    }
  }
}
