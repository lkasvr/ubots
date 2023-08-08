import { Request } from "@prisma/client";

export interface ClientCreateData {
  name: string;
  email: string;
  request?: Request;
}

export default interface ClientsRepository {
  create: (data: ClientCreateData) => Promise<void>;
}
