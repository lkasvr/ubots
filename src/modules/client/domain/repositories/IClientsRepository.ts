import { Client } from "@prisma/client";
import { ICreateClient } from "../models/ICreateClient";
import { IUpdateClient } from "../models/IUpdateClient";

export default interface ClientsRepository {
  create: (data: ICreateClient) => Promise<Client>;
  findById: (id: number) => Promise<Client | null>;
  findByEmail: (email: string) => Promise<Client | null>;
  find: () => Promise<Client[] | null>;
  update: (data: IUpdateClient) => Promise<Client>;
  delete: (clientId: number) => Promise<Client>;
}
