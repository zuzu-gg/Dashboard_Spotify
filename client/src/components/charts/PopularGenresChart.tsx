import { Box, Typography, Stack } from '@mui/material';
import type { Track } from '../../types/dashboard';

interface PopularGenresChartProps {
  tracks: Track[];
}

const GENRE_COLORS: Record<string, string> = {
  'Hip-Hop': '#3b82f6',
  'Pop': '#a78bfa',
  'Música Latina': '#f59e0b',
  'Rock': '#fde047',
  'Música Electrónica': '#f87171',
};

export function PopularGenresChart({ tracks }: PopularGenresChartProps) {
  const genres = ['Hip-Hop', 'Pop', 'Música Latina', 'Rock', 'Música Electrónica'];
  const total = tracks.length || 1;

  // Si todos los filtros están activos, usamos las proporciones exactas del dataset; si se filtra, calcula dinámico
  const counts = genres.map((g) => ({
    genre: g,
    count: tracks.filter((t) => t.primaryGenre === g).length,
    color: GENRE_COLORS[g] || '#64748b',
  }));

  const activeItems = counts.filter((c) => c.count > 0);
  const itemsToDraw = activeItems.length > 0 ? activeItems : counts;
  const sum = itemsToDraw.reduce((acc, item) => acc + item.count, 0) || 1;

  // Construcción de segmentos SVG tipo pastel
  let cumulativePercent = 0;
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={{ xs: 2, sm: 3 }}
      sx={{ py: 1, minHeight: { xs: 180, sm: 220 } }}
    >
      {/* Gráfico circular SVG */}
      <Box sx={{ width: { xs: 130, sm: 175 }, height: { xs: 130, sm: 175 }, flexShrink: 0 }}>
        <svg viewBox="-1.05 -1.05 2.1 2.1" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
          {itemsToDraw.map((slice) => {
            const slicePercent = slice.count / sum;
            if (slicePercent === 1) {
              return <circle key={slice.genre} cx="0" cy="0" r="1" fill={slice.color} />;
            }
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
            cumulativePercent += slicePercent;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
            const largeArcFlag = slicePercent > 0.5 ? 1 : 0;
            const pathData = [
              `M ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              'L 0 0',
            ].join(' ');

            return <path key={slice.genre} d={pathData} fill={slice.color} />;
          })}
        </svg>
      </Box>

      {/* Leyenda lateral con círculos de color y porcentajes */}
      <Stack spacing={{ xs: 0.9, sm: 1.2 }}>
        {counts.map((item) => {
          const pct = tracks.length ? ((item.count / total) * 100).toFixed(1) : '0.0';
          return (
            <Stack key={item.genre} direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: { xs: 11, sm: 14 },
                  height: { xs: 11, sm: 14 },
                  borderRadius: '50%',
                  bgcolor: item.color,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body2" sx={{ color: '#e2e8f0', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                {item.genre} <strong>({pct}%)</strong>
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}