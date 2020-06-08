import React from 'react';
import propTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {withStyles} from '@material-ui/core/styles';
import genericStyles from '../style';
import moment from 'moment'

const styles = theme => ({
    ...genericStyles,
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        padding: '20px',
    },
    button: {
        margin: theme.spacing.unit * .5,
    },
});

const complianceDocumentsTable = props => {
    const {classes} = props;
    const fontSize = '16px';

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell
                        style={{
                            fontSize: fontSize,
                        }}
                        align="center"
                    >
                        Date Added
                    </TableCell>

                    <TableCell
                        style={{
                            color: '#BF1E2E',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }}
                        align="left"
                    >
                        Document
                    </TableCell>

                    <TableCell
                        style={{
                            color: '#BF1E2E',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            backgroundColor: '#fff'
                        }}
                        align="left"
                    >
                        Added By
                    </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {
                    props.complianceDocuments.map(complianceDocument => {
                        const fileHyperLink = window.location.protocol + '//' + window.location.host + '/' + complianceDocument.dir;

                        return (
                            <TableRow key={complianceDocument.id} className={classes.rowStyle} hover>
                                <TableCell
                                    style={{
                                        fontSize: fontSize,
                                    }}
                                    align="center">{moment(complianceDocument.date_added, "YYYY-MM-DD").format("DD-MM-YYYY")}</TableCell>
                                <TableCell
                                    style={{
                                        fontSize: fontSize,
                                    }}
                                    align="left"> {complianceDocument.location_id != null ? "[Location] " : ""}<a
                                    href={fileHyperLink}>{complianceDocument.name}</a></TableCell>
                                <TableCell
                                    style={{
                                        fontSize: fontSize,
                                    }}
                                    align="left">{complianceDocument.added_by}</TableCell>
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        </Table>
    );
};

complianceDocumentsTable.propTypes = {
    complianceDocuments: propTypes.array.isRequired,
};

export default withStyles(styles)(complianceDocumentsTable);
