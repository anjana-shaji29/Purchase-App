import React from 'react';
import './index.scss';

interface TableProps{
    columns : {
        label: string;
        accessor: string;
        render?: (row : any, index : number) => {

        }, 
        sortable?:boolean,
        sortcolumn?: string
    } [];
 data: any[]
}
const Table = ({ columns, data }: TableProps) => {

    console.log(data);

    const renderTableHeader = () => {
        return <thead >
            <tr>
                {columns.map(column => {
                    return <th key={column.label}>{column.sortable?  <span className="material-symbols-outlined"> arrow_upward </span>: null} {column.label} </th>
                })}
            </tr>
        </thead>

    }

    const renderTableBody = () => {
        return <tbody >
            {data.map((row, index) => {
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
