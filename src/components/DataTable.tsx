import {FC, useState} from 'react'
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search';
import { Columns, IData } from '../models/model';
import '../App.css';
import { useInput } from '../hooks/useInput';

interface IDataTable {
    rows: IData[],
    columns: Columns[],
    currentDoc: string
}


const DataTable: FC<IDataTable> = ({rows, columns, currentDoc}) => {
    const input = useInput();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [selected, setSelected] = useState<readonly string[]>([]);

    const cancel = () => {
        handleOpenMenu();
    }

    const handleOpenMenu = () => {
        setOpenMenu(true);
    };

    const handleCloseMenu = () => {
        setOpenMenu(false);
    };

    const handleClickRow = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    }

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    let totalVolume = 0;
    let totalQty = 0;
    rows.map(row => {
        totalVolume += row.volume;
        totalQty += row.qty;
    })
    
  return (
    <>
        <Box className='table-title'>Table data: <span className='currentDoc'>{currentDoc}</span></Box>
        <Paper
            component="form"
            className='search-paper'
        >
            <InputBase
                sx={{ ml: 1, flex: 1}}
                placeholder="Search data in table"
                inputProps={{ 'aria-label': 'Search data in table' }}
                {...input}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                inputProps={{
                                'aria-label': 'select all desserts',
                                }}
                            />
                            </TableCell>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align='center'
                                padding={column.disablePadding ? 'none' : 'normal'}
                                sortDirection={false}
                            >
                                <TableSortLabel
                                    active={true}
                                    direction={'asc'}
                                >
                                    {column.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            hover
                            key={row.name}
                            onClick={(event) => handleClickRow(event, row.name)}
                            role="checkbox"
                            aria-checked={isSelected(row.name)}
                            tabIndex={-1}
                            selected={isSelected(row.name)}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox
                                color="primary"
                                checked={false}
                                inputProps={{
                                    'aria-labelledby': row.id,
                                }}
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">{row.sum}</TableCell>
                            <TableCell align="center">{row.qty}</TableCell>
                            <TableCell align="center">{row.volume}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.delivery_date}</TableCell>
                            <TableCell align="center">{row.currency}</TableCell>
                            <TableCell align="center">{row.sum * row.qty}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
            </Table>
        </TableContainer>
        {/*<TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={1}
          page={1}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
                            />*/}

        <Box className='table-footer'>
            <Box className='total-volume'>Общий обьем: {totalVolume}</Box>
            <Box className='total-qty'>Общее количество: {totalQty}</Box>
            <Button variant="contained" onClick={cancel}>Аннулировать</Button>
        </Box>
        

        
        <Dialog
            open={openMenu}
            onClose={handleCloseMenu}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Вы уверены что хотите аннулировать товар(ы)?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    1,2,3,4,5
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseMenu}>Отклонить</Button>
                <Button onClick={handleCloseMenu} autoFocus>Применить</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default DataTable;