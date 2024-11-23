import React, { useState, useMemo, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import {
    transactionsStore,
    deleteTransaction as deleteTransctionStore,
} from '../stores/transactionStore';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
    Typography,
	TablePagination,
} from '@mui/material';
import TransactionForm from "./TransactionForm";
import TransactionRow from "./TransactionRow";
import { allCategories } from '../constants/categories';

function TransactionList() {
    const transactions = useStore(transactionsStore);

    const [filterCategory, setFilterCategory] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortField, setSortField] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Implement delete functionality
    // Instructions:
    // - Implement the logic to delete a transaction by its ID.
    // - Make sure the transactions state/store is updated after deletion.
    const deleteTransaction = useCallback((id) => {
        // Implement functionality to delete a transaction
        deleteTransctionStore(id);
    }, [transactions]);

    // Implement edit functionality
    // Instructions:
    // - Implement logic to edit a transaction.
    // - Ensure the updated transaction is saved in the store.
    const handleEdit = useCallback((transaction) => {
        // Implement functionality to edit a transaction
        setEditingTransaction(transaction);
        setOpenForm(true);
    }, []);

    const filteredTransactions = useMemo(() => {
        return transactions.filter(transaction => {
            const categoryMatch = filterCategory ? transaction.category === filterCategory : true;
            const typeMatch = filterType ? transaction.type === filterType : true;
            return categoryMatch && typeMatch;
        }).sort((a, b) => {
            if (sortField === 'amount') {
                return a.amount - b.amount;
            }
            if (sortField === 'date') {
                return new Date(a.date) - new Date(b.date);
            }
            return 0;
        });
    }, [transactions, filterCategory, filterType, sortField]);

    const paginatedTransactions = useMemo(() => {
        const start = page * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredTransactions.slice(start, end);
    }, [filteredTransactions, page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page when changing rows per page
    };
    return (
        <Box sx={{ mt: 4, mb: 5 }}>
            <Typography variant="h4" gutterBottom>
                Transaction List
            </Typography>

            {/* Add transaction */}
            {/* Instructions:
                - Implement the logic to open a form for adding a new transaction.
                - Trigger the form/modal through the onClick event. */}
            <Button variant="contained" color="primary" onClick={() => setOpenForm(true)}>
                Add Transaction
            </Button>

            {/* Filters */}
            {/* Instructions:
                - Implement category and type filters using Material UI's `Select` component.
                - Update the filterCategory and filterType state values when the user makes a selection.
                - Apply the selected filters to the displayed transactions. */}
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                <FormControl sx={{ minWidth: 120 }} margin="normal">
                    <InputLabel id="filter-category-label">Category</InputLabel>
                    <Select
                        labelId="filter-category-label"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        label="Category"
                        name="category"
                        inputProps={{ name: 'filterCategoryForm' }}
                    >
                        <MenuItem value="">All</MenuItem>
                        {/* Add additional categories dynamically */}
                        {allCategories.map((cat) => (
                            <MenuItem value={cat} key={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }} margin="normal">
                    <InputLabel id="filter-type-label">Type</InputLabel>
                    <Select
                        labelId="filter-type-label"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        label="Type"
                        name="type"
                        inputProps={{ name: 'filterTypeForm' }}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }} margin="normal">
                    <InputLabel id="sort-field-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-field-label"
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                        label="Sort By"
                        name="sort_by"
                        inputProps={{ name: 'sortByForm' }}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="amount">Amount</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Table of transactions */}
            {/* Instructions:
                - Render the transactions in a table format using Material UI's `Table` component.
                - For each transaction, display the following details: description, amount, type, category, and date.
                - Implement the action buttons (Edit, Delete) within each row for managing transactions. */}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount (€)</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedTransactions.map((transaction) => (
                            <TransactionRow 
                                key={transaction.id}
                                transaction={transaction}
                                onEdit={handleEdit}
                                onDelete={deleteTransaction}
                            />
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredTransactions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {openForm && (
                <TransactionForm 
                    transactionToEdit={editingTransaction}
                    onClose={() => {
                        setOpenForm(false);
                        setEditingTransaction(null);
                    }}
                />
            )}
        </Box>
    );
}

export default TransactionList;
