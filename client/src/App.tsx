import { useState, useMemo } from 'react';
import {
  Box, Grid, Typography, BottomNavigation, BottomNavigationAction,
  Paper, List, ListItemButton, ListItemIcon, ListItemText, Stack
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';

import { MOCK_TRACKS } from './data/mockSpotifyData';
import type { FilterState } from './types/dashboard';
import { FilterBar } from './components/filters/FilterBar';
import { KpiCard } from './components/kpis/KpiCard';
import { ChartCard } from './components/charts/ChartCard';
import { TopTracksChart } from './components/charts/TopTracksChart';
import { PopularGenresChart } from './components/charts/PopularGenresChart';
import { TopArtistsChart } from './components/charts/TopArtistsChart';
import { TracksDataTable } from './components/table/TracksDataTable';

export function App() {
  const [filters, setFilters] = useState<FilterState>({ genre: 'Todos', year: 'Todos' });
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredTracks = useMemo(() => {
    return MOCK_TRACKS.filter((t) => {
      const matchGenre = filters.genre === 'Todos' || t.primaryGenre === filters.genre;
      const matchYear = filters.year === 'Todos' || t.releaseDate.startsWith(filters.year);
      return matchGenre && matchYear;
    });
  }, [filters]);

  const avgPopularity = filteredTracks.length
    ? (filteredTracks.reduce((acc, t) => acc + t.popularity, 0) / filteredTracks.length).toFixed(1)
    : '0';
  const totalStreamsM = (
    filteredTracks.reduce((acc, t) => acc + t.streams, 0) / 1_000_000
  ).toFixed(1);

  const sectionTitles = [
    'Análisis de Tendencias Musicales',
    'Distribución por Géneros Musicales',
    'Ranking de Artistas Destacados',
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#121224', color: '#fff', pb: { xs: 8, md: 0 } }}>
      {/* Menú Lateral (Escritorio) */}
      <Box
        sx={{
          width: 230,
          flexShrink: 0,
          bgcolor: '#18182f',
          p: 2,
          display: { xs: 'none', md: 'block' },
          borderRight: '1px solid #2a2a4a',
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#1db954', mb: 3 }}>
          Spotify Analytics
        </Typography>
        <List>
          {['Resumen', 'Géneros', 'Artistas'].map((label, idx) => (
            <ListItemButton
              key={label}
              selected={activeTab === idx}
              onClick={() => setActiveTab(idx)}
              sx={{
                borderRadius: 2,
                mb: 1,
                '&.Mui-selected': { bgcolor: '#26264a', color: '#1db954' },
              }}
            >
              <ListItemIcon sx={{ color: activeTab === idx ? '#1db954' : '#fff', minWidth: 36 }}>
                {idx === 0 ? <DashboardIcon /> : idx === 1 ? <CategoryIcon /> : <PersonIcon />}
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Contenido Principal */}
      <Box sx={{ flexGrow: 1, minWidth: 0, width: '100%', p: { xs: 1.5, md: 4 } }}>
        {/* Encabezado dinámico según la pestaña + 2 Filtros */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold">
            {sectionTitles[activeTab]}
          </Typography>
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        </Stack>

        {/* Tarjetas KPI (3 en fila tanto en móvil como en escritorio) */}
        {activeTab === 0 && (
          <Grid container spacing={{ xs: 1, sm: 2.5 }} mb={3}>
            <Grid item xs={4}>
              <KpiCard
                title="Total de Canciones"
                value={filteredTracks.length}
                deltaText="↑ +2.3% vs. año ant."
                icon={<MusicNoteIcon />}
                gradient="linear-gradient(135deg, #2d1b69 0%, #4c2a85 100%)"
              />
            </Grid>
            <Grid item xs={4}>
              <KpiCard
                title="Popularidad Promedio"
                value={`${avgPopularity} / 100`}
                deltaText="↑ +1.1% vs. año ant."
                icon={<StarIcon />}
                gradient="linear-gradient(135deg, #5c164e 0%, #9b2265 100%)"
              />
            </Grid>
            <Grid item xs={4}>
              <KpiCard
                title="Reproducciones Totales"
                value={`${totalStreamsM}M`}
                deltaText="↑ +4.7% vs. año ant."
                icon={<PlayArrowIcon />}
                gradient="linear-gradient(135deg, #114b5f 0%, #1a936f 100%)"
              />
            </Grid>
          </Grid>
        )}

        {/* Gráficos según la pestaña activa */}
        {activeTab === 0 && (
          <Grid container spacing={2.5} mb={3}>
            <Grid item xs={12} md={6}>
              <ChartCard title="Artistas destacados">
                <TopArtistsChart tracks={filteredTracks} />
              </ChartCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <ChartCard title="Géneros musicales más populares">
                <PopularGenresChart tracks={filteredTracks} />
              </ChartCard>
            </Grid>
            <Grid item xs={12}>
              <ChartCard title="Canciones más reproducidas en Spotify">
                <TopTracksChart tracks={filteredTracks} />
              </ChartCard>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Box mb={3}>
            <ChartCard title="Géneros musicales más populares">
              <PopularGenresChart tracks={filteredTracks} />
            </ChartCard>
          </Box>
        )}

        {activeTab === 2 && (
          <Box mb={3}>
            <ChartCard title="Artistas destacados">
              <TopArtistsChart tracks={filteredTracks} />
            </ChartCard>
          </Box>
        )}

        {/* Tabla de Registros */}
        <TracksDataTable tracks={filteredTracks} />
      </Box>

      {/* Navegación Inferior (Móvil) */}
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', md: 'none' }, zIndex: 10 }}
        elevation={6}
      >
        <BottomNavigation
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ bgcolor: '#18182f', '& .MuiBottomNavigationAction-root': { color: '#b3b3cc' }, '& .Mui-selected': { color: '#1db954' } }}
        >
          <BottomNavigationAction label="Resumen" icon={<DashboardIcon />} />
          <BottomNavigationAction label="Géneros" icon={<CategoryIcon />} />
          <BottomNavigationAction label="Artistas" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default App;