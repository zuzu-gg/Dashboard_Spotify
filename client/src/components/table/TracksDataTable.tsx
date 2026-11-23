import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Chip
} from '@mui/material';
import type { Track } from '../../types/dashboard';

interface TracksDataTableProps {
  tracks: Track[];
}

export function TracksDataTable({ tracks }: TracksDataTableProps) {
  return (
    <Paper sx={{ p: 2.5, bgcolor: '#1b1b32', color: '#fff', borderRadius: 3 }}>
      <Typography variant="subtitle1" fontWeight="bold" mb={2}>
        Detalle de Canciones
      </Typography>
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#b3b3cc', fontWeight: 'bold' }}>Canción</TableCell>
              <TableCell sx={{ color: '#b3b3cc', fontWeight: 'bold' }}>Artista</TableCell>
              <TableCell sx={{ color: '#b3b3cc', fontWeight: 'bold' }}>Género</TableCell>
              <TableCell sx={{ color: '#b3b3cc', fontWeight: 'bold' }} align="right">Popularidad</TableCell>
              <TableCell sx={{ color: '#b3b3cc', fontWeight: 'bold' }} align="right">Reproducciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks.map((track) => (
              <TableRow key={track.id} hover>
                <TableCell sx={{ color: '#fff' }}>{track.name}</TableCell>
                <TableCell sx={{ color: '#d1d1e0' }}>{track.artist}</TableCell>
                <TableCell>
                  <Chip label={track.primaryGenre} size="small" sx={{ bgcolor: '#2e2e52', color: '#fff' }} />
                </TableCell>
                <TableCell sx={{ color: '#fff' }} align="right">{track.popularity}/100</TableCell>
                <TableCell sx={{ color: '#69f0ae' }} align="right">
                  {(track.streams / 1_000_000).toFixed(2)}M
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}