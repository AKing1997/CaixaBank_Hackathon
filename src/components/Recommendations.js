import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { CircularProgress, Typography, Box } from '@mui/material';

function Recommendations() {
    const transactions = useStore(transactionsStore); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        // Simulate data loading and handle possible errors
        // Instructions:
        // - Set loading to true before fetching the data.
        // - After a delay (simulated with setTimeout), set loading to false.
        // - You may simulate an error by setting the error state.
        setLoading(true);
        setTimeout(() => {
            // Simulate error in case of failure (optional)
            //setError('Failed to load transactions');
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        // Show a loading indicator while data is being fetched
        return <CircularProgress />;
    }

    if (error) {
        // Display an error message if something goes wrong
        return <Typography color="error">{error}</Typography>;
    }

    // Implement logic to compare expenses between months
    // Instructions:
    // - Use the transactions to calculate expenses for the current and previous months.
    // - Filter transactions by type ('expense') and by month/year.
    // - Compare the total expenses of this month with last month.
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
    const lastMonthYear = lastMonth.getFullYear();
    const lastMonthMonth = lastMonth.getMonth();

    const expenses = transactions.filter(transaction => transaction.type === 'expense'); // Implement logic to filter and extract expenses
    const expensesThisMonth = expenses
        .filter(transaction => {
            const date = new Date(transaction.date);
            return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
        })
        .reduce((total, transaction) => total + transaction.amount, 0); // Calculate total expenses for the current month
    
    const expensesLastMonth = expenses
        .filter(transaction => {
            const date = new Date(transaction.date);
            return date.getFullYear() === lastMonthYear && date.getMonth() === lastMonthMonth;
        })
        .reduce((total, transaction) => total + transaction.amount, 0); // Calculate total expenses for the last month

    // Generate a message based on the comparison between months
    // Instructions:
    // - If there are no expenses for last month, display a message encouraging the user to keep recording.
    // - If expenses have increased, calculate the percentage increase and suggest reviewing expenses.
    // - If expenses have decreased, congratulate the user and show the percentage decrease.
    // - If expenses are the same, notify the user that their spending hasn't changed.

    let message = ''; // Implement logic to generate the appropriate message based on the comparison

    if (expensesLastMonth === 0) {
        message = "Great job! It seems you didn't have any expenses last month. Keep recording your expenses!";
    } else if (expensesThisMonth > expensesLastMonth) {
        const increasePercentage = ((expensesThisMonth - expensesLastMonth) / expensesLastMonth) * 100;
        message = `Your expenses have increased by ${increasePercentage.toFixed(2)}% compared to last month. Consider reviewing your expenses.`;
    } else if (expensesThisMonth < expensesLastMonth) {
        const decreasePercentage = ((expensesLastMonth - expensesThisMonth) / expensesLastMonth) * 100;
        message = `Congratulations! Your expenses have decreased by ${decreasePercentage.toFixed(2)}% compared to last month. Keep it up!`;
    } else {
        message = "Your spending hasn't changed compared to last month. Keep an eye on your budget!";
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Recommendations</Typography>
            {/* Display the recommendation message according to the change in expenditure */}
            <Typography>{message}</Typography>
        </Box>
    );
}

export default Recommendations;
