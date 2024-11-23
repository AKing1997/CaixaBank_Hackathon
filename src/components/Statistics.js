import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { Paper, Typography } from '@mui/material';

function Statistics() {
    const transactions = useStore(transactionsStore);

    // Filter transactions by 'expense' type
    // Instructions:
    // - Implement logic to filter the transactions array to only include expenses.
    const expenses = transactions.filter(
        (transaction) => transaction.type === "expense"
    ); // Replace with logic to filter expenses

    // Calculate total expense
    // Instructions:
    // - Sum the amounts of all expense transactions.
    const totalExpense = expenses.reduce(
        (total, transaction) => total + transaction.amount,
        0
    ); // Replace with logic to calculate total expense

    // Get unique dates from expenses
    // Instructions:
    // - Extract the unique dates from the expense transactions.
    // - Calculate the average daily expense.
    const uniqueDates = [
        ...new Set(
            expenses.map((transaction) => new Date(transaction.date).toDateString())
        ),
    ]; // Replace with logic to get unique dates
    const averageDailyExpense = uniqueDates.length > 0 ? totalExpense / uniqueDates.length : 0; // Replace with logic to calculate average daily expense

    // Find the category with the highest spending
    // Instructions:
    // - Use the categoryExpenses object to accumulate the total amount spent in each category.
    // - Implement logic to determine which category has the highest total expense.
    // - Ensure that `maxCategory` contains the category with the highest spending.
    const categoryExpenses = {}; // Replace with logic to calculate expenses per category
    expenses.forEach((transaction) => {
        const category = transaction.category;
        if (!categoryExpenses[category]) {
            categoryExpenses[category] = 0;
        }
        categoryExpenses[category] += transaction.amount;
    });
    let maxCategory = null;
    let maxAmount = 0;
    for (const [category, amount] of Object.entries(categoryExpenses)) {
        if (amount > maxAmount) {
            maxAmount = amount;
            maxCategory = category;
        }
    }

    return (
        <Paper sx={{ padding: 2, mt: 2 }}>
            <Typography variant="h6">Key Statistics</Typography>
            <Typography>
                Average Daily Expense: {averageDailyExpense.toFixed(2)} €
            </Typography>
            <Typography>
                Highest Spending Category:{' '}
                {maxCategory
                    ? `${maxCategory} (${categoryExpenses[maxCategory].toFixed(2)} €)`
                    : 'No data available'}
            </Typography>
        </Paper>
    );
}

export default Statistics;