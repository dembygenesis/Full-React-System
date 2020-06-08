import React from 'react';
import propTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {withStyles} from '@material-ui/core/styles';
import genericStyles from '../style';

const styles = theme => ({
    ...genericStyles,
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit * .5,
    },
});

const userActivitiesTable = props => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell align="left">User</TableCell>
                <TableCell align="left">User Action Performed</TableCell>
                <TableCell align="left">User Type</TableCell>
                <TableCell align="center">Time Action Was Performed</TableCell>
                <TableCell align="left" style={{
                    backgroundColor: 'white'
                }}>Page Location</TableCell>
            </TableRow>
        </TableHead>

        <TableBody>
            {
                props.userActivities.map(userActivity => (
                    <TableRow key={userActivity.id} className={props.classes.rowStyle} hover>
                        <TableCell align="left">{userActivity.user}</TableCell>
                        <TableCell align="left">{userActivity.category}</TableCell>
                        <TableCell align="left">{userActivity.user_type}</TableCell>
                        <TableCell align="center">{userActivity.timestamp}</TableCell>
                        <TableCell align="left">{userActivity.entity}</TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>

);

userActivitiesTable.propTypes = {
    userActivities: propTypes.array.isRequired
};

export default withStyles(styles)(userActivitiesTable);
