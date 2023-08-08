export interface ICreateRequest {
  subject: string;
  status: string;
  clientId: number;
  teamId: number;
  assistantId?: number;
}
