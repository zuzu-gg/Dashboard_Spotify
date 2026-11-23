// src/components/charts/ChartCard.tsx
import { Paper, Typography, Box } from '@mui/material';
import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <Paper sx={{ p: 2.5, bgcolor: '#1b1b32', color: '#fff', borderRadius: 3, height: '100%' }}>
      <Typography variant="subtitle1" fontWeight="bold" mb={2}>
        {title}
      </Typography>
      <Box>{children}</Box>
    </Paper>
  );
}