import { Assistant } from "@prisma/client";

export interface ICreateTeam {
  name: string;
  assistants?: Assistant[];
}
