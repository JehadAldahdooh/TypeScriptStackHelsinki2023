import React from 'react';
import { OccupationalHealthcareEntry } from '../../types';
import BaseEntryComponent from './BaseEntry';
import { Box, Typography } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const OccupationalHealthcareEntryComponent: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Box
      sx={{
        border: '1px solid lightblue',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        <Typography variant="body2" sx={{ marginRight: '8px' }}>
          {entry.date}
        </Typography>
        <WorkOutlineIcon
          sx={{
            marginRight: '8px',
            color: 'steelblue'
          }}
        />
        <Typography variant="h6">
          {entry.employerName}
        </Typography>
      </Box>

      <BaseEntryComponent entry={entry} showDate={false} />

      {entry.sickLeave && (
        <>
          <Typography variant="body2" gutterBottom>
            Sick Leave Start Date: {entry.sickLeave.startDate}
          </Typography>
          <Typography variant="body2">
            Sick Leave End Date: {entry.sickLeave.endDate}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default OccupationalHealthcareEntryComponent;
