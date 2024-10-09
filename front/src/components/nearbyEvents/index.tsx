import React from 'react';
import EventCard from '../events/eventCard';
import { EventCardProps } from '@/interfaces/IEventCardProps';
interface Props {
  events: EventCardProps[];
}

function NearbyEvents({ events }: Props) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {events?.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          createDate={event.createDate}
          eventDate={event.eventDate}
          eventLocation={event.eventLocation}
          eventAddress={event.eventAddress}
          price={event.price}
          stock={event.stock}
          images={
            event.images && event.images.length > 0
              ? event.images[0]
              : '/path/to/placeholder-image.jpg'
          }
          status={event.status}
          highlight={event.highlight}
        />
      ))}
    </div>
  );
}

export default NearbyEvents;
