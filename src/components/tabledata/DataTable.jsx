

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { tableColumns } from './tableColData';




export default function DataTable({ handleSearch, setCityName }) {
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (


        (handleSearch() && handleSearch()?.length > 0) ?

            <Paper sx={{ width: '100%', overflow: 'hidden', maxWidth: "1440px", margin: "0 auto", background: "transparent", color: "#9da7b6" }} className='Paper'>
                <TableContainer sx={{ maxHeight: 400 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {tableColumns?.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, }}
                                        sx={{
                                            background: "transparent",
                                            padding: "10px 10px",
                                            fontWeight: "900"
                                        }}
                                    >

                                        <div className='tableCell' >

                                            {column.label}

                                        </div>

                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch()?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                ?.map((row, i) => {
                                    return (
                                        <TableRow key={i} hover role="checkbox" tabIndex={-1} >
                                            {tableColumns?.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>

                                                        <div className='tableCell' onClick={() => (column.id === "name") && setCityName(value)}>
                                                            {value}
                                                        </div>

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
                    count={handleSearch()?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className='pagination'
                    sx={{ background: "transparent", color: "#9da7b6", heigth: "auto", border: "2px solid red, ", flexDirection: 'column', marginTop: 5 }}
                />
            </Paper > : <h1 style={{ color: "red" }}>loading....</h1>
    );
}
