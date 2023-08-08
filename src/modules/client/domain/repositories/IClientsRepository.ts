import { Client } from "@prisma/client";
import { ICreateClient } from "../models/ICreateClient";
import { IDeleteClient } from "../models/IDeleteCLient";
import { IUpdateClient } from "../models/IUpdateClient";
import { IReadClient } from "../models/IReadClient";

export default interface ClientsRepository {
  create: (data: ICreateClient) => Promise<Client>;
  findById: (data: IReadClient) => Promise<Client | null>;
  update: (data: IUpdateClient) => Promise<Client>;
  delete: (data: IDeleteClient) => Promise<Client>;
}
