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

  public async execute({ subject, clientId }: ICreateRequest): Promise<Request> {
    const showTeam = new ShowTeamService();
    let team: ITeamFindByName | null = null;

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

    let status = '';
    let assistantId = undefined;
    team.assistants.forEach((assistant) => {
      if (assistant.requests.length < 3) {
        assistantId = assistant.id;
        status = 'ADERIDO'
      } else { status = 'PENDENTE' };
    });

    const request = await this.requestsRepository.create({
      status,
      subject,
      clientId,
      teamId: team.id,
      assistantId
    });

    return request;
  }
}
