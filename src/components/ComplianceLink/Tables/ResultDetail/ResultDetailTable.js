import React from 'react';
import propTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {withStyles} from '@material-ui/core/styles';
import genericStyles from '../style';

import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ButtonWithIcon from "../../../UI/ButtonWithIcon/ButtonWithIcon";

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';


const styles = theme => ({
    ...genericStyles,
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    button: {
        margin: theme.spacing.unit * .5,
    },
    addButton: {
        margin: '10px 0',
        display: 'flex',
    }
});

let WrapperDatepicker = styled.div`
    margin-top:12px;
    border-bottom: 1px solid #0000006b;
    input {
        line-height: 26px;
        font-size: 16px;
        border:0px
    }
`
const resultDetailTable = props => {
    const {classes} = props;
    const fontSize = '16px';

    const {
        resultsDetail,
        updateTableFormRow,
        addTableForm,
        removeTableForm,
        onChangedDateResult,
    } = props;

    return (
        <React.Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{
                            backgroundColor: 'white',
                            padding: 0,
                        }}>Item Description</TableCell>
                        <TableCell style={{
                            backgroundColor: 'white',
                            padding: 0,
                        }}>Item Size</TableCell>
                        <TableCell style={{
                            backgroundColor: 'white',
                            padding: 0,
                        }}>Location Description</TableCell>
                        <TableCell style={{
                            backgroundColor: 'white',
                            padding: 0,
                        }}>Status</TableCell>
                        <TableCell style={{
                            backgroundColor: 'white',
                            padding: 0,
                        }}>Date</TableCell>
                        <TableCell style={{
                            backgroundColor: 'white',
                            padding: 0,
                        }}>Defect Type</TableCell>
                        <TableCell style={{
                            backgroundColor: 'white',
                            padding: 0,
                        }}>Comments</TableCell>
                        <TableCell style={{
                            backgroundColor: 'white',
                            padding: 0,
                        }}>Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>

                    {resultsDetail.map((val, idx) => {

                        return (
                            <TableRow key={idx}>
                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 10
                                }}>
                                    <TextField
                                        value={val['itemDescription']}
                                        name="itemDescription"
                                        onChange={(event) => updateTableFormRow(event, idx)}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                    />
                                </TableCell>
                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 10
                                }}>
                                    <TextField
                                        value={val['itemSize']}
                                        name="itemSize"
                                        onChange={(event) => updateTableFormRow(event, idx)}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 10
                                }}>
                                    <TextField
                                        value={val['locationDescription']}
                                        name="locationDescription"
                                        onChange={(event) => updateTableFormRow(event, idx)}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 10,
                                    paddingTop: 9
                                }}>
                                    <Select
                                        value={val['status']}
                                        name="status"
                                        onChange={(event) => updateTableFormRow(event, idx)}
                                        autoWidth={true}
                                    >
                                        <MenuItem
                                            key={"pass"}
                                            value={"pass"}
                                        >Pass</MenuItem>

                                        <MenuItem
                                            key={"fail"}
                                            value={"fail"}
                                        >Fail</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 10
                                }}>
                                    <WrapperDatepicker>
                                        <DatePicker
                                            selected={val['date'] ? new Date(val['date']) : null}
                                            placeholderText={'dd/mm/yyyy'}
                                            dateFormat="dd/MM/yyyy"
                                            onChange={(value) => onChangedDateResult(value, idx)}
                                        />
                                    </WrapperDatepicker>
                                </TableCell>
                                <TableCell style={{
                                    padding: 0,
                                    paddingTop: 9,
                                    paddingRight: 10
                                }}>
                                    <Select
                                        value={val['defectType']}
                                        name="defectType"
                                        onChange={(event) => updateTableFormRow(event, idx)}
                                        autoWidth={true}
                                    >
                                        <MenuItem
                                            key={"Critical Defect"}
                                            value={"Critical Defect"}
                                        >Critical Defect</MenuItem>

                                        <MenuItem
                                            key={"Non-Critical Defect"}
                                            value={"Non-Critical Defect"}
                                        >Non Critical Defect</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 10
                                }}>
                                    <TextField
                                        value={val['comments']}
                                        name="comments"
                                        onChange={(event) => updateTableFormRow(event, idx)}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </TableCell>

                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 10
                                }}>
                                    <ButtonWithIcon
                                        title={"Remove"}
                                        onClick={removeTableForm.bind(this, idx)}
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        icon="Identity"
                                        styleOverrides={{
                                            marginRight: '15px',
                                            padding: '5px'
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            <div className={classes.addButton}>
                <ButtonWithIcon
                    title={"Add"}
                    type="button"
                    variant="contained"
                    color="primary"
                    icon="Identity"
                    onClick={addTableForm.bind(this)}
                />
            </div>

        </React.Fragment>
    );
};

resultDetailTable.propTypes = {};

export default withStyles(styles)(resultDetailTable);
