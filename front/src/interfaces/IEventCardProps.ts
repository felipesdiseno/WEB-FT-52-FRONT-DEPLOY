export interface EventCardProps {
  id: string;
  highlight: boolean;
  createDate: Date;
  status: string;
  title: string;
  description: string;
  eventDate: Date;
  eventLocation: string;
  eventAddress: string;
  price: number;
  stock: number;
  images: string;
  isActive?: boolean;
  event: [];
}
