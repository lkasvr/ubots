import { Assistant, Client, Request, Team } from "@prisma/client";
import { ICreateRequest } from "../models/ICreateRequest";
import { IUpdateRequest } from "../models/IUpdateRequest";

export interface IRequestCreate extends ICreateRequest {
  status: string;
  teamId: number;
  assistantId?: number;
}

export interface IRequestFindById extends Request {
  team: { name: string; } | null;
  assistant: {
    name: string;
    requests: { id: number; }[]
  } | null;
}

export interface IRequestFindByStatus extends Request {
  client: Client;
  assistant: Assistant | null;
  team: Team | null;
}

export interface IRequestFindByAssistant extends Request {
  client: Client;
  team: Team | null;
}

export interface IRequestFind extends Request {
  client: { name: string; email: string; };
  team: { name: string; } | null;
}

export interface IRequestUpdate extends IUpdateRequest {
  disconnect: boolean;
}

export interface IRequestDelete extends Request {
  client: Client;
}

export default interface RequestsRepository {
  create: (data: IRequestCreate) => Promise<Request>;
  findById: (requestId: number) => Promise<IRequestFindById | null>;
  findByStatus: (status: string) => Promise<IRequestFindByStatus[] | null>;
  findByAssistant: (assistantId: number) => Promise<IRequestFindByAssistant[] | null>;
  find: () => Promise<IRequestFind[] | null>;
  update: (data: IRequestUpdate) => Promise<Request>;
  delete: (requestId: number) => Promise<IRequestDelete>;
}
