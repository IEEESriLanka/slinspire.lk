import React from 'react'
import {
    TextField,
    Box,
    Autocomplete,
    Button,
    Chip,
    Stack,
    Typography,
    InputAdornment,
    Collapse,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';

interface DegreeTableFiltersProps {
    filters: {
        university: string;
        course: string;
        majorField: string;
        subField: string; // Updated
        type: string;
        isPaid: string;
        courseMode: string;
        qualificationLevel: string;
        stream: string;
    };
    onChange: (filters: DegreeTableFiltersProps['filters']) => void;
    universityOptions: string[];
    majorFieldOptions: string[];
    subFieldOptions: string[]; // Added
    typeOptions: string[];
    isPaidOptions: string[];
    courseModeOptions: string[];
    qualificationLevelOptions: string[];
    streamOptions: string[];
}

type FilterKey = keyof DegreeTableFiltersProps['filters'];

const palette = {
    border: '#e6d8ff',
    borderStrong: '#c8abff',
    text: '#32245f',
    mutedText: '#5b4a8f',
    accent: '#7e22ce',
    accentSoft: '#f2ebff',
};

const commonSx = {
    minWidth: { xs: '100%', sm: 170 },
    '& .MuiInputBase-root': {
        height: 44,
        borderRadius: 2,
        backgroundColor: '#faf8ff',
        fontSize: '0.94rem',
        transition: 'all 0.18s ease',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: palette.border },
        '&:hover fieldset': { borderColor: '#9f7aea' },
        '&.Mui-focused fieldset': {
            borderColor: palette.accent,
            boxShadow: '0 0 0 2px rgba(109, 40, 217, 0.12)',
        },
    },
    '& .MuiInputBase-root:hover': {
        backgroundColor: '#ffffff',
    },
    '& .MuiSvgIcon-root': {
        color: palette.accent,
    },
};

const dropdownSlotProps = {
    paper: {
        elevation: 0,
        sx: {
            mt: 0.6,
            borderRadius: 2,
            border: `1px solid ${palette.border}`,
            background: 'linear-gradient(180deg, #ffffff 0%, #fbf8ff 100%)',
            boxShadow: '0 16px 30px rgba(76, 29, 149, 0.14)',
            overflow: 'hidden',
        },
    },
    listbox: {
        sx: {
            py: 0.6,
            px: 0.5,
            '& .MuiAutocomplete-option': {
                borderRadius: 1.5,
                minHeight: 36,
                color: palette.text,
                fontSize: '0.91rem',
                transition: 'all 0.15s ease',
            },
            '& .MuiAutocomplete-option:hover': {
                backgroundColor: '#f3eaff',
                color: '#4c1d95',
            },
            '& .MuiAutocomplete-option[aria-selected="true"]': {
                backgroundColor: '#eadcff',
                color: '#4c1d95',
                fontWeight: 700,
            },
            '& .MuiAutocomplete-option[aria-selected="true"].Mui-focused': {
                backgroundColor: '#e3d1ff',
            },
        },
    },
};

