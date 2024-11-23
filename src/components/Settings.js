import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';
import { budgetAlertStore, updateBudgetAlert } from '../stores/budgetAlertStore'; // Importar el store de alertas
import {
    Box,
    Typography,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Grid,
    Paper,
    Alert,
} from '@mui/material';
import { expenseCategories } from '../constants/categories';
import { transactionsStore } from '../stores/transactionStore';

function Settings() {
    const userSettings = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);

    const [budgetExceeded, setBudgetExceeded] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [totalBudgetLimit, setTotalBudgetLimit] = useState(userSettings.totalBudgetLimit);
    const [alertsEnabled, setAlertsEnabled] = useState(userSettings.alertsEnabled);
    const [categoryLimits, setCategoryLimits] = useState({});

    useEffect(() => {
        setTotalBudgetLimit(userSettings.totalBudgetLimit);
        setAlertsEnabled(userSettings.alertsEnabled);
        setCategoryLimits(userSettings.categoryLimits);
    }, [userSettings]);

    const handleSave = () => {
	    // Instructions:
	        // - Validate the total category limits.
	        // - If the total category limits exceed the total budget limit, set an error message.
	        // - If validation passes, clear the error message and save the updated settings to the store.
	        // - After saving, display a success message indicating that the settings were saved successfully.
	
	        // Instructions:
	        // - Check if the total expense exceeds the total budget limit.
	        // - If exceeded, set the budgetExceeded state to true and update the budget alert.
	    
        const totalCategoryLimit = Object.values(categoryLimits).reduce((sum, limit) => sum + Number(limit), 0);
        
        if (totalCategoryLimit > totalBudgetLimit) {
            setError('The total category limits exceed the total budget limit.');
            setBudgetExceeded(false);
            return;
        }

        const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        if (totalExpenses > totalBudgetLimit) {
            setBudgetExceeded(true);
            updateBudgetAlert(true);
        } else {
            setBudgetExceeded(false);
            updateBudgetAlert(false);
        }
        
        setError('');
        userSettingsStore.set({ ...userSettings, totalBudgetLimit, alertsEnabled, categoryLimits });
        setSuccessMessage('Settings saved successfully!');
    };

    const handleAlertsChange = (event) => {
        setAlertsEnabled(event.target.checked);
    };

    const handleBudgetLimitChange = (event) => {
        setTotalBudgetLimit(event.target.value);
    };

    const handleCategoryLimitChange = (category) => (event) => {
        setCategoryLimits({
            ...categoryLimits,
            [category]: event.target.value,
        });
    };

    return (
        <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
            <Typography variant="h4" gutterBottom color="primary">
                Settings
            </Typography>

            <FormControlLabel
                control={<Switch color="primary" checked={alertsEnabled} onChange={handleAlertsChange} />}
                label="Enable Alerts"
				// Instructions: Add `checked` and `onChange` to control the `alertsEnabled` state
            />

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Total Budget Limit (€)</Typography>
                <TextField
                    type="number"
                    name="totalBudgetLimit"
                    fullWidth
                    margin="normal"
                    inputProps={{ min: 0, step: '0.01' }}
                    sx={{ mt: 1 }}
                    // Instructions: Bind the value and `onChange` to control the `totalBudgetLimit` state
                	value={totalBudgetLimit}
                    onChange={handleBudgetLimitChange}
                />
            </Paper>

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Category Budget Limits (€)</Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {expenseCategories.map((category) => (
                        <Grid item xs={12} sm={6} md={4} key={category}>
                            <TextField
                                label={category}
                                type="number"
                                fullWidth
                                margin="normal"
                                inputProps={{ min: 0, step: '0.01' }}
								value={categoryLimits[category]}
                                onChange={handleCategoryLimitChange(category)}
                                // Instructions: Bind value and `onChange` for each category's budget limit state
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ boxShadow: 2 }}
                    // Instructions: Add `onClick` handler to save the settings by calling `handleSave`
                    onClick={handleSave}
                >
                    Save Settings
                </Button>
            </Box>

            {budgetExceeded && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    You have exceeded your budget limit of {totalBudgetLimit} €!
                </Alert>
            )}

            {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {successMessage}
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
}

export default Settings;
