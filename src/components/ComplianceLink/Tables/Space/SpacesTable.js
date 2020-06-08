import React from 'react';
import propTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {NavLink} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

import genericStyles from '../style';

const styles = theme => ({
    ...genericStyles,
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit * .5,
    },
});


const spacesTable = props => {

    const {classes} = props;

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell align="left">Company</TableCell>
                    <TableCell align="left">Location</TableCell>
                    <TableCell align="left">Space Name</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {props.spaces.map(space => (
                    <TableRow key={space.id} className={classes.rowStyle} hover>
                        <TableCell align="left">{space.company}</TableCell>
                        <TableCell align="left">{space.location}</TableCell>
                        <TableCell align="left">{space.name}</TableCell>
                        <TableCell align="left">{space.description}</TableCell>
                        <TableCell align="center">

                            <IconButton
                                disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                                to={`/space/edit/${space.id}`}
                                component={NavLink}
                                size="small"
                                variant="outlined"
                                color="primary"
                                style={{
                                    padding: '5px',
                                }}
                            >
                                <EditIcon
                                    style={{
                                        color: '#be1d2d',
                                    }}
                                />
                            </IconButton>

                            <IconButton
                                onClick={props.delete.bind(null, space.id) }
                                disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                                size="small"
                                variant="outlined"
                                color="secondary"
                                style={{
                                    padding: '5px',
                                }}
                            >
                                <DeleteIcon/>
                            </IconButton>

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

spacesTable.propTypes = {
    spaces: propTypes.array.isRequired,
    delete: propTypes.func.isRequired,
};

export default withStyles(styles)(spacesTable);
