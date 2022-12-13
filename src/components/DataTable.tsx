import {FC, useEffect, useState} from 'react'
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material'
import moment, {Moment} from 'moment';
import SearchIcon from '@mui/icons-material/Search';
import { Columns, IData } from '../models/model';
import '../App.css';
import { useInput } from '../hooks/useInput';

moment.locale('ru');

interface IDataTable {
    rows: IData[],
    columns: Columns[],
    currentDoc: string
}

type Order = 'asc' | 'desc';

const DataTable: FC<IDataTable> = ({rows, columns, currentDoc}) => {
    let allRows = [];
    allRows = [...rows];

    const input = useInput();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [selectedId, setSelectedId] = useState<string[]>([]);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof IData>('delivery_date');

    const cancel = () => {
        if(!(!!selected.length)) {
            return;
        }
        handleOpenMenu();
    }

    const handleOpenMenu = () => {
        setOpenMenu(true);
    };

    const handleCloseMenu = () => {
        setOpenMenu(false);
    };

    const accept = () => {
        handleCloseMenu();
        const params = selectedId;
        console.log('REQUEST PARAMS: ', params);
    }

    const handleClickRow = (event: React.MouseEvent<unknown>, name: string, id: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];
        
        const selectedIdIndex = selectedId.indexOf(id);
        if(selectedIdIndex == -1) {
            setSelectedId([...selectedId, id]);
        } else {
            setSelectedId([...selectedId.filter(i => i != id)]);
        }
        
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

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelected = rows.map((n) => n.name);
          setSelected(newSelected);
          return;
        }
        setSelected([]);
    };

    const handleRequestSort = (property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
    }
    
    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (
        a: { [key in Key]: number | string | Moment},
        b: { [key in Key]: number | string | Moment},
    ) => number {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    let totalVolume = 0;
    let totalQty = 0;

    allRows.map(row => {
        totalVolume += row.volume;
        totalQty += row.qty;
    })

    allRows.map(row => {
        row.delivery_date = moment(row.delivery_date);
    })
    allRows = allRows.filter((it) => {
        return ( it.name.toLowerCase().includes(input.value.toLowerCase()) )
            ||
            ( it.status.toLowerCase().includes(input.value.toLowerCase()) )
            ||
            ( it.sum.toString().toLowerCase().includes(input.value.toLowerCase()) ); 
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
                                onChange={handleSelectAllClick}
                            />
                            </TableCell>
                        {columns.map((column) => (
                            (column.id !== 'id' && 
                            <TableCell
                                key={column.id}
                                align='center'
                                padding={column.disablePadding ? 'none' : 'normal'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? order : 'asc'}
                                    onClick={() => handleRequestSort(column.id)}
                                >
                                    {column.label}
                                </TableSortLabel>
                            </TableCell>
                            )
                        ))}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                    allRows
                    .sort(getComparator(order, orderBy))
                    .slice()
                    .map((row) => (
                        <TableRow
                            hover
                            key={row.name}
                            onClick={(event) => handleClickRow(event, row.name, row.id)}
                            role="checkbox"
                            aria-checked={isSelected(row.name)}
                            tabIndex={-1}
                            selected={isSelected(row.name)}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox
                                color="primary"
                                checked={isSelected(row.name)}
                                inputProps={{
                                    'aria-labelledby': row.id,
                                }}
                                />
                            </TableCell>
                            {/*<TableCell component="th" scope="row">{row.id}</TableCell>*/}
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">{row.sum}</TableCell>
                            <TableCell align="center">{row.qty}</TableCell>
                            <TableCell align="center">{row.volume}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">
                                {moment(row.delivery_date).format('DD.MM.YYYY')}
                                
                            </TableCell>
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
            <Button variant="contained" onClick={cancel} disabled={!selected.length}>Аннулировать</Button>
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
                    {selected.join(', ')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseMenu}>Отклонить</Button>
                <Button onClick={accept} autoFocus>Применить</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default DataTable;