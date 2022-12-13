import { Columns, IData } from '../models/model';

export const headColumns: Columns[] = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: 'ID',
    },
    {
      id: 'status',
      numeric: true,
      disablePadding: false,
      label: 'STATUS',
    },
    {
      id: 'sum',
      numeric: true,
      disablePadding: false,
      label: 'SUM',
    },
    {
      id: 'qty',
      numeric: true,
      disablePadding: false,
      label: 'QTY',
    },
    {
      id: 'volume',
      numeric: true,
      disablePadding: false,
      label: 'VOLUME',
    },
    {
      id: 'name',
      numeric: true,
      disablePadding: false,
      label: 'NAME',
    },
    {
      id: 'delivery_date',
      numeric: true,
      disablePadding: false,
      label: 'DELIVERY DATE',
    },
    {
      id: 'currency',
      numeric: true,
      disablePadding: false,
      label: 'CURRENCY',
    },
    {
      id: 'total',
      numeric: true,
      disablePadding: false,
      label: 'TOTAL'
    }
]

export const documents1: IData[] = [
  {id: '1', status: 'active', sum: 1000, qty: 3, volume:5, name: 'Book', delivery_date: '7-14-2022', currency: 'RUB'},
  {id: '2', status: 'archive', sum: 500, qty: 7, volume:6, name: 'Computer', delivery_date: '6-19-2022', currency: 'EU'},
  {id: '3', status: 'active', sum: 700, qty: 9, volume:7, name: 'Phone', delivery_date: '11-22-2022', currency: 'RUB'},
  {id: '4', status: 'archive', sum: 900, qty: 12, volume:8, name: 'Microwave', delivery_date: '04-12-2022', currency: 'USD'},
  {id: '5', status: 'active', sum: 10000, qty: 68, volume:9, name: 'TV', delivery_date: '09-13-2022', currency: 'RUB'},
];

export const documents2: IData[] = [
  {id: '1', status: 'archive', sum: 200, qty: 300, volume:2, name: 'TV', delivery_date: '05-13-2022', currency: 'EU'},
  {id: '2', status: 'active', sum: 800, qty: 300, volume:5, name: 'Microwave', delivery_date: '05-11-2022', currency: 'RUB'},
  {id: '3', status: 'archive', sum: 540, qty: 300, volume:3, name: 'Phone', delivery_date: '05-24-2022', currency: 'USD'},
  {id: '4', status: 'active', sum: 23000, qty: 300, volume:9, name: 'Computer', delivery_date: '05-10-2022', currency: 'RUB'},
  {id: '5', status: 'archive', sum: 1700, qty: 300, volume:1, name: 'Book', delivery_date: '06-16-2022', currency: 'EU'},
];