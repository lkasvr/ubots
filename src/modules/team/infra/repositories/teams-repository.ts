export interface TeamsCreateData {
  name: string;
}

export default interface TeamssRepository {
  create: (data: TeamsCreateData) => Promise<void>;
}
