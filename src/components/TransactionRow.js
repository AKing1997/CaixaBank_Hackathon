import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TransactionRow({ transaction, onEdit, onDelete }) {
    return (
        <TableRow key={transaction.id}>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.amount.toFixed(2)}</TableCell>
            <TableCell>{transaction.type === 'income' ? 'Income' : 'Expense'}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>{new Date(transaction.date).toLocaleDateString('en-US')}</TableCell>
            <TableCell>
                {/* Add functionality for the edit button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(transaction)}
                    sx={{ marginRight: 1 }} // Space between buttons
                    startIcon={<EditIcon />} // Edit icon added
                >
                    Edit
                </Button>
                {/* Add functionality for the delete button */}
                <Button
                    variant="contained"
                    color="error" // "Danger" color for Delete button
                    onClick={() => onDelete(transaction.id)}
                    startIcon={<DeleteIcon />} // Delete icon added
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default TransactionRow;
