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
  { id: '3', label: 'University Name', minWidth: 190 },
  { id: '4', label: 'Course Name', minWidth: 200 },
  { id: '10', label: 'Major Field', minWidth: 180 },
  { id: '11', label: 'Sub Field', minWidth: 180 },
  {
    id: '9',
    label: 'Course URL',
    minWidth: 100,
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
  { id: '26', label: 'Type', minWidth: 100 },
];

export default function StickyHeadTable({ filters, onFiltersChange, onFilterOptions }: DegreeSearchTableProps) {
  const [data, setData] = React.useState<Row[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const csvUrl =
  //   'https://docs.google.com/spreadsheets/d/e/2PACX-1vSJBfGbPad3bQTSZ9JJD-mBE1i2XAZOZ16U9nbIDErq9yczJbNmxtUKU-AaYqO1BH3vUPPi-uJq4y7a/pub?gid=213263041&single=true&output=tsv';

  const extractFilterOptions = React.useCallback(
    (dataRows: Row[]) => {
      const universities = Array.from(
        new Set(
          dataRows
            .map(row => row['3']) //University/ Institution Name
            .filter(Boolean)
        )
      ).sort();

      const majorFields = Array.from(
        new Set(
          dataRows
            .map(row => row['10']) //Major Field of Study
            .filter(Boolean)
        )
      ).sort();

      const types = Array.from(
        new Set(
          dataRows
            .map(row => row['26']) // External/Internal
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
    fetch('data/sheet-data.json')
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData);
        extractFilterOptions(jsonData);
        setLoading(false);
      });
  }, [extractFilterOptions]);


  const filteredData = React.useMemo(() => {
    return data.filter((row) => {
      const universityMatch = filters.university
        ? row['3']?.toLowerCase().includes(filters.university.toLowerCase())
        : true;
      const courseMatch = filters.course
        ? row['4']?.toLowerCase().includes(filters.course.toLowerCase())
        : true;
      const majorFieldMatch = filters.majorField
        ? row['10']?.toLowerCase().includes(filters.majorField.toLowerCase())
        : true;
      const typeMatch = filters.type
        ? row['26']?.toLowerCase().includes(filters.type.toLowerCase())
        : true;
      return universityMatch && courseMatch && majorFieldMatch && typeMatch;
    });
  }, [data, filters]);

  React.useEffect(() => {
    extractFilterOptions(filteredData);
  }, [filteredData, extractFilterOptions]);

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
  // Custom scrollbar styles for TableContainer
  const tableContainerSx = {
    height: 600,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: 10,
      backgroundColor: '#ede9fe', // purple-50
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#a78bfa', // purple-400
      borderRadius: 8,
      border: '2px solid #ede9fe',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#8b5cf6', // purple-500
    },
    scrollbarColor: '#a78bfa #ede9fe', // For Firefox
    scrollbarWidth: 'thin',
  };
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={tableContainerSx}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead
            sx={{
              '& .MuiTableCell-stickyHeader': {
                zIndex: 10,
                background: 'linear-gradient(to right, #ede9fe, #e0e7ff)', // purple-50 to indigo-50
                color: '#6D28D9', // purple-700
                fontWeight: 700, // increased font weight
                fontSize: '1.05rem',
                letterSpacing: '0.02em',
                borderBottom: '2px solid #a5b4fc', // indigo-200
                boxShadow: '0 2px 8px 0 rgba(109, 40, 217, 0.05)',
              },
            }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: 700,
                    color: '#6D28D9', // purple-700
                    background: 'linear-gradient(to right, #ede9fe, #e0e7ff)', // match stickyHeader background
                    borderBottom: '2px solid #a5b4fc', // indigo-200
                    fontSize: '1.05rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{column.label}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    sx={{
                      transition: 'background 0.2s',
                      '&:hover': {
                        background: 'linear-gradient(to right, rgba(237,233,254,0.7), rgba(224,231,255,0.7))', // lighter, more transparent
                      },
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id] || '';
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align || 'left'}
                          sx={{
                            background: 'linear-gradient(to right, rgba(237,233,254,0.5), rgba(224,231,255,0.5))', // lighter, more transparent
                            fontWeight: 500,
                          }}
                        >
                          {column.format ? column.format(value) : value}
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
        sx={{
          background: 'linear-gradient(to right, #ede9fe, #e0e7ff)', // purple-50 to indigo-50
          color: '#6D28D9',
          borderTop: '2px solid #a5b4fc',
          '.MuiTablePagination-toolbar': {
            background: 'transparent',
            color: '#6D28D9',
            fontWeight: 700,
          },
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
            color: '#6D28D9',
            fontWeight: 700,
          },
          '.MuiTablePagination-actions .MuiButtonBase-root': {
            color: '#6D28D9',
          },
        }}
      />
    </Paper>
  );
}
