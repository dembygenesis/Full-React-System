import React from 'react';
import propTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {withStyles} from '@material-ui/core/styles';
import {NavLink} from "react-router-dom";
import EditIcon from '@material-ui/icons/EditOutlined';
import IconButton from "@material-ui/core/IconButton";

import genericStyles from '../style';

const styles = theme => ({
    ...genericStyles,
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        padding: '20px',
    },
    table: {
        minWidth: 700,
    },
    button: {
        marginRight: '5px',
        padding: '2px',
    },
    cellStyle: {
        align: 'left',
        padding: '5px 20px',
        maxWidth: '150px',
        wordBreak: 'break-all'
    }
});

const complianceMeasureTable = props => {

    const {classes} = props;

    return (
        <React.Fragment>

            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Frequency <br/> Type</TableCell>
                        <TableCell>Frequency <br/> Unit</TableCell>
                        <TableCell>Standard</TableCell>
                        <TableCell style={{
                            width: '100px',
                        }}>Compliance <br/> Category</TableCell>
                        <TableCell>Document Link</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.complianceMeasures.map(complianceMeasure => (
                        <TableRow key={complianceMeasure.id} className={classes.rowStyle} hover>
                            <TableCell>{complianceMeasure.name}</TableCell>
                            <TableCell>{complianceMeasure.frequency_type}</TableCell>
                            <TableCell>{complianceMeasure.frequency_unit}</TableCell>
                            <TableCell>{complianceMeasure.standard}</TableCell>
                            <TableCell>{complianceMeasure.compliance_category}</TableCell>

                            <TableCell className={classes.cellStyle}>
                                <a href={complianceMeasure.document_link}>{complianceMeasure.document_link}</a>
                            </TableCell>

                            <TableCell align="center">
                                <IconButton
                                    component={NavLink}
                                    to={`/complianceMeasure/edit/${complianceMeasure.id}`}
                                    size="small" variant="outlined" color="primary" className={classes.button}
                                >
                                    <EditIcon
                                        style={{
                                            color: '#be1d2d',
                                        }}
                                    />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>

    );
};

complianceMeasureTable.propTypes = {
    complianceMeasures: propTypes.array.isRequired,
};

export default withStyles(styles)(complianceMeasureTable);
