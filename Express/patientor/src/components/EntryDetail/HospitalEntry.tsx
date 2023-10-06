import React from 'react';
import { HospitalEntry } from '../../types';
import BaseEntryComponent from './BaseEntry';
import { Box, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntryComponent: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Box
      sx={{
        border: '1px solid lightcoral',
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
        <LocalHospitalIcon
          sx={{
            marginRight: '8px',
            color: 'lightcoral'
          }}
        />
      </Box>

      <BaseEntryComponent entry={entry} showDate={false} />

      <Typography variant="body2" gutterBottom>
        Discharge Date: {entry.discharge.date}
      </Typography>
      <Typography variant="body2">
        Discharge Criteria: {entry.discharge.criteria}
      </Typography>
    </Box>
  );
};

export default HospitalEntryComponent;