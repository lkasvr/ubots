import { Request } from "@prisma/client";
import { ICreateRequest } from "../models/ICreateRequest";
import { IUpdateRequest } from "../models/IUpdateRequest";

export interface ICreateRequestRepositoryMethod extends ICreateRequest {
  status: string;
  teamId: number;
  assistantId?: number;
}

export default interface RequestsRepository {
  create: (data: ICreateRequestRepositoryMethod) => Promise<Request>;
  findById: (requestId: number) => Promise<Request | null>;
  findByStatus: (status: string) => Promise<Request[] | null>;
  findBySubject: (subject: string) => Promise<Request[] | null>;
  findByAssistant: (assistantId: number) => Promise<Request[] | null>;
  find: () => Promise<Request[] | null>;
  update: (data: IUpdateRequest) => Promise<Request>;
  delete: (requestId: number) => Promise<Request>;
}
