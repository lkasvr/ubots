type requestId = { id: number };

export interface ICreateClient {
  name: string;
  email: string;
  requestsIds?: [requestId, requestId, requestId];
}
