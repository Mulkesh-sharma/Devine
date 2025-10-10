// app/components/ServiceCard.tsx
'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import type { Service } from '../../lib/types';

type Props = {
  service: Service;
  onBook: (s: Service) => void;
};

export default function ServiceCard({ service, onBook }: Props) {
  return (
    <Card className="max-w-sm mb-4">
      {service.image && (
        <CardMedia component="img" height="160" image={service.image} alt={service.title} />
      )}
      <CardContent className="p-4">
        <Typography variant="h6">{service.title}</Typography>
        <Typography variant="body2" color="text.secondary" className="mb-3">
          {service.description}
        </Typography>
        <Box className="flex items-center justify-between">
          <Typography variant="subtitle1">₹{service.priceINR}</Typography>
          <Button variant="contained" onClick={() => onBook(service)}>
            Book
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
