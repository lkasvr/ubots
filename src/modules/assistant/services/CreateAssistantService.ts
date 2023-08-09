import { Assistant } from '@prisma/client';
import { ICreateAssistant } from '../domain/models/ICreateAssistant';
import IAssistantsRepository from '../domain/repositories/IAssistantsRepository';
import AssistantsRepository from '../infra/repositories/prisma/AssistantsRepository';

export default class CreateAssistantService {
  private assistantsRepository: IAssistantsRepository;
  constructor() {
    this.assistantsRepository = new AssistantsRepository();
  }

  public async execute({ name, teamId }: ICreateAssistant): Promise<Assistant | null> {

    const assistant = await this.assistantsRepository.create({ name, teamId });

    return assistant;
  }
}
