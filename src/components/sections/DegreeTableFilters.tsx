import React from 'react'
import { TextField, Box, Autocomplete } from '@mui/material';

interface DegreeTableFiltersProps {
    filters: {
        university: string;
        course: string;
        majorField: string;
        subField: string; // Updated
        type: string;
    };
    onChange: (filters: DegreeTableFiltersProps['filters']) => void;
    universityOptions: string[];
    majorFieldOptions: string[];
    subFieldOptions: string[]; // Added
    typeOptions: string[];
}

const commonSx = {
    minWidth: { xs: '100%', sm: 180 },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#a78bfa' },
        '&:hover fieldset': { borderColor: '#8b5cf6' },
        '&.Mui-focused fieldset': { borderColor: '#6D28D9' },
    },
};

const inputPropsDefault = {
    style: {
        background: 'linear-gradient(to right, #ede9fe, #e0e7ff)',
        borderRadius: 8,
        fontWeight: 400,
    },
};

const inputLabelPropsDefault = {
    style: {
        color: '#6D28D9',
        fontWeight: 400,
    },
};

export const DegreeTableFilters: React.FC<DegreeTableFiltersProps> = ({
    filters,
    onChange,
    universityOptions,
    majorFieldOptions,
    subFieldOptions,
    typeOptions,
}) => {
    return (
        <Box
            display="flex"
            flexDirection={{ xs: 'column', lg: 'row' }}
            gap={2}
            mb={4}
            alignItems={{ xs: 'stretch', lg: 'center' }}
        >
            <Autocomplete
                freeSolo
                options={universityOptions}
                value={filters.university}
                onInputChange={(_, value) => onChange({ ...filters, university: value })}
                renderInput={(params) => (
                    <TextField {...params} label="University Name" size="small" variant="outlined" 
                        InputProps={{ ...params.InputProps, ...inputPropsDefault }} 
                        InputLabelProps={inputLabelPropsDefault} 
                    />
                )}
                sx={{ ...commonSx, minWidth: { xs: '100%', sm: 220 } }}
            />

            <TextField
                label="Course Name"
                value={filters.course}
                onChange={e => onChange({ ...filters, course: e.target.value })}
                size="small"
                variant="outlined"
                InputProps={inputPropsDefault}
                InputLabelProps={inputLabelPropsDefault}
                sx={commonSx}
            />

            <Autocomplete
                freeSolo
                options={majorFieldOptions}
                value={filters.majorField}
                onInputChange={(_, value) => onChange({ ...filters, majorField: value })}
                renderInput={(params) => (
                    <TextField {...params} label="Major Field" size="small" variant="outlined" 
                        InputProps={{ ...params.InputProps, ...inputPropsDefault }} 
                        InputLabelProps={inputLabelPropsDefault} 
                    />
                )}
                sx={commonSx}
            />

            {/* NEW: Sub Field Dropdown */}
            <Autocomplete
                freeSolo
                options={subFieldOptions}
                value={filters.subField}
                onInputChange={(_, value) => onChange({ ...filters, subField: value })}
                renderInput={(params) => (
                    <TextField {...params} label="Sub Field" size="small" variant="outlined" 
                        InputProps={{ ...params.InputProps, ...inputPropsDefault }} 
                        InputLabelProps={inputLabelPropsDefault} 
                    />
                )}
                sx={commonSx}
            />

            <Autocomplete
                freeSolo
                options={typeOptions}
                value={filters.type}
                onInputChange={(_, value) => onChange({ ...filters, type: value })}
                renderInput={(params) => (
                    <TextField {...params} label="Type" size="small" variant="outlined" 
                        InputProps={{ ...params.InputProps, ...inputPropsDefault }} 
                        InputLabelProps={inputLabelPropsDefault} 
                    />
                )}
                sx={{ ...commonSx, minWidth: { xs: '100%', sm: 120 } }}
            />
        </Box>
    )
}