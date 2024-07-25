import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { format, parseISO } from 'date-fns';

const EventList = ({ events, onEventClick }) => {
  return (
    <List>
      {events.map((event, index) => (
        <ListItemButton key={index} onClick={() => onEventClick(event)}>
          <ListItemText
            primary={`${event.event_name} ${format(parseISO(event.start_time), 'MMMM d, yyyy, p')} - ${format(parseISO(event.end_time), 'p')}`}
            secondary={event.event_description}
          />
        </ListItemButton>
      ))}
    </List>
  );
};

export default EventList;
