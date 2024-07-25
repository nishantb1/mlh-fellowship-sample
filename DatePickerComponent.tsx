import React from 'react';
import { Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const DatePickerComponent = ({ startDate, endDate, onDateChange }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography>Select a Date Range</Typography>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={(newValue) => onDateChange(newValue, endDate)}
        slotProps={{ textField: { variant: 'outlined' } }}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={(newValue) => onDateChange(startDate, newValue)}
        slotProps={{ textField: { variant: 'outlined' } }}
      />
    </Box>
  );
};

export default DatePickerComponent;
