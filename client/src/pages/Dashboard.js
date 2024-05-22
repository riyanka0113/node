import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Avatar, Box, Button, Card, Chip, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Analytics from '../component/Analytics';

const Dashboard = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const columns = ['No','Name', 'Size', 'Access setting', 'Shared with', 'Created by'];

    useEffect(() => {
        axios.get(`http://localhost:5000/analytics/${id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const handleRevoke = () => {
        axios.post('http://localhost:5000/revoke',{userId: id})
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    if (!data) return (<><div>Loading...</div></>);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

   
    return (
        <Box sx={{marginY: '3rem', p: '3rem' }}>
            <Stack direction='row' alignItems='flex-end' justifyContent="space-between">
                <Typography variant="h3">Google Drive Analytics</Typography>
                <Button type="button" variant='contained' onClick={() => handleRevoke()}>Revoke Google Drive Access</Button>
            </Stack>
            
            <Card sx={{marginY:'2rem', p: '2rem'}}>
                <Analytics data={data} />
            </Card>

            
            <Stack>
                <Typography variant='h6'>Files:</Typography>
                <Paper sx={{ width: '100%' }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns?.map((col) => (
                                        <TableCell id={col} key={col}>
                                            {col}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.files.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage,
                                )?.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <Typography variant='body1'>{i + 1}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={row.webViewLink} target='_blank' variant='body1'color="inherit" textTransform='capitalize' underline="hover" className='link'>{row.name}</Link>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant='body1'>{row.size}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant='body1'>
                                                {row.permissions?.find(p => p.type === 'anyone') ? 
                                                    <Chip icon={<LanguageIcon/>} label="Anyone with link" />:
                                                    <Chip icon={<LockOpenIcon/>} label="External" />
                                                }
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction='row' alignItems='center' spacing={2}>
                                                <GroupOutlinedIcon/>
                                                <Typography variant='body1'>{row.permissions?.filter(p => p.type !== 'anyone').length || 0}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Stack component={Link} href={`mailto:${row.owners[0].emailAddress}`} direction='row' alignItems='center' spacing={2} className='link' underline='hover' color='inherit'>
                                                <Avatar alt={row.owners[0].displayName} src={row.owners[0].photoLink} />
                                                <Typography variant='body1'>{row.owners[0].displayName}</Typography>
                                                <MailOutlineIcon/>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 50, 100, 1000]}
                        component="div"
                        count={data.files.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </Stack>
        </Box>
    );
};

export default Dashboard;
