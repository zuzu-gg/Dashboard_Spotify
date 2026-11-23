import { Box, Typography, Stack } from '@mui/material';
import type { Track } from '../../types/dashboard';

interface TopTracksChartProps {
  tracks: Track[];
}

const BAR_COLORS = [
  '#4dd0e1', '#29b6f6', '#1e88e5', '#ffd54f', '#ff9800',
  '#ad1457', '#ef5350', '#66bb6a', '#5c6bc0', '#ec407a',
];

export function TopTracksChart({ tracks }: TopTracksChartProps) {
  const topList = [...tracks].sort((a, b) => b.streams - a.streams).slice(0, 8);
  const maxStreams = Math.max(...topList.map((t) => t.streams), 6_000_000);

  return (
    <Box sx={{ pt: 1 }}>
      {/* Área de barras verticales */}
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-around"
        spacing={1}
        sx={{
          height: 210,
          borderBottom: '1px solid #35355c',
          px: 1,
          pb: 0.5,
        }}
      >
        {topList.map((track, idx) => {
          const heightPct = Math.max((track.streams / maxStreams) * 100, 12);
          const color = BAR_COLORS[idx % BAR_COLORS.length];
          return (
            <Box
              key={track.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                maxWidth: 44,
                height: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: '0.65rem', color: '#d1d1e0', mb: 0.5, fontWeight: 600 }}
              >
                {(track.streams / 1_000_000).toFixed(2)}M
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: `${heightPct}%`,
                  bgcolor: color,
                  borderRadius: '6px 6px 0 0',
                  transition: 'height 0.35s ease',
                }}
              />
            </Box>
          );
        })}
      </Stack>

      {/* Etiquetas de canciones en el eje X */}
      <Stack direction="row" justifyContent="space-around" spacing={1} sx={{ px: 1, pt: 1 }}>
        {topList.map((track) => (
          <Typography
            key={track.id}
            variant="caption"
            align="center"
            sx={{
              flex: 1,
              maxWidth: 48,
              fontSize: '0.65rem',
              color: '#b3b3cc',
              lineHeight: 1.15,
              wordBreak: 'break-word',
            }}
          >
            {track.name}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}