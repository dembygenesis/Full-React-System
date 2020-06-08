import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const managePrivilegeTable = props => {
    const { classes } = props;
    return (
        <Table className={props.classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell
                        style={{
                            backgroundColor: '#f1f1f1',
                        }}
                        align="center">{props.type === 'assigned' ? 'Revoke' : 'Add'} Access</TableCell>
                    <TableCell align="center">User</TableCell>
                    <TableCell
                        style={{
                            backgroundColor: '#fff',
                        }}
                        align="center">User Type</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.users.map(user => {
                    return (
                        <TableRow key={JSON.stringify(user)} className={classes.rowStyle} hover>
                            <TableCell align="center">
                                <Checkbox
                                    onChange={props.onChange.bind(this, user.user_id, user.type)}
                                    checked={props.checked}/>
                            </TableCell>
                            <TableCell align="center">{user.name}</TableCell>
                            <TableCell align="center">{user.user_type}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default managePrivilegeTable;
