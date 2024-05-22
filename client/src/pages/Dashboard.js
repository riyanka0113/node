import { Box, Button, Card, Divider, Snackbar, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Analytics from '../component/Analytics';
import DashboardTable from '../component/DashboardTable';
import apiService from '../utils/api.service';

const Dashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null)
    const columns = ['No', 'Name', 'Size', 'Access setting', 'Shared with', 'Created by'];
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('')

    useEffect(() => {
        apiService.getAnalytics(id)
            .then(response => {
                const responseData = response.data.data;
                const publicFiles = responseData.files.filter(file => file.permissions?.some(permission => permission.type === 'anyone'))
                const sharedFiles = responseData.files.filter(file => file.permissions?.length > 1);
                setData({
                    publicFiles,
                    sharedFiles,
                    totalFiles: responseData.files.length,
                    peopleCount: responseData.peopleCount,
                    fileTypes: responseData.fileTypes
                });
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            });
    }, [id]);

    const handleRevoke = () => {
        apiService.revoke(id)
            .then(response => {
                setOpen(true);
                navigate('/')
            })
            .catch(error => {
                console.error(error);
            });
    };

    if (!data || error) {
        return (
            <Stack height="100vh" width="100%" justifyContent="center" alignItems="center">
                <Typography variant='h3'>{error ? 'Something went to wrong' : 'Loading...'}</Typography>
            </Stack>);
    }

    return (
        <Box sx={{ marginY: '3rem', p: '3rem' }}>
            <Stack direction='row' alignItems='flex-end' justifyContent="space-between">
                <Typography variant="h3">Google Drive Analytics</Typography>
                <Button type="button" variant='contained' onClick={() => handleRevoke()}>Revoke Google Drive Access</Button>
            </Stack>

            <Card sx={{ marginY: '2rem', p: '2rem' }}>
                <Analytics data={data} />
            </Card>

            <Divider />

            <Stack my="2rem">
                <Typography variant='h6'>1.Files Are Publicly Accessible For Anyone With The Link</Typography>
                <DashboardTable columns={columns} data={data?.publicFiles} />
            </Stack>

            <Divider />

            <Stack my="2rem">
                <Typography variant='h6'>2.Files Are Shared Externally</Typography>
                <DashboardTable columns={columns} data={data?.sharedFiles} />
            </Stack>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={() => setOpen(false)}
                message="Google drive access revoked"
            />
        </Box>
    );
};

export default Dashboard;
