import * as React from 'react';
import {
    CircularProgress, Box,
    Paper,
    TablePagination,
} from '@mui/material';
import { BookOpen, Boxes, CircleChevronRightIcon, Link, University } from 'lucide-react';

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
    const [rowsPerPage, setRowsPerPage] = React.useState(12);

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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, _) => (
                    <div className='bg-white p-4  border-t-4 border-purple-500 rounded-lg shadow-lg flex flex-col gap-3 hover:shadow-xl duration-100' >
                        <div id='card-header' className='flex gap-4'>
                            <div className='w-10 h-10 rounded-xl bg-purple-200 flex items-center justify-center'>
                                <University size={20} color='purple' className='m-auto' />
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='text-md font-medium'>{row['University/ Institution Name']}</h3>
                                <span className='text-xs text-gray-600 inline-flex items-center gap-1 -ml-1'><BookOpen className='h-3'/> {row['Major Field of Study']}</span>
                            </div>
                        </div>
                        <div id="card-content" className='flex flex-col gap-3 items-start'>
                            <div className='text-xs font-medium  inline-block px-3 py-1 data-[internal=true]:text-purple-700  data-[internal=true]:bg-purple-500/30 bg-gray-100 rounded-lg' data-internal={row['External/Internal'] === 'Internal' ? 'true' : 'false'}>
                                {row['External/Internal'].toUpperCase()}
                            </div>
                            <div>
                                <h2 className='font-semibold text-foreground text-lg leading-tight'>{row['Course Name']}</h2>
                            </div>
                            <div className='text-sm font-medium bg-gray-200 text-gray-800 px-2 py-1 rounded-lg inline-flex items-center'>
                                <Boxes size={14} className='mr-2' color='gray'/>
                                <span className='text-gray-500 font-normal mr-2'>Major Field : </span> {row['Major Field of Study']}
                            </div>
                            <div className='text-sm items-baseline font-medium bg-gray-200 text-gray-800 px-2 py-1 rounded-lg inline-flex aria-hidden:hidden' aria-hidden={!row['Sub Field']}>
                                <CircleChevronRightIcon size={14} className='mr-2' color='gray'/>
                                <span className='text-gray-500 font-normal'>Sub Field : </span> {row['Sub Field'] ? row['Sub Field'] : ''}
                            </div>                            
                        </div>
                        <div className='my-auto'></div>
                        <hr/>
                        <a href={row['Course URL']} target="_blank" className='text-sm bg-purple-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-1 justify-end self-end font-medium hover:bg-purple-700'>
                            <Link size={14} className='mr-2'/> View Course
                        </a>
                    </div>
                ))}
            </div>
            <TablePagination
                rowsPerPageOptions={[12, 24, 100]}
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