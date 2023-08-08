import { Request } from "@prisma/client";
import { ICreateRequests } from "../models/ICreateRequest";

export default interface TeamsRepository {
  create: (data: ICreateRequests) => Promise<Request>;
}
