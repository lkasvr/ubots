import { Assistant } from '@prisma/client';
import IAssistantsRepository from '../domain/repositories/IAssistantsRepository';

export default class ListAssistantService {
  constructor(
    private assistantsRepository: IAssistantsRepository,
  ) { }

  public async execute(): Promise<Assistant[] | null> {

    const assistants = await this.assistantsRepository.find();

    return assistants;
  }
}
