import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
function ForgotPasswordPage() {
    const [email, setEmail] = useState(''); 
    const [message, setMessage] = useState(''); 

    const handleSubmit = (e) => {
        e.preventDefault(); 

        // Simulate sending a password recovery email.
        // Instructions:
        // - If the email matches 'user@example.com', display a success message.
        // - If the email does not match, display an error message indicating the email is not found.
        if (email === "user@example.com") {
            setMessage("Success! A password reset link has been sent to your email.");
        } else {
            setMessage("Email not found. Please check and try again.");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h4" color='primary' gutterBottom>
                Forgot Password
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                />
                <Button sx={{ mb: 2,mt: 2 }} fullWidth variant="contained" color="primary" type="submit">
                    Send Reset Link
                </Button>
                <Divider />
                <Button sx={{ mb: 2,mt: 2 }} color="primary" component={Link} to="/login" fullWidth>
                    <ArrowBackIcon /> Back to login
                </Button>
            </form>
            {message && <Typography color="secondary" sx={{ mt: 2 }}>{message}</Typography>}
        </Box>
    );
}

export default ForgotPasswordPage;
