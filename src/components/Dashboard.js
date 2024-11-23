import React, { Profiler } from 'react';
import { useStore } from '@nanostores/react';
import { Box, Typography, Grid, Paper, Alert, ButtonGroup } from '@mui/material';
import ExportButton from './ExportButton';
import DownloadProfilerData from './DownloadProfilerData';
import { onRenderCallback } from '../utils/onRenderCallback';
import { transactionsStore } from '../stores/transactionStore';

// Lazy load components for performance optimization
const AnalysisGraph = React.lazy(() => import('./AnalysisGraph'));
const BalanceOverTime = React.lazy(() => import('./BalanceOverTime'));
const Statistics = React.lazy(() => import('./Statistics'));
const Recommendations = React.lazy(() => import('./Recommendations'));
const RecentTransactions = React.lazy(() => import('./RecentTransactions'));

function Dashboard() {
    const transactions = useStore(transactionsStore);

    // Replace the placeholder values with calculations for total income, total expenses, and balance.
    const totalIncome = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0); // Calculate total income from transactions

    const totalExpense = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0); // Calculate total expenses from transactions

    const balance = totalIncome - totalExpense; // Calculate balance based on total income and expenses

    const exportHeaders = ['id', 'description', 'amount', 'type', 'category', 'date'];

    return (
        <Profiler id="Dashboard" onRender={onRenderCallback}>
            <Box sx={{ p: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Financial Summary
                </Typography>

                {/* Action Buttons Section */}
                {/* Instructions:
                    - Add a section with ExportButton and DownloadProfilerData components.
                    - The ExportButton should export the transaction data as a CSV file.
                    - The DownloadProfilerData button should export profiler data in JSON format.
                */}
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled button group"
                >
                    <ExportButton 
                        data={transactions}
                        filename={`report-tansactions.csv`}
                        headers={exportHeaders}
                        label='Export Transactions'
                    />
                    <DownloadProfilerData />
                </ButtonGroup>

                {/* Totals Section */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Total Income
                            </Typography>
                            <Typography variant="h5" data-testid="total-income"  style={{ color: 'green' }}>
                                {/* Show total income */}
                                {totalIncome.toFixed(2)} EUR
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Total Expenses
                            </Typography>
                            <Typography variant="h5" data-testid="total-expenses" style={{ color: 'red' }}>
                                {/* Show total expenses */}
                                {totalExpense.toFixed(2)} EUR
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Balance
                            </Typography>
                            <Typography 
                                variant="h5" 
                                data-testid="balance" 
                                style={{ color: balance < 0 ? 'red' : (balance > 0 ? 'green' : 'blue') }}
                            >
                                {/* Show the balance */}
                                {balance.toFixed(2)} EUR
                            </Typography>
                            {/* Instructions:
                                - If the balance is negative, show a warning message.
                                - Display a message or alert if the budget limit has been exceeded.
                            */}
                            {balance < 0 && (
                                <Alert severity="warning">
                                    Your balance is negative! Consider reviewing your expenses.
                                </Alert>
                            )}
                        </Paper>
                    </Grid>
                </Grid>

                {/* Statistics and Recommendations Section */}
                {/* Instructions:
                    - Use the `Statistics` component to show key financial metrics.
                    - Use the `Recommendations` component to display financial advice.
                */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <Statistics />
                        </React.Suspense>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <Recommendations />
                        </React.Suspense>
                    </Grid>
                </Grid>

                {/* Charts Section */}
                {/* Instructions:
                    - Use the `AnalysisGraph` component to show a breakdown of income and expenses by category.
                    - Use the `BalanceOverTime` component to show the user's balance over time.
                */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <React.Suspense fallback={<div>Loading Graph...</div>}>
                            <AnalysisGraph />
                        </React.Suspense>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <React.Suspense fallback={<div>Loading Balance Over Time...</div>}>
                            <BalanceOverTime />
                        </React.Suspense>
                    </Grid>
                </Grid>

                {/* Recent Transactions Section */}
                {/* Instructions:
                    - Display a list or table of recent transactions using the `RecentTransactions` component.
                    - Ensure that each transaction shows key details such as description, amount, type, and date.
                */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12}>
                        <React.Suspense fallback={<div>Loading Recent Transactions...</div>}>
                            <RecentTransactions transactions={transactions} />
                        </React.Suspense>
                    </Grid>
                </Grid>
            </Box>
        </Profiler>
    );
}

export default Dashboard;