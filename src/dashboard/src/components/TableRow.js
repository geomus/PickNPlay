import React from 'react';


const TableRow = (props) => {
    return(
        <tr>
            <td>{props.name}</td>
            <td>{props.category}</td>
            <td>$ {props.price}</td>
            <td>{props.id}</td>
        </tr>
    )
}
export default TableRow;