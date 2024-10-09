export interface PaymentParams {
  creator: string;
  title: string;
  amount: number;
}
export interface Donation {
  id: number;
  title: string;
  amount: number;
  date: string;
}
export interface PaymentResponse {
  ok: boolean;
  donation: Donation;
}
