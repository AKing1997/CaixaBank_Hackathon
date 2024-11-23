import React from 'react';
import { Box, Typography, Paper, IconButton, InputBase, Button } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = (isDarkMode) => {
    return (
        <Box component="footer"
            sx={{
                p: 3,
                textAlign: "center",
                backgroundImage: "url('/assets/bgmaps.png')", 
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderRadius: 2,
                boxShadow: 1,
            }}
        >
            {/* Search bar */}
            <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
                <Paper component="form"
                    sx={{ display: "flex", alignItems: "center", width: { xs: '90%', md: '40%' } }}>
                    <IconButton aria-label="search">
                        {/* Add the search icon here */}
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        placeholder="Find your branch..."
                        sx={{ ml: 1, flex: 1}}
                    />
                    <Button type="submit">Search</Button>
                </Paper>
            </Box>

            <Typography 
                variant="h6" 
                sx={{ mb: 2, color: 'black' }}
            >
                © {new Date().getFullYear()} Personal Finance Assistant
            </Typography>

            {/* Social media icons */}
            {/* Instructions:
                - Add IconButtons for Facebook, Twitter, and Instagram.
                - Ensure each icon button links to the appropriate social media page.
                - Use the respective Material UI icons for Facebook, Twitter, and Instagram. */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <IconButton
                    aria-label="Facebook"
                    component="a"
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    color='inherit'
                >
                    <FacebookIcon sx={{ color: 'black' }} />
                </IconButton>
                <IconButton
                    aria-label="Twitter"
                    component="a"
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    color='inherit'
                >
                    <TwitterIcon sx={{ color: 'black' }} />
                </IconButton>
                <IconButton
                    aria-label="Instagram"
                    component="a"
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    color='inherit'
                >
                    <InstagramIcon sx={{ color: 'black' }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Footer;
