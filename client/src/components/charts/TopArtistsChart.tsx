import { Box, Typography, Stack } from '@mui/material';
import type { Track } from '../../types/dashboard';

interface TopArtistsChartProps {
  tracks: Track[];
}

const ARTIST_COLORS = ['#3b82f6', '#a78bfa', '#f59e0b', '#fde047', '#f87171', '#ec4899', '#4dd0e1'];

export function TopArtistsChart({ tracks }: TopArtistsChartProps) {
  // Agrupar por artista tomando su máxima popularidad
  const artistMap = new Map<string, number>();
  tracks.forEach((t) => {
    const prev = artistMap.get(t.artist) ?? 0;
    if (t.popularity > prev) artistMap.set(t.artist, t.popularity);
  });

  const artists = Array.from(artistMap.entries())
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 7);

  return (
    <Box sx={{ pt: 0.5 }}>
      <Stack spacing={1.2}>
        {artists.map((artist, idx) => (
          <Stack key={artist.name} direction="row" alignItems="center" spacing={1.5}>
            <Typography
              variant="caption"
              align="right"
              sx={{ width: 95, color: '#e2e8f0', fontSize: '0.78rem', flexShrink: 0 }}
            >
              {artist.name}
            </Typography>
            <Box sx={{ flexGrow: 1, bgcolor: '#262645', borderRadius: '0 6px 6px 0', height: 20, overflow: 'hidden' }}>
              <Box
                sx={{
                  width: `${artist.score}%`,
                  height: '100%',
                  bgcolor: ARTIST_COLORS[idx % ARTIST_COLORS.length],
                  borderRadius: '0 6px 6px 0',
                  transition: 'width 0.35s ease',
                }}
              />
            </Box>
          </Stack>
        ))}
      </Stack>

      {/* Eje numérico 0 - 100 */}
      <Stack direction="row" justifyContent="space-between" sx={{ pl: '108px', pt: 1, color: '#94a3b8' }}>
        {[0, 20, 40, 60, 80, 100].map((tick) => (
          <Typography key={tick} variant="caption" sx={{ fontSize: '0.7rem' }}>
            {tick}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}