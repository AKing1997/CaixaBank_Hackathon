import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from "@nanostores/react"; 

import { 
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    Box,
    Button,
    Badge,
    Typography,
    Avatar,
    Tooltip
 } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SupportIcon from '@mui/icons-material/Support'; 
import NotificationPopup from './NotificationPopup';

import { authStore, logout } from "../stores/authStore";
import { resetBudgetAlert, budgetAlertStore } from "../stores/budgetAlertStore";

const Navbar = ({ toggleTheme, isDarkMode }) => {
    const { isVisible, message, notificationCount } = useStore(budgetAlertStore);
    const [popupVisible, setPopupVisible] = useState(false);

    const handleIconClick = () => {
        setPopupVisible(!popupVisible);
    };

    const handleClose = () => {
        setPopupVisible(false);
        resetBudgetAlert();
    };

    const [drawerOpen, setDrawerOpen] = useState(false);
    const { isAuthenticated, user } = useStore(authStore);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    {isAuthenticated && (
                        <IconButton color='inherit' edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}
                                       
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' }, alignItems: 'center' }}
                    >
                        <Avatar
                            alt="CaixaBank Logo"
                            src={isDarkMode ? "/assets/caixabank-icon-blue.png" : "/assets/caixabank-icon.png"}
                            sx={{ mr: 1 }}
                        />
                        CaixaBank
                    </Typography>

                    {/* Navigation links */}
                    {/* Instructions:
                        - Implement navigation links for authenticated and unauthenticated users.
                        - If the user is authenticated, show links like "Dashboard", "Settings", and a "Logout" button.
                        - If the user is not authenticated, show "Login" and "Register" links. 
                        - Use the `Link` component from `react-router-dom`. */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {
                        isAuthenticated &&
                        (<>
                            <IconButton onClick={isVisible && handleIconClick}>
                                <Badge badgeContent={notificationCount} color="success">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>

                            {isVisible && popupVisible && (
                                <NotificationPopup open={popupVisible} message={message} onClose={handleClose} />
                            )}
                                 
                            {/* User avatar */}
                            {/* Instructions:
                                - Display the user's avatar if they are logged in.
                                - Use an Avatar component and display the user's email as a tooltip or alt text. */}
                            <Tooltip title={user.email}>
                                <Avatar sx={{ ml: 2 }}>
                                {user.email.charAt(0).toUpperCase()}
                                </Avatar>
                            </Tooltip>
                        </>)}
                    </Box>
                </Toolbar>
            </AppBar>

            {isAuthenticated && 
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    <Box 
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                        fullWidth
                        sx={{ width: { xs: '100%', md: 250 }, position: 'relative', height: '100vh' }}
                    >
                        {/* Drawer navigation links */}
                        {/* Instructions:
                            - Display navigation links inside the drawer.
                            - Links should be based on the user's authentication status.
                            - For example, show links like "Dashboard", "Transactions", "Settings" if authenticated.
                            - Use the `Link` component from `react-router-dom`. */}

                        <Typography sx={{ p: 2, background: '#007eae', color: 'white' }} variant="h6" gutterBottom>
                            Menu
                        </Typography>
                        <Button
                            variant={isActive("/") ? "contained" : "text"}
                            color="primary"
                            component={Link}
                            to="/"
                            startIcon={<DashboardIcon />}
                            fullWidth
                            sx={{ 
                                justifyContent: "flex-start",
                                pl: 2,
                                borderRadius: 0
                            }}
                        >
                            Dashboard
                        </Button>
                        <Button
                            variant={isActive("/transactions") ? "contained" : "text"}
                            color="primary"
                            component={Link}
                            to="/transactions"
                            startIcon={<AccountBalanceIcon />}
                            fullWidth
                            sx={{ 
                                justifyContent: "flex-start",
                                pl: 2,
                                borderRadius: 0
                            }}
                        >
                            Transactions
                        </Button>
                        <Button
                            variant={isActive("/settings") ? "contained" : "text"}
                            color="primary"
                            component={Link}
                            to="/settings"
                            startIcon={<SettingsIcon />}
                            fullWidth
                            sx={{ 
                                justifyContent: "flex-start",
                                pl: 2,
                                borderRadius: 0
                            }}
                        >
                            Settings
                        </Button>
                        <Button
                            variant={isActive("/analysis") ? "contained" : "text"}
                            color="primary"
                            component={Link}
                            to="/analysis"
                            startIcon={<AnalyticsIcon />}
                            fullWidth
                            sx={{ 
                                justifyContent: "flex-start",
                                pl: 2,
                                borderRadius: 0
                            }}
                        >
                            Analysis
                        </Button>
                        <Button
                            variant={isActive("/support") ? "contained" : "text"}
                            color="primary"
                            component={Link}
                            to="/support"
                            startIcon={<SupportIcon />}
                            fullWidth
                            sx={{ 
                                justifyContent: "flex-start",
                                pl: 2,
                                borderRadius: 0
                            }}
                        >
                            Support
                        </Button>


                        <ButtonGroup 
                            fullWidth
                            orientation="vertical"
                            sx={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                borderRadius: 0
                            }}
                        >
                            <Button
                                fullWidth
                                variant="contained"
                                color="default"
                                startIcon={isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                                onClick={toggleTheme}
                                sx={{
                                    pl: 2,
                                    borderRadius: 0
                                }}
                            >
                                {isDarkMode ? 'Light' : 'Dark'}
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                onClick={logout}
                                startIcon={<LogoutIcon />}
                                sx={{
                                    borderRadius: 0
                                }}
                            >
                                Logout
                            </Button>
                        </ButtonGroup>
                    </Box>
               </Drawer>
            }
        </>
    );
};

export default Navbar;