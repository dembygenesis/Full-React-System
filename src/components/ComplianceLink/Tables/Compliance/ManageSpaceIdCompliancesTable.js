import React from 'react';
import propTypes from 'prop-types';

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import genericStyles from '../style';
import _ from "lodash";

const styles = theme => ({
    ...genericStyles,
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit * .5,
    },
    createIcon: {
        color: '#BF1E2E'
    }
});

const manageSpaceIdCompliancesTable = props => {

    let {classes} = props;
    let display = false;

    if (props.spaceIdCompliances.length !== 0) {
        display = true;
    }

    const table = (
        <React.Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Compliance Category</TableCell>
                        <TableCell align="left">Measure</TableCell>
                        <TableCell align="left">Compliance Certifier</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                       _.uniqBy(props.spaceIdCompliances, 'measure') .map(spaceIdCompliance => (
                            <TableRow key={spaceIdCompliance.id} className={classes.rowStyle} hover>
                                    <TableCell align="left">{spaceIdCompliance.category}</TableCell>
                                <TableCell align="left" style={{
                                    maxWidth: '500px',
                                }}>{spaceIdCompliance.measure}</TableCell>
                                <TableCell align="left">
                                    <Grid container spacing={16}>
                                        <Grid item xs={6}>
                                            <form noValidate>
                                                <TextField
                                                    disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                                                    value={
                                                        props.complianceDateEdits[spaceIdCompliance.id] === null
                                                            ? ""
                                                            : props.complianceDateEdits[spaceIdCompliance.id]
                                                    }
                                                    onChange={props.complianceContributorUpdated.bind(this)}
                                                    inputProps={{
                                                        name: spaceIdCompliance.id,
                                                    }}
                                                    label="Email"
                                                />
                                            </form>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <IconButton
                                                style={{
                                                    marginTop: '10px'
                                                }}
                                                disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                                                onClick={() => props.complianceContributorUpdatePressed(spaceIdCompliance.id)}
                                                size="small" variant="outlined" color="primary"
                                                className={classes.button}
                                            >
                                                <CreateIcon className={classes.createIcon} />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        onClick={props.deleteHandler.bind(this, spaceIdCompliance.id)}
                                        disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                                        size="small" variant="outlined" color="secondary" className={classes.button}>
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

    return display === true? table : null;
};

manageSpaceIdCompliancesTable.propTypes = {
    userType: propTypes.string.isRequired,
    spaceIdCompliances: propTypes.array.isRequired,
    complianceDateEdits: propTypes.object.isRequired,
    deleteHandler: propTypes.func.isRequired,
    complianceContributorUpdated: propTypes.func.isRequired,
    complianceContributorUpdatePressed: propTypes.func.isRequired,
};


export default withStyles(styles)(manageSpaceIdCompliancesTable);
