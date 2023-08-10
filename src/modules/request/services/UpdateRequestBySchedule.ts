import { Request } from '@prisma/client';
import IRequestsRepository from '../domain/repositories/IRequestsRepository';
import RequestsRepository from '../infra/repositories/prisma/RequestsRepository';
import AppError from '@shared/errors/AppError';
import ShowTeamByIdService from '@modules/team/services/ShowTeamByIdService';

export default class UpdateRequestService {
  private requestsRepository: IRequestsRepository;

  constructor() {
    this.requestsRepository = new RequestsRepository();
  }

  public async execute(requestId: string): Promise<Request | AppError | string> {
    try {
      const request = await this.requestsRepository.findById(requestId);

      if (!request) return `${requestId}: Solicitação não encontrada.`;

      if (!request.teamId) return `${requestId}: Solicitação ainda não atribuída a um time.`;

      if (request.assistantId) return `${requestId}: Solicitação já atribuída a um assistente.`;

      const showTeamByIdService = new ShowTeamByIdService();

      const team = await showTeamByIdService.execute(request.teamId);

      if (team instanceof AppError) return team;

      if (!team?.assistants) return 'Time não possuí assistentes.';

      for (const assistant of team.assistants) {
        if (assistant.requests.length < 3)
          return await this.requestsRepository.update({ requestId, assistantId: assistant.id, status: 'ADERIDA', disconnect: false });
      }

      return `Não foi possível atualizar a solicitação: ${requestId}`
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
