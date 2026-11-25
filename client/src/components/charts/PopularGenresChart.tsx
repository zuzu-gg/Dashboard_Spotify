import { Box, Stack, Typography } from '@mui/material';
import type { Track } from '../../types/dashboard';

interface PopularGenresChartProps {
  tracks: Track[];
}

const COLORS = ['#3b82f6', '#a78bfa', '#f59e0b', '#fde047', '#f87171'];

function formatGenreLabel(raw: string): string {
  if (!raw) return 'Otro';
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export function PopularGenresChart({ tracks }: PopularGenresChartProps) {
  // Agrupar dinámicamente todos los géneros reales del dataset
  const genreMap = new Map<string, number>();
  tracks.forEach((t) => {
    const key = formatGenreLabel(t.primaryGenre?.trim() || 'Otro');
    genreMap.set(key, (genreMap.get(key) || 0) + 1);
  });

  // Tomar los 5 géneros más frecuentes
  const topGenres = Array.from(genreMap.entries())
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((item, idx) => ({ ...item, color: COLORS[idx % COLORS.length] }));

  const totalTop = topGenres.reduce((acc, item) => acc + item.count, 0) || 1;
  const totalAll = tracks.length || 1;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  let cumulativePercent = 0;

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
          {topGenres.map((slice) => {
            const slicePercent = slice.count / totalTop;
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

      {/* Leyenda lateral con los Top 5 géneros reales */}
      <Stack spacing={{ xs: 0.9, sm: 1.2 }}>
        {topGenres.map((item) => {
          const pct = tracks.length ? ((item.count / totalAll) * 100).toFixed(1) : '0.0';
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