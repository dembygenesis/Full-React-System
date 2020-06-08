import React from 'react';
import propTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { withStyles } from '@material-ui/core/styles';

import {NavLink} from "react-router-dom";

import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

import IconButton from "@material-ui/core/IconButton";

import ButtonWithIcon from "../../../../components/UI/ButtonWithIcon/ButtonWithIcon";
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
    formControl: {
        // margin: theme.spacing.unit * 1.5,
        minWidth: 250,
    },
    cellStyle: {
        align: 'left',
        margin: '0',
        padding: '5px 10px',
    }
});

const locationsTable = props => {

    const {classes} = props;

    return (
        <React.Fragment>

            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.cellStyle}>Location</TableCell>
                        <TableCell className={classes.cellStyle}>Type</TableCell>
                        <TableCell className={classes.cellStyle}>Location Company</TableCell>
                        <TableCell className={classes.cellStyle}>Address</TableCell>
                        <TableCell className={classes.cellStyle} align="center">Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        props.locations.map(location => (
                            <TableRow key={location.id} className={classes.rowStyle} hover>
                                <TableCell className={classes.cellStyle}>{location.name}</TableCell>
                                <TableCell className={classes.cellStyle}>{location.location_type}</TableCell>
                                <TableCell className={classes.cellStyle}>{location.company}</TableCell>
                                <TableCell className={classes.cellStyle}>{location.street_number} {location.street_name} {location.suburb} {location.state} {location.postal_code}</TableCell>
                                <TableCell className={classes.cellStyle} align="center">

                                    <ButtonWithIcon
                                        title="Assign"
                                        disabled={props.userType !== 'Administrator' && props.userType !== 'Account Holder'}
                                        component={NavLink}
                                        to={`/location/assign/${location.id}`}
                                        variant="contained"
                                        color="primary"
                                        icon="Account Circle"
                                        styleOverrides={{
                                            padding: '5px',
                                            margin: 0,
                                        }}
                                    />

                                    <IconButton
                                        disabled={props.userType !== 'Administrator' && props.userType !== 'Account Holder'}
                                        component={NavLink}
                                        to={`/location/edit/${location.id}`}
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
                                        disabled={props.userType !== 'Administrator' && props.userType !== 'Account Holder'}
                                        onClick={() => props.delete(location.id)}
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
                        ))
                    }
                </TableBody>
            </Table>
        </React.Fragment>
    );
};

locationsTable.propTypes = {
    locations: propTypes.array.isRequired,
    delete: propTypes.func.isRequired,
};

export default withStyles(styles)(locationsTable);
