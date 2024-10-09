export interface PaymentParams {
  creator: string;
  title: string;
  amount: number;
}

export interface PaymentResponse {
  ok: boolean;
  donation: unknown;
}
