export interface IUpdateRequest {
  requestId: number;
  data: {
    subjects: string;
    status: string;
  }
}
