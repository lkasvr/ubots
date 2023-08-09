import { Assistant } from '@prisma/client';
import IAssistantsRepository from '../domain/repositories/IAssistantsRepository';
import AssistantsRepository from '../infra/repositories/prisma/AssistantsRepository';

export default class UpdateRelationWithTeamService {
  private assistantsRepository: IAssistantsRepository;
  constructor() {
    this.assistantsRepository = new AssistantsRepository();
  }

  public async execute(): Promise<Assistant[] | null> {

    const assistants = await this.assistantsRepository.find();

    return assistants;
  }
}
