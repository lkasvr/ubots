import { Assistant } from '@prisma/client';
import IAssistantsRepository from '../domain/repositories/IAssistantsRepository';

export default class DeleteAssistantService {
  constructor(
    private assistantsRepository: IAssistantsRepository,
  ) { }

  public async execute(assistantId: number): Promise<Assistant | null> {

    const deletedAssistant = await this.assistantsRepository.delete(assistantId);

    return deletedAssistant;
  }
}
