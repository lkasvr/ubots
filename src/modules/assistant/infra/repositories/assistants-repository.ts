export interface AssistantsCreateData {
  name: string;
  teamId: number;
  requestsIds?: number[];
}

export default interface AssistantssRepository {
  create: (data: AssistantsCreateData) => Promise<void>;
}
