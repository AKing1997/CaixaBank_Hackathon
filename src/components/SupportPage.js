import React, { useState, useEffect, Profiler, Suspense } from 'react';
import { Box, Typography, CircularProgress, Paper, Avatar, List, ListItem, ListItemAvatar, ListItemText, TextField, Button } from '@mui/material';
import { onRenderCallback } from '../utils/onRenderCallback';
import UserCardList from './UserCardList'
function SupportPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Implement the effect to get user data from the API
    // Instructions:
    // - Use the `useEffect` hook to make the request to the `https://jsonplaceholder.typicode.com/users` URL.
    // - If the response is successful, save the data in the `users` state and change `loading` to false.
    // - If there is an error, it saves the error message in `error` state and changes `loading` to false.

    useEffect(() => {
        const fetchUsers = async () => {
            try {
              const response = await fetch(
                "https://jsonplaceholder.typicode.com/users"
              );
              if (!response.ok) {
                throw new Error("Failed to fetch users");
              }
              const data = await response.json();
              setUsers(data);
              setLoading(false);
            } catch (err) {
              setError(err.message);
              setLoading(false);
            }
        };
      
        fetchUsers();
    }, []);

    // Filter users by search term
    // Instructions:
    // - Implement logic to filter users by `searchTerm`.
    // - Use the `filter` method to check if the `user.name` contains the `searchTerm`.
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Display loading spinner
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        // Display error message
        return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Typography variant="h6" color="error">
                {error}
              </Typography>
            </Box>
          );
    }

    return (
        <Profiler id="SupportPage" onRender={onRenderCallback}>
            <Box>
                <Typography variant="h4" gutterBottom color="primary">
                    Support Contacts
                </Typography>

                {/* Implement the search bar */}
                {/* Instructions:
                    - Uses the `TextField` component of Material UI.
                    - The `label` must be ‘Search by Name’ and must be a fullWidth text field.
                    - The value of the field must be linked to `searchTerm` and must be updated when the user types into the field.
                */}

                {/* Here is the search bar */}
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ mb: 4 }}
                />

                {/* Implement the support contact list */}
                {/* Instructions:
                    - Use the `List` component of Material UI to display contacts.
                    - Within each `ListItem`, use `ListItemAvatar` to display an avatar with the `Avatar` component.
                    - For text, use `ListItemText` with `primary` as the name and email, and `secondary` for the phone and company.
                    - Add a contact button with the `Button` component of Material UI, which uses the `href` property to open the email with `mailto:${user.email}`.
                    - Don't forget to add `sx` to style the list.
                */}

                <UserCardList filteredUsers={filteredUsers} />
            </Box>
        </Profiler>
    );
}

export default SupportPage;