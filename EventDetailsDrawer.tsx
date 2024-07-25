import { Drawer, Box, Typography, Button } from '@mui/material';

import { format, parseISO } from 'date-fns';
import React, { useState } from 'react';
import EditEventForm from './EditEventForm';

const EventDetailsDrawer = ({ event, open, onClose, fetchEvents }) => {
  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    setEditMode(false);
    onClose();
    fetchEvents();
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleDelete = async () => {
    if(window.confirm('Are you sure you want to delete this event?')){
      try{
        const response = await fetch(`/events/delete/${event.event_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        alert(data.message);
        onClose();
        fetchEvents();
      } catch (error) {
        console.error('Failed to delete event:', error);
        alert('Failed to delete event');
      }
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => { onClose(); setEditMode(false); }}>
      <Box p={2} width="250px" role="presentation">
        {!editMode ? (
          <>
            <Typography variant="h6">Event Details</Typography>
            <Typography variant="body1">Name: {event?.event_name ?? 'Not available'}</Typography>
            <Typography variant="body1">Description: {event?.event_description ?? 'No description'}</Typography>
            <Typography variant="body1">Start: {event?.start_time ? format(parseISO(event.start_time), 'MMMM d, yyyy, p') : 'Start time not available'}</Typography>
            <Typography variant="body1">End: {event?.end_time ? format(parseISO(event.end_time), 'MMMM d, yyyy, p') : 'End time not available'}</Typography>
            <Button onClick={() => setEditMode(true)}>Edit</Button>
            <Button color='error' onClick={handleDelete}>Delete</Button>
          </>
        ) : (
          <EditEventForm event={event} onSave={handleSave} onCancel={handleCancel} />
        )}
      </Box>
    </Drawer>
  );
};


export default EventDetailsDrawer;
