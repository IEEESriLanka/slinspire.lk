import * as React from 'react';
import {
    CircularProgress, Box,
    Paper,
} from '@mui/material';
import DegreeCard from './DegreeCard';

export interface DegreeRecord {
    id: string;
    universityName: string;
    courseName: string;
    majorField: string;
    subField?: string;
    courseUrl?: string;
    courseType?: string;
    stream: {
        art?: boolean;
        commerce?: boolean;
        bio?: boolean;
        physics?: boolean;
        tech?: boolean;
    },
    courseMode?: string;
    qualificationLevel?: string;
    isPaid: boolean;
    ugcCode?: string;
}

interface FilterOptions {
    universities: string[];
    majorFields: string[];
    subFields: string[]; // Updated
    types: string[];
    paymentStatuses: string[];
    courseModes: string[];
    qualificationLevels: string[];
    streams: string[];
}

interface DegreeSearchTableProps {
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
    onFiltersChange: (filters: DegreeSearchTableProps['filters']) => void;
    onFilterOptions: (options: FilterOptions) => void;
}

export default function DegreeCardGrid({ filters, onFilterOptions }: DegreeSearchTableProps) {
    const [data, setData] = React.useState<DegreeRecord[]>([]);
    const [loading, setLoading] = React.useState(true);

    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTPGaOQkkwdKsJVu1IhzALoLnFs8bAzNFqrbrvvv323Nvdxu1UDiCUNIIh5yvy2HWr6JI8IrlOmzSF4/pub?gid=1377529768&single=true&output=tsv';

    const streamLabels: Record<keyof DegreeRecord['stream'], string> = {
        art: 'Art',
        commerce: 'Commerce',
        bio: 'Bio',
        physics: 'Physics',
        tech: 'Tech',
    };


    const extractFilterOptions = React.useCallback(
        (dataRows: DegreeRecord[]) => {
            const getOptions = (key: keyof DegreeRecord) =>
                Array.from(new Set(dataRows.map(row => row[key]).filter(Boolean))).sort() as string[];

            const options: FilterOptions = {
                majorFields: getOptions('majorField'),
                subFields: getOptions('subField'), // Extracts sub-fields, ignoring empty strings
                types: getOptions('courseType'),
                universities: getOptions('universityName'),
                paymentStatuses: Array.from(new Set(dataRows.map(row => (row.isPaid ? 'Paid' : 'Free')))).sort(),
                courseModes: getOptions('courseMode'),
                qualificationLevels: getOptions('qualificationLevel'),
                streams: (Object.keys(streamLabels) as Array<keyof DegreeRecord['stream']>)
                    .filter((key) => dataRows.some((row) => row.stream[key]))
                    .map((key) => streamLabels[key]),
            };
            
            onFilterOptions(options);
        },
        [onFilterOptions]
    );

    function compareStrings(a: string | undefined, b: string | undefined) : boolean {
        if (!a) return false;
        if (!b) return false;
        return a.trim().toLowerCase() === b.trim().toLowerCase();
    }
    React.useEffect(() => {
        fetch(csvUrl)
            .then((res) => res.text())
            .then((text) => {
                
                const rows = text.split('\n').map((row) => row.split('\t'));
                const headerNumbers = rows[0];
                const gn = (n: string): number => headerNumbers.indexOf(n);
                const dataRows = rows.slice(2).map((row) => {
                     // Log each row for debugging
                    const record: DegreeRecord = {
                        id: String(rows.indexOf(row) - 1),
                        universityName: row[gn('3')]?.trim() || '',
                        courseName: row[gn('4')]?.trim() || '',
                        majorField: row[gn('10')]?.trim() || '',
                        subField: row[gn('11')]?.trim() || '',
                        courseUrl: row[gn('9')]?.trim() || '',
                        courseType: row[gn('26')]?.trim().toUpperCase(),
                        stream: {
                            art: row[gn('40')]?.trim().toLowerCase() === 'true',
                            commerce: row[gn('39')]?.trim().toLowerCase() === 'true',
                            bio: row[gn('37')]?.trim().toLowerCase() === 'true',
                            physics: row[gn('38')]?.trim().toLowerCase() === 'true',
                            tech: row[gn('41')]?.trim().toLowerCase() === 'true',
                        },
                        isPaid: row[gn('18')]?.trim().toLowerCase() === 'Paid Course'.toLowerCase(),
                        courseMode: compareStrings(row[gn('17')], 'Full Time') ? 'Full Time' : compareStrings(row[gn('17')], 'Part Time') ? 'Part Time' : compareStrings(row[gn('17')], "Full Time / Part Time") ? "Hybrid" : '',
                        qualificationLevel: row[gn('56')]?.trim() || '',
                        ugcCode: row[gn('8')]?.trim() || '',
                    };
                    return record;
                });
                setData(dataRows);
                extractFilterOptions(dataRows);
                setLoading(false);
            });
    }, [extractFilterOptions]);

    const filteredData = React.useMemo(() => {
        const filtered = data.filter((row) => {
            const match = (val: string | undefined, filter: string) =>
                !filter || val?.toLowerCase().includes(filter.toLowerCase());

            return (
                match(row.universityName, filters.university) &&
                match(row.courseName, filters.course) &&
                match(row.majorField, filters.majorField) &&
                match(row.subField, filters.subField) && // Sub-field matching logic
                match(row.courseType, filters.type) &&
                (!filters.isPaid || (filters.isPaid.toLowerCase() === 'paid' ? row.isPaid : !row.isPaid)) &&
                match(row.courseMode, filters.courseMode) &&
                match(row.qualificationLevel, filters.qualificationLevel) &&
                (!filters.stream || row.stream[filters.stream.toLowerCase() as keyof DegreeRecord['stream']] === true)
            );
        });

        extractFilterOptions(filtered);
        return filtered;
    }, [data, filters, extractFilterOptions]);


    if (loading) return <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', padding: 3, borderRadius: 3 }}>
            <h2 className='pb-4 font-medium'>{filteredData.length} Degree Programs Found</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredData.map((row, _) => (
                    <DegreeCard
                        key={row.id}
                        degree={row}
                    />
                ))}
            </div>
        </Paper>
    )
}