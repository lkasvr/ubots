import { Assistant } from "@prisma/client";

export interface ICreateRequests {
  subject: string;
  status: string;
  clientId: number;
  teamId: number;
  assistantId?: number;
}
