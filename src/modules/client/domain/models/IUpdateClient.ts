import { Client } from "@prisma/client";

export interface IUpdateClient {
  clientId: number;
  data: Omit<Client, 'id'>;
}
