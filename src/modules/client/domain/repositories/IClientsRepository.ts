import { Client } from "@prisma/client";
import { ICreateClient } from "../models/ICreateClient";
import { IUpdateClient } from "../models/IUpdateClient";

export interface IClientFind extends Client {
  requests: {
    id: string,
    status: string,
    desc: string,
    createdAt: Date,
    updatedAt: Date;
  }[];
}

export default interface ClientsRepository {
  create: (data: ICreateClient) => Promise<Client>;
  findById: (id: string) => Promise<Client | null>;
  findByEmail: (email: string) => Promise<Client | null>;
  find: () => Promise<IClientFind[] | null>;
  update: (data: IUpdateClient) => Promise<Client>;
  delete: (clientId: string) => Promise<Client>;
}
