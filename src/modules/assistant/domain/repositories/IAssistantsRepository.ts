import { ICreateAssistant } from '@modules/assistant/domain/models/ICreateAssistant';
import { Assistant } from '@prisma/client';
import { IUpdateAssistant } from '../models/IUpdateAssistant';

export interface IAssistantCreate extends Assistant {
  team: { name: string; } | null;
}

export interface IAssistantFindById extends Assistant {
  team: { name: string; } | null;
  requests: { id: string; status: string; }[] | null;
}

export interface IAssistantFind extends Assistant {
  team: { name: string; } | null;
  requests: {
    id: string;
    status: string;
    subject: { id: string; name: string; } | null,
    client: { id: string; name: string; }
  }[] | null;
}

export default interface IAssistantsRepository {
  create: (data: ICreateAssistant) => Promise<IAssistantCreate>;
  findById: (assistantId: string) => Promise<IAssistantFindById | null>;
  find: () => Promise<IAssistantFind[] | null>;
  update: (data: IUpdateAssistant) => Promise<Assistant>;
  delete: (assistantId: string) => Promise<Assistant>;
}
