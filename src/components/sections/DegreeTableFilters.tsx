import React from 'react'
import { TextField, Box, Autocomplete } from '@mui/material';

interface DegreeTableFiltersProps {
    filters: {
        university: string;
        course: string;
        majorField: string;
        type: string;
    };
    onChange: (filters: DegreeTableFiltersProps['filters']) => void;
    universityOptions: string[];
    majorFieldOptions: string[];
    typeOptions: string[];
}

export const DegreeTableFilters: React.FC<DegreeTableFiltersProps> = ({
    filters,
    onChange,
    universityOptions,
    majorFieldOptions,
    typeOptions,
}) => {
    return (
        <Box display="flex" gap={2} mb={2}>
            <Autocomplete
                freeSolo
                options={universityOptions}
                value={filters.university}
                onInputChange={(_, value) => onChange({ ...filters, university: value })}
                renderInput={(params) => (
                    <TextField {...params} label="University Name" size="small" />
                )}
                sx={{ minWidth: 220 }}
            />
            <TextField
                label="Course Name"
                value={filters.course}
                onChange={e => onChange({ ...filters, course: e.target.value })}
                size="small"
            />
            <Autocomplete
                freeSolo
                options={majorFieldOptions}
                value={filters.majorField}
                onInputChange={(_, value) => onChange({ ...filters, majorField: value })}
                renderInput={(params) => (
                    <TextField {...params} label="Major Field" size="small" />
                )}
                sx={{ minWidth: 180 }}
            />
            <Autocomplete
                freeSolo
                options={typeOptions}
                value={filters.type}
                onInputChange={(_, value) => onChange({ ...filters, type: value })}
                renderInput={(params) => (
                    <TextField {...params} label="Type" size="small" />
                )}
                sx={{ minWidth: 120 }}
            />
        </Box>
    )
}