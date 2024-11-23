import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { userSettingsStore } from '../stores/userSettingsStore';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
} from '@mui/material';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import ExportButton from './ExportButton'; // Import the refactored ExportButton

function Analysis() {
    const transactions = useStore(transactionsStore);
    const userSettings = useStore(userSettingsStore);

    const [timeFrame, setTimeFrame] = useState('monthly');
    const [reportType, setReportType] = useState('trend');

    // Prepare the data for the trend analysis report based on the selected time frame (daily, weekly, monthly, yearly).
    // Each object in the array should have the structure: { key, income, expense }
    const trendData = transactions.reduce((acc, transaction) => {
        const key = formatDateByTimeFrame(transaction.date, timeFrame);
        const existingEntry = acc.find(entry => entry.key === key);

        if (existingEntry) {
            if (transaction.type === 'income') {
                existingEntry.income += transaction.amount;
            } else {
                existingEntry.expense += transaction.amount;
            }
        } else {
            acc.push({
                key,
                income: transaction.type === 'income' ? transaction.amount : 0,
                expense: transaction.type === 'expense' ? transaction.amount : 0,
            });
        }
        return acc;
    }, []);// Replace with logic to group transactions by the selected time frame.

    // Prepare the data for the budget vs actual report.
    // Each object in the array should have the structure: { key, budget, actual }
    const getTotalExpensesByCategoryAndTimeFrame = (transactions, category) => {
        return transactions.reduce((acc, transaction) => {
            const formattedDate = formatDateByTimeFrame(transaction.date, timeFrame);
            const currentFormattedDate = formatDateByTimeFrame(new Date(), timeFrame);

            if (
                transaction.type === 'expense' &&
                transaction.category === category &&
                formattedDate >= currentFormattedDate
            ) {
                return acc + transaction.amount;
            }
            return acc;
        }, 0);
    };

    const getTotalExpensesByTimeFrame = (transactions) => {
        return transactions.reduce((acc, transaction) => {
            const formattedDate = formatDateByTimeFrame(transaction.date, timeFrame);
            const currentFormattedDate = formatDateByTimeFrame(new Date(), timeFrame);

            if (transaction.type >= 'expense' && formattedDate === currentFormattedDate) {
                return acc + transaction.amount;
            }
            return acc;
        }, 0);
    };

    const budgetData = Object.entries(userSettings.categoryLimits || {}).map(([category, budgetLimit]) => {
        return {
            key: `${formatDateByTimeFrame(new Date(), timeFrame)}_${category}`,
            budget: budgetLimit || 0,
            actual: getTotalExpensesByCategoryAndTimeFrame(transactions, category),
        };
    });

    budgetData.push({
        key: `Total_${formatDateByTimeFrame(new Date(), timeFrame)}`,
        budget: userSettings.totalBudgetLimit || 0,
        actual: getTotalExpensesByTimeFrame(transactions),
    });
    // Replace with logic to compare the actual expenses against the budget.

    const handleTimeFrameChange = (event) => {
        setTimeFrame(event.target.value);
    };

    const handleReportTypeChange = (event) => {
        setReportType(event.target.value);
    };

    // Prepare data for export based on selected report type
    const exportData = reportType === 'trend' ? trendData : budgetData;
    const exportHeaders = reportType === 'trend'
        ? ['key', 'income', 'expenses']
        : ['key', 'budget', 'actual'];

    return (
        <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
            <Typography variant="h4" gutterBottom color="primary">
                Advanced Analysis
            </Typography>

            {/* Display No Transactions Message */}
            {transactions.length === 0 && (
                <Typography variant="h6" color="text.secondary">
                    No transactions available.
                </Typography>
            )}

            {/* Controls */}
            <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel id="timeframe-select-label">Time Frame</InputLabel>
                        <Select
                            labelId="timeframe-select-label"
                            id="timeframe-select"
                            label="Time Frame"
                            // Implement logic to update the time frame state
                            value={timeFrame}
                            onChange={handleTimeFrameChange}
                        >
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                            <MenuItem value="yearly">Yearly</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel id="report-type-select-label">Report Type</InputLabel>
                        <Select
                            labelId="report-type-select-label"
                            id="report-type-select"
                            label="Report Type"
                            // Implement logic to update the report type state
                            value={reportType}
                            onChange={handleReportTypeChange}
                        >
                            <MenuItem value="trend">Trend Analysis</MenuItem>
                            <MenuItem value="budget">Budget vs. Actual</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Export Button */}
                {/* Instructions:
                    - Implement the ExportButton component with the appropriate data and headers.
                    - The data and headers should be based on the selected report type. */}
                <Grid item xs={12} sm={6} md={4}>
                    <ExportButton
                        data={exportData}
                        filename={`report-${reportType}-${timeFrame}.csv`}
                        headers={exportHeaders}
                        label='Export CSV'
                    />
                </Grid>
            </Grid>

            {/* Render the trend analysis chart if 'trend' is selected */}
            {reportType === 'trend' && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom color="text.secondary">
                                Income and Expenses Trend
                            </Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={trendData.sort((a, b) => {
                                    const dateA = new Date(a.key.split('/').reverse().join('-'));
                                    const dateB = new Date(b.key.split('/').reverse().join('-'));
                                    return dateA - dateB;
                                })}>
                                    <XAxis dataKey="key" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="income" stroke="#28B463" name="Income" />
                                    <Line type="monotone" dataKey="expense" stroke="#E74C3C" name="Expenses" />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            {/* Render the budget vs actual expenses chart if 'budget' is selected */}
            {/* Implement the Budget vs. Actual Expenses report
                Instructions:
                - Display a bar chart comparing the budgeted amounts to the actual expenses.
                - Use the budgetData array to render the chart.
            */}
            {reportType === 'budget' && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom color="text.secondary">
                                Budget vs Actual Expenses
                            </Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={budgetData}>
                                    <XAxis dataKey="key" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="budget" fill="#3498DB" name="Budget" />
                                    <Bar dataKey="actual" fill="#E74C3C" name="Actual" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            {/* Additional Analysis Sections */}
            <Grid container spacing={4} sx={{ mt: 4 }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom color="text.secondary">
                            Savings Goals
                        </Typography>
                        <Typography>No savings goals set.</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom color="text.secondary">
                            Net Worth Over Time
                        </Typography>
                        <Typography>No net worth data available.</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

function formatDateByTimeFrame(date, timeFrame) {
    const d = new Date(date);
    switch (timeFrame) {
        case 'daily':
            return d.toLocaleDateString();
        case 'weekly':
            const weekStart = new Date(d.setDate(d.getDate() - d.getDay()));
            return `${weekStart.toLocaleDateString()} - ${d.toLocaleDateString()}`;
        case 'monthly':
            return `${d.getMonth() + 1}/${d.getFullYear()}`;
        case 'yearly':
            return `${d.getFullYear()}`;
        default:
            return d.toLocaleDateString();
    }
}

export default Analysis;