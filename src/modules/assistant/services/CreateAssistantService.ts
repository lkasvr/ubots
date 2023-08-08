import { Assistant } from '@prisma/client';
import { ICreateAssistant } from '../domain/models/ICreateAssistant';
import IAssistantsRepository from '../domain/repositories/IAssistantsRepository';

export default class CreateAssistantService {
  constructor(
    private assistantsRepository: IAssistantsRepository,
  ) { }

  public async execute({ name, teamId }: ICreateAssistant): Promise<Assistant | null> {

    const assistant = await this.assistantsRepository.create({ name, teamId });

    return assistant;
  }
}
