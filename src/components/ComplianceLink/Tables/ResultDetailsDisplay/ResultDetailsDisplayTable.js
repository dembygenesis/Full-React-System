import React from 'react';
import propTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {withStyles} from '@material-ui/core/styles';
import genericStyles from '../style';
import ButtonWithIcon from "../../../UI/ButtonWithIcon/ButtonWithIcon";
import SplitButtonWithIcon from "../../../UI/ButtonWithIcon/SplitButtonWithIcon";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import moment from 'moment'

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
        resultDetails,
        updateExitingTableFormRow,
        toggleEditForResultDetails,
        onChangedDateResult,
        onExistingChangedDateResult,
        resultsDetail,
        updateTableFormRow,
        addTableForm,
        removeTableForm,
        submit,
        revertChanges
    } = props;

    let resultsEditing = resultDetails.find(val => val.editing === true)
    let isEditing = resultsEditing != undefined
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

                    {resultDetails.map((val, idx) => {
                        return (
                            <TableRow key={idx} style={{
                                backgroundImage: val['editing'] ? "linear-gradient(to right, white,#bf1e2e0d )" : null
                            }}>
                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 10
                                }}>
                                    {val['item_description']}
                                </TableCell>
                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 10
                                }}>
                                    {val['item_size']}
                                </TableCell>
                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 10
                                }}>
                                    {val['location_description']}
                                </TableCell>
                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 10,
                                    paddingTop: 9
                                }}>
                                    {
                                        val['editing'] ? (
                                            <Select
                                                value={val['status']}
                                                name="status"
                                                onChange={(event) => updateExitingTableFormRow(event, idx)}
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
                                        ) : val['status']
                                    }
                                </TableCell>
                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 10
                                }}>
                                    {
                                        val['editing'] ? (
                                            <WrapperDatepicker>
                                                <DatePicker
                                                    selected={val['date'] ? new Date(val['date']) : null}
                                                    placeholderText={'dd/mm/yyyy'}
                                                    dateFormat="dd/MM/yyyy"
                                                    name="date"
                                                    onChange={(val) => onExistingChangedDateResult(val, idx)}
                                                />
                                            </WrapperDatepicker>
                                        ) : moment(val['date'], "YYYY-MM-DD").format("DD-MM-YYYY")
                                    }
                                </TableCell>
                                <TableCell style={{
                                    padding: 0,
                                    paddingTop: 9,
                                    paddingRight: 10
                                }}>
                                    {
                                        val['editing'] && val['status'] =='fail' ? (
                                            <Select
                                                value={val['defect_type']}
                                                name="defect_type"
                                                onChange={(event) => updateExitingTableFormRow(event, idx)}
                                                autoWidth={true}
                                            >
                                                <MenuItem
                                                    key={"Critical Defect"}
                                                    value={"Critical Defect"}
                                                >Critical Defect</MenuItem>

                                                <MenuItem
                                                    key={"Non-Critical Defect"}
                                                    value={"Non-Critical Defect"}
                                                >Non-Critical Defect</MenuItem>
                                            </Select>
                                        ) : val['status'] =='fail'?val['defect_type'] :null
                                    }
                                </TableCell>
                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 10
                                }}>

                                    {
                                        val['editing'] ? (
                                            <TextField
                                                value={val['comments']}
                                                name="comments"
                                                onChange={(event) => updateExitingTableFormRow(event, idx)}
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        ) : val['comments']
                                    }
                                </TableCell>
                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 10
                                }}>
                                    <SplitButtonWithIcon
                                        title={val['editing'] ? 'Update' : 'Unlock'}
                                        onClick={() => toggleEditForResultDetails(idx)}
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        icon={val['editing'] ? 'Save' : 'LockOpen'}
                                        disabled={isEditing && !val['editing']}
                                        styleOverrides={{
                                            marginRight: '15px',
                                            padding: '5px'
                                        }}
                                    />
                                    &nbsp;
                                    {
                                        val['editing'] ?
                                            <SplitButtonWithIcon
                                                title={'Revert'}
                                                onClick={() => revertChanges(idx)}
                                                type="button"
                                                variant="contained"
                                                color="primary"
                                                icon={'Cancel'}
                                                styleOverrides={{
                                                    align: 'center',
                                                }}
                                            /> : null
                                    }

                                </TableCell>
                            </TableRow>
                        )
                    })}
                    {resultsDetail.map((val, idx) => {

                        return (
                            <TableRow key={idx}>
                                <TableCell style={{
                                    padding: 0,
                                    paddingRight: 5
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
                                    paddingRight: 5
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
                                    paddingRight: 5
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
                                    paddingRight: 5,
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
                                    paddingRight: 5
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
                                    paddingRight: 5
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
                                    paddingRight: 5
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
                                    paddingRight: 5
                                }}>
                                    <SplitButtonWithIcon
                                        title={"Remove"}
                                        onClick={removeTableForm.bind(this, idx)}
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        icon="Delete"
                                        styleOverrides={{
                                            marginRight: '15px',
                                            padding: '5px'
                                        }}
                                    /> &nbsp;{
                                    resultsDetail.length === idx + 1 ?
                                        <SplitButtonWithIcon
                                            title={"Save"}
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            icon="Save"
                                            onClick={submit.bind(this)}
                                        /> : null
                                }
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            {resultsDetail.length === 0 ? <div className={classes.addButton}>
                <ButtonWithIcon
                    title={"Add"}
                    type="button"
                    variant="contained"
                    color="primary"
                    icon="Add Circle"
                    disabled={isEditing}
                    onClick={addTableForm.bind(this)}
                />
            </div> : null}

        </React.Fragment>
    );
};

resultDetailTable.propTypes = {};

export default withStyles(styles)(resultDetailTable);
