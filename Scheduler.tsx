'use client';
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { parseISO, isWithinInterval, isAfter, isBefore, } from 'date-fns';
import EventList from './EventList';
import DatePickerComponent from './DatePickerComponent';
import EventDetailsDrawer from './EventDetailsDrawer';

const Scheduler = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsData, setEventsData] = useState({
    upcoming: [],
    pending: [],
    past: [],
    search: []
  });


  const fetchEvents = async () => {
    try {
      const response = await fetch('/test.json');
      const data = await response.json();
      const now = new Date();
      setEventsData({
        upcoming: data.events.filter(e => isAfter(parseISO(e.start_time), now)),
        pending: data.events.filter(e => isWithinInterval(now, {
          start: parseISO(e.start_time),
          end: parseISO(e.end_time)
        })),
        past: data.events.filter(e => isBefore(parseISO(e.end_time), now)),
        search: data.events
      });
    } catch (error) {
      console.error('Error fetching events: ', error);
    }
  };
  
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue !== 'search') {
      setFilteredEvents([]);
    }
  };

  const handleDateChange = (start, end) => {
    console.log('Start Date:', start);
    console.log('End Date:', end);

    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      const filtered = eventsData[selectedTab].filter((event) =>
        isWithinInterval(parseISO(event.start_time), { start, end })
      ) || [];
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents([]);
    }
  };

  const handleListItemClick = (event) => {
    setSelectedEvent(event);
    setSidebarOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Upcoming" value="upcoming" />
          <Tab label="Pending" value="pending" />
          <Tab label="Past" value="past" />
          <Tab label="Search" value="search" />
        </Tabs>
        {selectedTab === 'search' ? (
          <div>
            <DatePickerComponent
              startDate={startDate}
              endDate={endDate}
              onDateChange={handleDateChange}
            />
            <EventList
              events={filteredEvents}
              onEventClick={handleListItemClick}
            />
          </div>
        ) : (
          <EventList
            events={eventsData[selectedTab]}
            onEventClick={handleListItemClick}
          />
        )}
        <EventDetailsDrawer
          event={selectedEvent}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          fetchEvents ={fetchEvents}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default Scheduler;
