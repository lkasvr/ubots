import { Request } from "@prisma/client";

export interface ICreateClient {
  name: string;
  email: string;
  requests?: [Request, Request, Request];
}