export const DegreeTableFilters: React.FC<DegreeTableFiltersProps> = ({
    filters,
    onChange,
    universityOptions,
    majorFieldOptions,
    subFieldOptions,
    typeOptions,
    isPaidOptions,
    courseModeOptions,
    qualificationLevelOptions,
    streamOptions,
}) => {
    const activeFilters = [
        { key: 'university' as FilterKey, label: 'Faculty', value: filters.university },
        { key: 'course' as FilterKey, label: 'Course', value: filters.course },
        { key: 'majorField' as FilterKey, label: 'Major', value: filters.majorField },
        { key: 'subField' as FilterKey, label: 'Sub', value: filters.subField },
        { key: 'type' as FilterKey, label: 'Type', value: filters.type },
        { key: 'isPaid' as FilterKey, label: 'Payment', value: filters.isPaid },
        { key: 'courseMode' as FilterKey, label: 'Mode', value: filters.courseMode },
        { key: 'qualificationLevel' as FilterKey, label: 'Qualification', value: filters.qualificationLevel },
        { key: 'stream' as FilterKey, label: 'Stream', value: filters.stream },
    ].filter((item) => item.value.trim() !== '');

    const filterCount = activeFilters.length;
    const [showAdvanced, setShowAdvanced] = React.useState(false);

    const clearAll = () => {
        onChange({
            university: '',
            course: '',
            majorField: '',
            subField: '',
            type: '',
            isPaid: '',
            courseMode: '',
            qualificationLevel: '',
            stream: '',
        });
    };

    const clearSingle = (key: FilterKey) => {
        onChange({ ...filters, [key]: '' });
    };

    return (
        <Box mb={4}>
            <Box
                sx={{
                    borderRadius: 3,
                    border: `1px solid ${palette.border}`,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(249,245,255,0.95) 100%)',
                    boxShadow: '0 10px 26px rgba(109, 40, 217, 0.08)',
                    p: { xs: 1.5, md: 2 },
                    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                    '&:hover': {
                        boxShadow: '0 14px 30px rgba(109, 40, 217, 0.12)',
                        borderColor: palette.borderStrong,
                    },
                }}
            >
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                    justifyContent="space-between"
                    spacing={1.2}
                    sx={{ mb: 1.6 }}
                >
                    <Box>
                        <Typography sx={{ color: palette.text, fontWeight: 800, lineHeight: 1.2 }}>
                            Find your degree pathway
                        </Typography>
                        <Typography variant="body2" sx={{ color: palette.mutedText }}>
                            Use quick filters or open advanced options for precise results.
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Button
                            onClick={() => setShowAdvanced((prev) => !prev)}
                            startIcon={<TuneRoundedIcon />}
                            endIcon={
                                <ExpandMoreRoundedIcon
                                    sx={{
                                        transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s ease',
                                    }}
                                />
                            }
                            sx={{
                                color: palette.text,
                                fontWeight: 700,
                                textTransform: 'none',
                                borderRadius: 2,
                                border: `1px solid ${palette.border}`,
                                backgroundColor: '#f8f4ff',
                                px: 1.3,
                                '&:hover': {
                                    backgroundColor: '#efe6ff',
                                    borderColor: palette.borderStrong,
                                },
                            }}
                        >
                            {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
                        </Button>

                        <Button
                            onClick={clearAll}
                            startIcon={<RestartAltRoundedIcon />}
                            variant="text"
                            sx={{
                                color: palette.mutedText,
                                fontWeight: 700,
                                textTransform: 'none',
                                minWidth: { xs: 96, sm: 92 },
                                borderRadius: 2,
                                px: 1.2,
                                '&:hover': {
                                    backgroundColor: '#f4eeff',
                                },
                            }}
                        >
                            Reset
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<FilterAltOutlinedIcon />}
                            sx={{
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
                                textTransform: 'none',
                                px: 1.8,
                                minWidth: 126,
                                fontWeight: 700,
                                boxShadow: '0 6px 14px rgba(109, 40, 217, 0.28)',
                                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5b21b6 0%, #6d28d9 100%)',
                                    boxShadow: '0 10px 18px rgba(109, 40, 217, 0.32)',
                                    transform: 'translateY(-1px)',
                                },
                            }}
                        >
                            Filter
                            <Box
                                component="span"
                                sx={{
                                    ml: 1,
                                    minWidth: 22,
                                    height: 22,
                                    px: 0.7,
                                    borderRadius: 50,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    border: '1px solid rgba(255,255,255,0.38)',
                                    fontSize: '0.8rem',
                                    lineHeight: 1,
                                }}
                            >
                                {filterCount}
                            </Box>
                        </Button>
                    </Stack>
                </Stack>

                <Box
                    display="flex"
                    flexWrap="wrap"
                    gap={1.5}
                    alignItems="center"
                >
                    <TextField
                        placeholder="Search programs..."
                        value={filters.course}
                        onChange={(e) => onChange({ ...filters, course: e.target.value })}
                        size="small"
                        variant="outlined"
                        sx={{ ...commonSx, flexGrow: 1, minWidth: { xs: '100%', md: 320 } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRoundedIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Autocomplete
                        freeSolo
                        options={universityOptions}
                        slotProps={dropdownSlotProps}
                        noOptionsText="No matching universities"
                        value={filters.university}
                        onInputChange={(_, value) => onChange({ ...filters, university: value })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="University / Institution"
                                size="small"
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <>
                                            <InputAdornment position="end">
                                                <SchoolRoundedIcon fontSize="small" />
                                            </InputAdornment>
                                            {params.InputProps.startAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                        sx={commonSx}
                    />

                    <Autocomplete
                        options={isPaidOptions}
                        slotProps={dropdownSlotProps}
                        noOptionsText="No payment options"
                        value={filters.isPaid}
                        onInputChange={(_, value) => onChange({ ...filters, isPaid: value })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Paid / Free"
                                size="small"
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <>
                                            <InputAdornment position="end">
                                                <PaymentsOutlinedIcon fontSize="small" />
                                            </InputAdornment>
                                            {params.InputProps.startAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                        sx={{ ...commonSx, minWidth: { xs: '100%', sm: 160 } }}
                    />
                </Box>

                <Collapse in={showAdvanced} timeout="auto" unmountOnExit>
                    <Box
                        sx={{
                            mt: 1.4,
                            pt: 1.4,
                            borderTop: '1px dashed #dbc9ff',
                            display: 'grid',
                            gap: 1.2,
                            gridTemplateColumns: {
                                xs: '1fr',
                                md: 'repeat(6, minmax(0, 1fr))',
                            },
                        }}
                    >
                        <Autocomplete
                            freeSolo
                            options={majorFieldOptions}
                            slotProps={dropdownSlotProps}
                            noOptionsText="No matching major fields"
                            value={filters.majorField}
                            onInputChange={(_, value) => onChange({ ...filters, majorField: value })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Major / Disc."
                                    size="small"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <>
                                                <InputAdornment position="end">
                                                    <MenuBookRoundedIcon fontSize="small" />
                                                </InputAdornment>
                                                {params.InputProps.startAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            sx={commonSx}
                        />

                        <Autocomplete
                            freeSolo
                            options={subFieldOptions}
                            slotProps={dropdownSlotProps}
                            noOptionsText="No matching sub fields"
                            value={filters.subField}
                            onInputChange={(_, value) => onChange({ ...filters, subField: value })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Sub Disc."
                                    size="small"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <>
                                                <InputAdornment position="end">
                                                    <AccountTreeRoundedIcon fontSize="small" />
                                                </InputAdornment>
                                                {params.InputProps.startAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            sx={commonSx}
                        />

                        <Autocomplete
                            freeSolo
                            options={typeOptions}
                            slotProps={dropdownSlotProps}
                            noOptionsText="No matching types"
                            value={filters.type}
                            onInputChange={(_, value) => onChange({ ...filters, type: value })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Type"
                                    size="small"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <>
                                                <InputAdornment position="end">
                                                    <SellOutlinedIcon fontSize="small" />
                                                </InputAdornment>
                                                {params.InputProps.startAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            sx={commonSx}
                        />

                        <Autocomplete
                            freeSolo
                            options={courseModeOptions}
                            slotProps={dropdownSlotProps}
                            noOptionsText="No matching course modes"
                            value={filters.courseMode}
                            onInputChange={(_, value) => onChange({ ...filters, courseMode: value })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Course Mode"
                                    size="small"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <>
                                                <InputAdornment position="end">
                                                    <AccessTimeRoundedIcon fontSize="small" />
                                                </InputAdornment>
                                                {params.InputProps.startAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            sx={commonSx}
                        />

                        <Autocomplete
                            freeSolo
                            options={qualificationLevelOptions}
                            slotProps={dropdownSlotProps}
                            noOptionsText="No matching qualification levels"
                            value={filters.qualificationLevel}
                            onInputChange={(_, value) => onChange({ ...filters, qualificationLevel: value })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Qualification Level"
                                    size="small"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <>
                                                <InputAdornment position="end">
                                                    <WorkspacePremiumRoundedIcon fontSize="small" />
                                                </InputAdornment>
                                                {params.InputProps.startAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            sx={commonSx}
                        />

                        <Autocomplete
                            options={streamOptions}
                            slotProps={dropdownSlotProps}
                            noOptionsText="No stream options"
                            value={filters.stream}
                            onInputChange={(_, value) => onChange({ ...filters, stream: value })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Stream"
                                    size="small"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <>
                                                <InputAdornment position="end">
                                                    <HubRoundedIcon fontSize="small" />
                                                </InputAdornment>
                                                {params.InputProps.startAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            sx={commonSx}
                        />
                    </Box>
                </Collapse>
            </Box>

            {filterCount > 0 && (
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1.2}
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    sx={{ mt: 1.4, px: 0.5 }}
                >
                    <Typography
                        variant="body2"
                        sx={{ color: palette.mutedText, fontWeight: 700 }}
                    >
                        Active filters:
                    </Typography>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {activeFilters.map((item) => (
                            <Chip
                                key={item.key}
                                label={`${item.label}: ${item.value}`}
                                onDelete={() => clearSingle(item.key)}
                                sx={{
                                    backgroundColor: palette.accentSoft,
                                    color: '#5d2ac8',
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    border: '1px solid #e4d5ff',
                                    '&:hover': {
                                        backgroundColor: '#eaddff',
                                    },
                                    '& .MuiChip-deleteIcon': {
                                        color: palette.accent,
                                        '&:hover': { color: '#4c1d95' },
                                    },
                                }}
                            />
                        ))}
                    </Stack>
                    <Button
                        onClick={clearAll}
                        size="small"
                        sx={{
                            textTransform: 'none',
                            fontWeight: 700,
                            color: '#5d2ac8',
                            px: 1,
                            '&:hover': {
                                backgroundColor: '#f4eeff',
                            },
                        }}
                    >
                        Clear all
                    </Button>
                </Stack>
            )}
        </Box>
    )
}

export const DegreeTableFiltersOld = DegreeTableFilters;