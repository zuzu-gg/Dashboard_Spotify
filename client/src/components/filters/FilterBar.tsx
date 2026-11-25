import { useMemo } from 'react';
import { Stack } from '@mui/material';
import type { FilterState, Track } from '../../types/dashboard';
import { SelectFilter } from './SelectFilter';

interface FilterBarProps {
  tracks: Track[];
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

export function FilterBar({ tracks, filters, onFilterChange }: FilterBarProps) {
  const genreOptions = useMemo(() => {
    const uniqueGenres = new Set<string>();
    tracks.forEach((t) => {
      if (t.primaryGenre && t.primaryGenre.trim()) {
        uniqueGenres.add(t.primaryGenre.trim());
      }
    });

    const sorted = Array.from(uniqueGenres)
      .sort((a, b) => a.localeCompare(b))
      .map((g) => ({
        label: g.charAt(0).toUpperCase() + g.slice(1),
        value: g,
      }));

    return [{ label: 'Todos los géneros', value: 'Todos' }, ...sorted];
  }, [tracks]);

  const yearOptions = useMemo(() => {
    const uniqueYears = new Set<string>();
    tracks.forEach((t) => {
      if (t.releaseDate && t.releaseDate.length >= 4) {
        const year = t.releaseDate.slice(0, 4);
        if (/^\d{4}$/.test(year)) {
          uniqueYears.add(year);
        }
      }
    });

    const sorted = Array.from(uniqueYears)
      .sort((a, b) => b.localeCompare(a))
      .map((y) => ({ label: y, value: y }));

    return [{ label: 'Todos los años', value: 'Todos' }, ...sorted];
  }, [tracks]);

  return (
    <Stack direction="row" spacing={1.5} sx={{ width: { xs: '100%', md: 'auto' } }}>
      <SelectFilter
        label="Género Musical"
        value={filters.genre}
        options={genreOptions}
        onChange={(val) => onFilterChange('genre', val)}
      />
      <SelectFilter
        label="Año"
        value={filters.year}
        options={yearOptions}
        onChange={(val) => onFilterChange('year', val)}
      />
    </Stack>
  );
}