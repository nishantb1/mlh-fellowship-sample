import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { format, parseISO } from 'date-fns';

const EditEventForm = ({ event, onSave, onCancel }) => {
  const [eventName, setEventName] = useState(event.event_name);
  const [startTime, setStartTime] = useState(event ? format(parseISO(event.start_time), 'yyyy-MM-dd\'T\'HH:mm') : '');
  const [endTime, setEndTime] = useState(event ? format(parseISO(event.end_time), 'yyyy-MM-dd\'T\'HH:mm') : '');

  const handleUpdateEvent = async () => {
    try {
      const response = await fetch(`/events/reschedule/${event.event_id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_name: eventName,
          start_time: startTime,
          end_time: endTime
        })
      });
      const data = await response.json();
      alert(data.message);
      onSave();
    } catch (error) {
      console.error('Failed to update event:', error);
      // alert('Failed to update event');
    }
  };

  return (
    <Box>
      <TextField
        label="Event Name"
        variant='outlined'
        fullWidth
        margin='normal'
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <TextField
        label="Start Time"
        type='datetime-local'
        variant='outlined'
        fullWidth
        margin='normal'
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <TextField
        label='End Time'
        type='datetime-local'
        variant='outlined'
        fullWidth
        margin='normal'
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={handleUpdateEvent}
      >
        Save
      </Button>
      <Button
        variant='outlined'
        onClick={onCancel}
      >
        Cancel
      </Button>
    </Box>
  );
    
};

export default EditEventForm;