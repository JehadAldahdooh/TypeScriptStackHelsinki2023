import React from 'react';
import { HealthCheckEntry, HealthCheckRating } from '../../types';
import BaseEntryComponent from './BaseEntry';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Typography } from '@mui/material';

const HealthCheckEntryComponent: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

  const getRatingColor = (rating: HealthCheckRating): string => {
    const ratingColors = ["green", "yellow", "orange", "red"];
    return ratingColors[rating] || "black";
  };

  return (
    <Box
      sx={{
        border: '1px solid orangered',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        position: 'relative'
      }}
    >
      <Typography variant="body2" sx={{ marginRight: '8px' }}>
        {entry.date}
      </Typography>

      <MedicalServicesIcon
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px'
        }}
      />
      <BaseEntryComponent entry={entry} showDate={false} />
      <Typography variant="body2">
        Health Check Rating:
        <FavoriteIcon
          sx={{
            fontSize: '18px',
            color: getRatingColor(entry.healthCheckRating),
            verticalAlign: 'text-bottom'
          }}
        />
      </Typography>
    </Box>
  );
};

export default HealthCheckEntryComponent;


