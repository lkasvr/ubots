import { Assistant } from '@prisma/client';
import IAssistantsRepository from '../domain/repositories/IAssistantsRepository';
import AssistantsRepository from '../infra/repositories/prisma/AssistantsRepository';

export default class DeleteAssistantService {
  private assistantsRepository: IAssistantsRepository;
  constructor() {
    this.assistantsRepository = new AssistantsRepository();
  }

  public async execute(assistantId: number): Promise<Assistant | null> {

    const deletedAssistant = await this.assistantsRepository.delete(assistantId);

    return deletedAssistant;
  }
}
