export interface EventCardProps {
  id: string;
  key: string;
  highlight: boolean;
  createDate: Date;
  status: string;
  title: string;
  eventDate: Date;
  eventLocation: string;
  eventAddress: string;
  price?: number;
  stock: number;
  images: string;
  event?: [];
}
