import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import type { ReactNode } from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  deltaText: string;
  icon: ReactNode;
  gradient: string;
}

export function KpiCard({ title, value, deltaText, icon, gradient }: KpiCardProps) {
  return (
    <Card sx={{ background: gradient, color: '#fff', borderRadius: { xs: 2, md: 3 }, height: '100%' }}>
      <CardContent sx={{ p: { xs: 1.2, sm: 2.5 }, '&:last-child': { pb: { xs: 1.2, sm: 2.5 } } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 0.8, sm: 2 }}
          alignItems="center"
          textAlign={{ xs: 'center', sm: 'left' }}
        >
          <Box
            sx={{
              p: { xs: 0.8, sm: 1.5 },
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              '& svg': { fontSize: { xs: '1.1rem', sm: '1.5rem' } },
            }}
          >
            {icon}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{ opacity: 0.85, fontSize: { xs: '0.68rem', sm: '0.875rem' }, lineHeight: 1.2 }}
            >
              {title}
            </Typography>
            <Typography
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.05rem', sm: '1.85rem' }, my: 0.3, lineHeight: 1.15 }}
            >
              {value}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: '#69f0ae', fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.75rem' }, display: 'block', lineHeight: 1.1 }}
            >
              {deltaText}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}