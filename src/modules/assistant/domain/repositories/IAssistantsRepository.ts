import { ICreateAssistant } from '@modules/assistant/domain/models/ICreateAssistant';
import { Assistant } from '@prisma/client';
import { IUpdateAssistant } from '../models/IUpdateAssistant';

export interface IAssistantCreate extends Assistant {
  team: { name: string; } | null;
}

export interface IAssistantFindById extends Assistant {
  team: { name: string; } | null;
  requests: { id: number; status: string; }[] | null;
}

export interface IAssistantFind extends Assistant {
  team: { name: string; } | null;
  requests: {
    id: number;
    status: string;
    subject: { id: number; name: string; },
    client: { id: number; name: string; }
  }[] | null;
}

export default interface IAssistantsRepository {
  create: (data: ICreateAssistant) => Promise<IAssistantCreate>;
  findById: (assistantId: number) => Promise<IAssistantFindById | null>;
  find: () => Promise<IAssistantFind[] | null>;
  update: (data: IUpdateAssistant) => Promise<Assistant>;
  delete: (assistantId: number) => Promise<Assistant>;
}
