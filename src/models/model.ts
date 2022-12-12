export interface IData {
    id: string,
    status: 'active' | 'archive', // {‘active’, ‘archive’}
    sum: number,
    qty: number,
    volume: number,
    name: string,
    delivery_date: string,
    currency: string
}

export interface Columns {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
}
