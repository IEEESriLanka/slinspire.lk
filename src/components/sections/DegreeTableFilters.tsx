import React from 'react'
import { TextField, Box } from '@mui/material';

interface DegreeTableFiltersProps {
    filters: {
        university: string;
        course: string;
        // Add more filter fields as needed
    };
    onChange: (filters: DegreeTableFiltersProps['filters']) => void;
}

export const DegreeTableFilters: React.FC<DegreeTableFiltersProps> = ({ filters, onChange }) => {
    return (
        <Box display="flex" gap={2} mb={2}>
            <TextField
                label="University Name"
                value={filters.university}
                onChange={e => onChange({ ...filters, university: e.target.value })}
                size="small"
            />
            <TextField
                label="Course Name"
                value={filters.course}
                onChange={e => onChange({ ...filters, course: e.target.value })}
                size="small"
            />
            {/* Add more filters as needed */}
        </Box>
    )
}
