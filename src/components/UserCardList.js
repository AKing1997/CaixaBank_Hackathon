import React, { Suspense } from 'react';
import {
    CircularProgress,
    Paper,
    Card,
    CardContent,
    CardActions,
    Typography,
    Avatar,
    Button
} from '@mui/material';

import Grid from '@mui/material/Grid2';

const UserCardList = ({ filteredUsers }) => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <Paper sx={{ mb: 5, borderRadius: 0, boxShadow: 0, backgroundColor: 'transparent' }}>
                {filteredUsers.length === 0 ? ( // Verificación si no hay usuarios
                    <Typography variant="h6" align="center" color="text.secondary">
                        No se ha encontrado el soporte.
                    </Typography>
                ) : (
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {filteredUsers.map((user, index) => (
                            <Grid key={index} size={{ xs: 12, sm: 4, md: 4 }}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ marginRight: 2 }}>{user.name.charAt(0)}</Avatar>
                                        <div>
                                            <Typography variant="h6">{user.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {user.email}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Phone: {user.phone} | Company: {user.company.name}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            href={`mailto:${user.email}`}
                                        >
                                            Contact
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Paper>
        </Suspense>
    );
};

export default UserCardList;
