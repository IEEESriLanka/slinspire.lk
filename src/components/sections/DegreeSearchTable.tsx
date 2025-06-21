import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  Box,
} from '@mui/material';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: string) => string | JSX.Element;
}

interface Row {
  [key: string]: string;
}

interface FilterOptions {
  universities: string[];
  majorFields: string[];
  types: string[];
}

interface DegreeSearchTableProps {
  filters: {
    university: string;
    course: string;
    majorField: string;
    type: string;
  };
  onFiltersChange: (filters: DegreeSearchTableProps['filters']) => void;
  onFilterOptions: (options: FilterOptions) => void;
}

const columns: readonly Column[] = [
  { id: 'University/ Institution Name', label: 'University Name', minWidth: 170 },
  { id: 'Course Name', label: 'Course Name', minWidth: 170 },
  { id: 'Major Field of Study', label: 'Major Field', minWidth: 150 },
  {
    id: 'Sub Field', label: 'Sub Field', minWidth: 150,
  },
  {
    id: 'Course URL',
    label: 'Course URL',
    minWidth: 200,
    format: (value: string) => (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#1976d2', wordBreak: 'break-all', position: 'relative' }}
      >
        {value}
      </a>
    ),
  },
  { id: 'External/Internal', label: 'Type', minWidth: 100 },
];

export default function StickyHeadTable({ filters, onFiltersChange, onFilterOptions }: DegreeSearchTableProps) {
  const [data, setData] = React.useState<Row[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const csvUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSJBfGbPad3bQTSZ9JJD-mBE1i2XAZOZ16U9nbIDErq9yczJbNmxtUKU-AaYqO1BH3vUPPi-uJq4y7a/pub?gid=213263041&single=true&output=tsv';

  const extractFilterOptions = React.useCallback(
    (dataRows: Row[]) => {
      const universities = Array.from(
        new Set(
          dataRows
            .map(row => row['University/ Institution Name'])
            .filter(Boolean)
        )
      ).sort();

      const majorFields = Array.from(
        new Set(
          dataRows
            .map(row => row['Major Field of Study'])
            .filter(Boolean)
        )
      ).sort();

      const types = Array.from(
        new Set(
          dataRows
            .map(row => row['External/Internal'])
            .filter(Boolean)
        )
      ).sort();

      const options: FilterOptions = {
        universities,
        majorFields,
        types,
      };

      onFilterOptions(options);
      return options;
    },
    [onFilterOptions]
  );



  React.useEffect(() => {
    fetch(csvUrl)
      .then((res) => res.text())
      .then((text) => {
        // Split rows by newline, then split columns by tab for TSV
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
    return data.filter((row) => {
      const universityMatch = filters.university
        ? row['University/ Institution Name']
          ?.toLowerCase()
          .includes(filters.university.toLowerCase())
        : true;
      const courseMatch = filters.course
        ? row['Course Name']
          ?.toLowerCase()
          .includes(filters.course.toLowerCase())
        : true;
      const majorFieldMatch = filters.majorField
        ? row['Major Field of Study']
          ?.toLowerCase()
          .includes(filters.majorField.toLowerCase())
        : true;
      const typeMatch = filters.type
        ? row['External/Internal']
          ?.toLowerCase()
          .includes(filters.type.toLowerCase())
        : true;
      return universityMatch && courseMatch && majorFieldMatch && typeMatch;
    });
  }, [data, filters]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    setPage(0);
  }, [filters]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ height: 600, overflow: 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ '& .MuiTableCell-stickyHeader': { zIndex: 10, background: '#fff' } }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id] || '';
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {column.format
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
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
  );
}
