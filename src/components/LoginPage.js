import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../stores/authStore';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Grid
} from '@mui/material';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showCredentials, setShowCredentials] = useState(false);
    const navigate = useNavigate();

    const defaultCredentials = {
        email: 'default@example.com',
        password: 'password123'
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Validate that fields are not empty
        // Instructions:
        // - Check if the email and password fields are filled.
        if (!email || !password) {
            // - If either is empty, set an appropriate error message.
            setError("Both email and password are required.");
            return;
        }

        // Validate credentials
        // Instructions:
        // - Check if the entered credentials match the default credentials or the stored user credentials.
        // - If valid, call the `login` function and navigate to the homepage.
        // - If invalid, set an error message.
        if (
            (email === defaultCredentials.email &&
              password === defaultCredentials.password) ||
            (localStorage.getItem("user") &&
              JSON.parse(localStorage.getItem("user")).email === email)
          ) {
            login({ email });
            navigate("/");
          } else {
            setError("Invalid email or password. Please try again.");
          }
    };

    const handleShowDefaultCredentials = () => {
        // Show default credentials in case the user requests it
        setEmail(defaultCredentials.email);
        setPassword(defaultCredentials.password);
        setShowCredentials(true);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, mb: 8, p: 2, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h4" color="primary" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </form>

            {/* Show error message when applicable */}
            {/* - Use the Alert component to display the error message if one exists. */}
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
            {/* - Ensure that registration and forgot password options are displayed below the error message if present. */}
            <Box sx={{ mt: 2 }}>
                <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate("/register")}
                >
                    Register
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/forgot-password")}
                    sx={{ ml: 2 }}
                >
                    Forgot Password?
                </Button>
            </Box>

            {showCredentials && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    <strong>Email:</strong> {defaultCredentials.email}<br />
                    <strong>Password:</strong> {defaultCredentials.password}
                </Alert>
            )}

            <Button
                variant="text"
                color="secondary"
                onClick={handleShowDefaultCredentials}
                sx={{ mt: 2 }}
            >
                Show Default Credentials
            </Button>
        </Box>
    );
}

export default LoginPage;
