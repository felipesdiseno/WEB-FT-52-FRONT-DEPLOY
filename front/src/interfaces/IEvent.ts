export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  price: number;
  stock: number;
  eventAddress?: string;
  images?: string[];
  key?: string;
}
