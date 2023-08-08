export interface RequestsCreateData {
  subject: 'Problemas com cartão' | 'Contratação de Empréstimo' | 'Outro Assunto';
  clientId: number;
}

export default interface RequestssRepository {
  create: (data: RequestsCreateData) => Promise<void>;
}
