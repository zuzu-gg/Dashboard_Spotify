import { Stack } from '@mui/material';
import type { FilterState } from '../../types/dashboard';
import { SelectFilter } from './SelectFilter';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ width: { xs: '100%', md: 'auto' } }}>
      <SelectFilter
        label="Género Musical"
        value={filters.genre}
        options={[
          { label: 'Todos los géneros', value: 'Todos' },
          { label: 'Pop', value: 'Pop' },
          { label: 'Hip-Hop', value: 'Hip-Hop' },
          { label: 'Música Latina', value: 'Música Latina' },
          { label: 'Rock', value: 'Rock' },
        ]}
        onChange={(val) => onFilterChange('genre', val)}
      />
      <SelectFilter
        label="Año"
        value={filters.year}
        options={[
          { label: 'Todos los años', value: 'Todos' },
          { label: '2022', value: '2022' },
          { label: '2020', value: '2020' },
          { label: '2017', value: '2017' },
          { label: '2016', value: '2016' },
          { label: '2013', value: '2013' },
        ]}
        onChange={(val) => onFilterChange('year', val)}
      />
    </Stack>
  );
}