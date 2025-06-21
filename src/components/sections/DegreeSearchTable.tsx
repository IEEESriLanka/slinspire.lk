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

const columns: readonly Column[] = [
  // { id: 'Uni ID', label: 'Uni ID', minWidth: 80 },
  // { id: 'Uni vise Course Index', label: 'Course Index', minWidth: 80 },
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

export default function StickyHeadTable() {
  const [data, setData] = React.useState<Row[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const csvUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSJBfGbPad3bQTSZ9JJD-mBE1i2XAZOZ16U9nbIDErq9yczJbNmxtUKU-AaYqO1BH3vUPPi-uJq4y7a/pub?gid=213263041&single=true&output=tsv';

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
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ width: '100%'}}>
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
            {data
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
