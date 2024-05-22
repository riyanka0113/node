import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const AnalyticsCard = ({ count, title, description }) => {
    return (
        <Card variant='outlined' sx={{ height: '21rem',marginY: '1rem !important'}}>
            <CardContent sx={{textAlign: 'center'}}>
                <Typography variant="h1" marginY="1rem">
                    {count}
                </Typography>
                <Typography variant="h5">
                    {title}
                </Typography>
                <Typography variant='body2'>{description}</Typography>
            </CardContent>
        </Card>
    );
};

export default AnalyticsCard;
