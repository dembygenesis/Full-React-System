import React from 'react';
import propTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {withStyles} from '@material-ui/core/styles';
import {NavLink} from "react-router-dom";
import ButtonWithIcon from "../../../UI/ButtonWithIcon/ButtonWithIcon";

import genericStyles from '../style';
import moment from 'moment'

const styles = theme => ({
    ...genericStyles,
    button: {
        margin: theme.spacing.unit * .5,
    },
});

const complianceMeasuresTable = props => {
    const {classes} = props;


    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell style={{
                        color: '#BF1E2E',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }} align="left">Compliance Category</TableCell>
                    <TableCell style={{
                        color: '#BF1E2E',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }} align="left">Measure</TableCell>
                    <TableCell style={{
                        color: '#BF1E2E',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }} align="left">Frequency</TableCell>
                    <TableCell style={{
                        color: '#BF1E2E',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }} align="left">Status</TableCell>
                    <TableCell style={{
                        color: '#BF1E2E',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }} align="left">Due</TableCell>
                    <TableCell style={{
                        color: '#BF1E2E',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        backgroundColor: '#f3f3f3'
                    }} align="center">Actions</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {
                    props.complianceMeasures.map(complianceMeasure => (
                        <TableRow key={complianceMeasure.id} hover>
                            <TableCell align="left">{complianceMeasure.compliance_category}</TableCell>
                            <TableCell style={{
                                maxWidth: '500px',
                            }} align="left">{complianceMeasure.measure}</TableCell>
                            <TableCell align="left">{complianceMeasure.frequency}</TableCell>
                            <TableCell align="left">{complianceMeasure.status}</TableCell>
                            <TableCell align="left">{moment(complianceMeasure.due, "DD-MM-YYYY").format("DD-MM-YYYY")}</TableCell>
                            <TableCell align="center">
                                <ButtonWithIcon
                                    title={ (props.userType !== 'Reviewer' ? 'Add Results &' : '') + ' View History'}
                                    component={NavLink}
                                    to={{}}
                                    onClick={()=> props.viewComplianceMeasurehandler(complianceMeasure.id)}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    icon="Add Circle"
                                    styleOverrides={{
                                        textTransform: 'uppercase'
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

complianceMeasuresTable.propTypes = {
    complianceMeasures: propTypes.array.isRequired,
};

export default withStyles(styles)(complianceMeasuresTable);
