// src/components/filters/SelectFilter.tsx
import { FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from '@mui/material';

interface SelectFilterProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (newValue: string) => void;
}

export function SelectFilter({ label, value, options, onChange }: SelectFilterProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ flex: 1, minWidth: 0, bgcolor: '#1e1e36', borderRadius: 1 }}>
      <InputLabel sx={{ color: '#b3b3cc', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={handleChange}
        sx={{
          color: '#fff',
          fontSize: { xs: '0.8rem', sm: '0.9rem' },
          '.MuiOutlinedInput-notchedOutline': { borderColor: '#3a3a5e' },
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}