import { Request } from "@prisma/client";
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

export interface IRequestUpdate extends IUpdateRequest {
  disconnect: boolean;
}

export default interface RequestsRepository {
  create: (data: IRequestCreate) => Promise<Request>;
  findById: (requestId: number) => Promise<IRequestFindById | null>;
  findByStatus: (status: string) => Promise<Request[] | null>;
  findByAssistant: (assistantId: number) => Promise<Request[] | null>;
  find: () => Promise<Request[] | null>;
  update: (data: IRequestUpdate) => Promise<Request>;
  delete: (requestId: number) => Promise<Request>;
}
