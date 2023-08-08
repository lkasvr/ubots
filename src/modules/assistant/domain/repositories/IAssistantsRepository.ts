import { ICreateAssistant } from '@modules/assistant/domain/models/ICreateAssistant';
import { Assistant } from '@prisma/client';
import { IUpdateAssistant } from '../models/IUpdateAssistant';

export default interface IAssistantsRepository {
  create: (data: ICreateAssistant) => Promise<Assistant>;
  findById: (assistantId: number) => Promise<Assistant | null>;
  find: () => Promise<Assistant[] | null>;
  update: (data: IUpdateAssistant) => Promise<Assistant>;
  delete: (assistantId: number) => Promise<Assistant>;
}
