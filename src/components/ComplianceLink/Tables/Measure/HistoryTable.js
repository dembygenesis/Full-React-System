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
    },
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit * .5,
    },
    cellStyle: {
        fontSize: '16px',
        padding: '5px 10px',
    },
    TableHeadCustom: {
        fontSize: '16px',
        margin: 0,
        // padding: 0,
        padding: '0 10px',
    },
    TableCellCustom: {
        fontSize: '16px',
        margin: 0,
        // padding: 0,
        padding: '0 10px',
    },
});

const historyTable = props => {

    const {classes} = props;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell
                        align="center"
                        className={classes.TableHeadCustom}
                        style={{
                            width: '110px',
                        }}
                    >
                        Date
                    </TableCell>

                    <TableCell
                        align="left"
                        style={{
                            width: '150px',
                        }}
                        className={classes.TableHeadCustom}
                    >
                        User
                    </TableCell>

                    <TableCell
                        className={classes.TableHeadCustom}
                    >
                        Message
                    </TableCell>

                    <TableCell
                        className={classes.TableHeadCustom}
                    >
                        Comments
                    </TableCell>

                    <TableCell
                        style={{
                            backgroundColor: '#fff',
                        }}
                        className={classes.TableHeadCustom}
                    >
                        Category
                    </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {
                    props.history.map(history => {

                        // let formattedMessage = history.message.split('.').join(".<br/>");

                        return (
                            <TableRow key={history.id} className={classes.rowStyle} hover>
                                <TableCell
                                    align="center"
                                    className={classes.TableCellCustom}
                                    style={{
                                        padding: '0 10px',
                                        width: '110px',
                                    }}
                                >
                                    {moment(history.date, "YYYY-MM-DD").format("DD-MM-YYYY")}
                                </TableCell>

                                <TableCell
                                    className={classes.TableCellCustom}
                                >
                                    {history.user}
                                </TableCell>

                                <TableCell
                                    className={classes.TableCellCustom}
                                >
                                    {history.message}
                                </TableCell>

                                <TableCell
                                    className={classes.TableCellCustom}
                                >
                                    {history.comments}
                                </TableCell>

                                <TableCell
                                    className={classes.TableCellCustom}
                                >
                                    {history.category}
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>

        </Table>
    );
};

historyTable.propTypes = {
    history: propTypes.array.isRequired
};

export default withStyles(styles)(historyTable);
