import { ICreateAssistant } from '@modules/assistant/domain/models/ICreateAssistant';
import { Assistant } from '@prisma/client';

export default interface IAssistantsRepository {
  create: (data: ICreateAssistant) => Promise<Assistant>;
}
