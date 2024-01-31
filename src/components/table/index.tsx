import React, { useEffect, useState } from 'react';
import './index.scss';

interface TableProps{
    columns : {
        label: string;
        accessor: string;
        render?: (row : any, index : number) => {

        }, 
        sortable?:boolean,
        basecolumn?: boolean
    } [];
 data: any[]
}
const Table = ({ columns, data }: TableProps) => {

    // console.log(data);
    const [sortType, setsortType] = useState<string>("asc");
    const [sortColumn, setSortColumn] = useState<string>("");

    useEffect ( ()=> {
        const basecolumn = columns.find( item => {
            return item.basecolumn;
        }) ?.accessor || "";
        setSortColumn(basecolumn)
    },[columns])

    const toggleSortType = (column: any) => {
        setsortType(sortType === 'asc' ? 'desc' : 'asc');
        setSortColumn(column.accessor);
    }

    const renderTableHeader = () => {
        return <thead >
            <tr>
                {columns.map(column => {
                    return <th className='right' key={column.label}>{column.sortable?  
                    <span className="material-symbols-outlined" onClick={()=>toggleSortType(column)}>{sortType === 'asc'? "arrow_upward" : "arrow_downward"} </span>: null} 
                    {column.label} </th>
                })}
            </tr>
        </thead>

    }

    const sortFunction = (a : any, b:any)=>{
        if(sortType === 'asc'){
            return a[sortColumn].toLowerCase() > b[sortColumn].toLowerCase()  ? 1 : -1
        } else {
            return b[sortColumn].toLowerCase() > a[sortColumn].toLowerCase()  ? 1 : -1
        }
    }

    const renderTableBody = () => {
        
        return <tbody >
            { 
            data.sort(sortFunction).map((row, index) => {
                return <tr key={index}>
                 {columns.map(column => {
                     return <td key={column.label}> {column.render? column.render(row, index) : row[column.accessor] } </td>
                 })} 

             </tr>    
            }
            )} 
        </tbody>
    }
    
    return (
        <div className='table-wrap'>
            <table>
               { renderTableHeader()}
                {renderTableBody()}
            </table>
        </div>
    );
};

export default Table;
