import * as React from 'react';
import {
    CircularProgress, Box,
    Paper,
    TablePagination,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    CardActions,
    Button,
    Grid,
    CardHeader,
    Avatar,
    Chip,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { University } from 'lucide-react';

interface Row { [key: string]: string; }

interface FilterOptions {
    universities: string[];
    majorFields: string[];
    subFields: string[]; // Updated
    types: string[];
}

interface DegreeSearchTableProps {
    filters: {
        university: string;
        course: string;
        majorField: string;
        subField: string; // Updated
        type: string;
    };
    onFiltersChange: (filters: DegreeSearchTableProps['filters']) => void;
    onFilterOptions: (options: FilterOptions) => void;
}

export default function DegreeCardGrid({ filters, onFilterOptions }: DegreeSearchTableProps) {
    const [data, setData] = React.useState<Row[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSJBfGbPad3bQTSZ9JJD-mBE1i2XAZOZ16U9nbIDErq9yczJbNmxtUKU-AaYqO1BH3vUPPi-uJq4y7a/pub?gid=213263041&single=true&output=tsv';


    const extractFilterOptions = React.useCallback(
        (dataRows: Row[]) => {
            const getOptions = (key: string) =>
                Array.from(new Set(dataRows.map(row => row[key]).filter(Boolean))).sort();

            const options: FilterOptions = {
                universities: getOptions('University/ Institution Name'),
                majorFields: getOptions('Major Field of Study'),
                subFields: getOptions('Sub Field'), // Extracts sub-fields, ignoring empty strings
                types: getOptions('External/Internal'),
            };

            onFilterOptions(options);
        },
        [onFilterOptions]
    );
    React.useEffect(() => {
        fetch(csvUrl)
            .then((res) => res.text())
            .then((text) => {
                const rows = text.split('\n').map((row) => row.split('\t'));
                const headers = rows[1].slice(2);
                const dataRows = rows.slice(2).map((row) => {
                    const record: Row = {};
                    headers.forEach((header, i) => {
                        record[header.trim()] = row[i + 2]?.trim() || '';
                    });
                    return record;
                });
                setData(dataRows);
                extractFilterOptions(dataRows);
                setLoading(false);
            });
    }, [extractFilterOptions]);

    const filteredData = React.useMemo(() => {
        const filtered = data.filter((row) => {
            const match = (val: string, filter: string) =>
                !filter || val?.toLowerCase().includes(filter.toLowerCase());

            return (
                match(row['University/ Institution Name'], filters.university) &&
                match(row['Course Name'], filters.course) &&
                match(row['Major Field of Study'], filters.majorField) &&
                match(row['Sub Field'], filters.subField) && // Sub-field matching logic
                match(row['External/Internal'], filters.type)
            );
        });

        extractFilterOptions(filtered);
        return filtered;
    }, [data, filters, extractFilterOptions]);


    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };

    React.useEffect(() => setPage(0), [filters]);

    if (loading) return <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', padding: 3 }}>
            <Grid container spacing={3}>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, _) => (
                    <Grid size={4}>
                        <Card sx={{}}>
                            <CardActionArea>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            <University size={20} color='white' />
                                        </Avatar>
                                    }
                                    title={row['University/ Institution Name']}
                                    subheader={row['Major Field of Study']}
                                />
                                <CardContent>
                                    <Chip label={row['External/Internal']} size="small" color={row['External/Internal'] === 'External' ? 'primary' : 'default'} sx={{ mb: 1 }} />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {row['Course Name']}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        {row['Major Field of Study']} {row['Sub Field'] ? `- ${row['Sub Field']}` : ''}
                                    </Typography>
                                </CardContent>

                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" href={row['Course URL']} target="_blank">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}