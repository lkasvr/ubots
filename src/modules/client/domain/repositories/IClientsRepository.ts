import { Client, Request } from "@prisma/client";
import { ICreateClient } from "../models/ICreateClient";
import { IUpdateClient } from "../models/IUpdateClient";

export interface IClientFind extends Client {
  requests: Request[];
}

export default interface ClientsRepository {
  create: (data: ICreateClient) => Promise<Client>;
  findById: (id: number) => Promise<Client | null>;
  findByEmail: (email: string) => Promise<Client | null>;
  find: () => Promise<IClientFind[] | null>;
  update: (data: IUpdateClient) => Promise<Client>;
  delete: (clientId: number) => Promise<Client>;
}
