import { ICreateAssistant } from '@modules/assistant/domain/models/ICreateAssistant';
import { Assistant, Team } from '@prisma/client';
import { IUpdateAssistant } from '../models/IUpdateAssistant';

export interface IAssistantFindById extends Assistant {
  team: Team | null;
  requests: { id: number; status: string; }[] | null;
}

export default interface IAssistantsRepository {
  create: (data: ICreateAssistant) => Promise<Assistant>;
  findById: (assistantId: number) => Promise<IAssistantFindById | null>;
  find: () => Promise<Assistant[] | null>;
  update: (data: IUpdateAssistant) => Promise<Assistant>;
  delete: (assistantId: number) => Promise<Assistant>;
}
