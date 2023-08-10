import { Request } from '@prisma/client';
import IRequestsRepository from '../domain/repositories/IRequestsRepository';
import RequestsRepository from '../infra/repositories/prisma/RequestsRepository';
import AppError from '@shared/errors/AppError';
import { IUpdateRequest } from '../domain/models/IUpdateRequest';
import ShowAssistantService from '@modules/assistant/services/ShowAssistantService';
import ShowTeamByIdService from '@modules/team/services/ShowTeamByIdService';

export default class UpdateRequestService {
  private requestsRepository: IRequestsRepository;

  constructor() {
    this.requestsRepository = new RequestsRepository();
  }

  public async execute(requestId: string): Promise<Request | AppError> {
    try {
      const request = await this.requestsRepository.findById(requestId);

      if (!request) throw new AppError('Solicitação não encontrada.');

      if (!request.teamId) throw new AppError('Solicitação ainda não atribuída a um time.');

      if (request.assistantId) throw new AppError('Solicitação já atribuída a um assistente.');

      const showTeamByIdService = new ShowTeamByIdService();

      const team = await showTeamByIdService.execute(request.teamId);

      if (team instanceof AppError) return team;

      if (!team?.assistants) return new AppError('Time não possuí assistentes.');

      for (const assistant of team.assistants) {
        if (assistant.requests.length < 3)
          return await this.requestsRepository.update({ requestId, assistantId: assistant.id, disconnect: false });
      }

      return new AppError('Não foi possível atualizar a solicitação.');
    } catch (error) {
      if (error instanceof AppError) return error;
      console.error(error);

      return new AppError('Error', error);
    }
  }
}
