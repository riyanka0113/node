import { Avatar, Chip, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useState } from 'react';
import { formatSize } from '../utils/formate';

const DashboardTable = ({ columns, data }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', mt: '2rem' }}>
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
                        {data?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                        )?.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Typography variant='body1'>{i + 1}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Link href={row.webViewLink} target='_blank' variant='body1' color="inherit" textTransform='capitalize' underline="hover" className='link'>{row.name}</Link>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='body1'>{formatSize(row.size)}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='body1'>
                                        {row.permissions?.find(p => p.type === 'anyone') ?
                                            <Chip icon={<LanguageIcon />} label="Anyone with link" /> :
                                            <Chip icon={<LockOpenIcon />} label="External" />
                                        }
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Stack direction='row' alignItems='center' spacing={2}>
                                        <GroupOutlinedIcon />
                                        <Typography variant='body1'>{row.permissions?.filter(p => p.type !== 'anyone').length || 0}</Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack component={Link} href={`mailto:${row.owners[0].emailAddress}`} direction='row' alignItems='center' spacing={2} className='link' underline='hover' color='inherit'>
                                        <Avatar alt={row.owners[0].displayName} src={row.owners[0].photoLink} />
                                        <Typography variant='body1'>{row.owners[0].displayName}</Typography>
                                        <MailOutlineIcon />
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
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default DashboardTable