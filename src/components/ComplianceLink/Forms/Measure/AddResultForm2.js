import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import {withStyles} from '@material-ui/core/styles';
import InputLabel from "@material-ui/core/InputLabel";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Checkbox from '@material-ui/core/Checkbox';
import TextField from "@material-ui/core/TextField";

import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';

import ResultDetailsDisplayTable from '../../Tables/ResultDetailsDisplay/ResultDetailsDisplayTable';

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflowX: 'auto',
    },
    grid: {
        alignContent: 'right'
    },
    gridRoot: {
        flexGrow: 1,
    },
    button: {
        marginRight: theme.spacing.unit * .5,
    },
    textField: {
        minWidth: 200
    },
    paper: {},
    select: {
        input: {
            width: '300px'
        },
    },
    formControl: {
        minWidth: 170,
        maxWidth: 170,
        marginTop: theme.spacing.unit * 3
    },
    checkBox: {},
    table: {
        width: '57%',
    },
    tableCell: {
        fontSize: '16px',
        textAlign: 'left',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column'
    }
});

let WrapperDatepicker = styled.div`
    input {
        line-height: 26px;
        font-size: 16px;
        border-top:0px;
        border-left:0px;
        border-right:0px;
        margin-top:18px;
        width: 250px;
    }
`
const AddResultForm = props => {

    const {classes} = props;

    let failExclusiveFields = null;

    if (props.selectedResult === 'Fail') {

        const selectedActionRating = parseFloat(props.selectedActionRating);

        failExclusiveFields = (
            <React.Fragment>
                <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="result-type">Action Rating</InputLabel>
                        <Select
                            label="Action Rating"
                            autoWidth={true}
                            style={{
                                textAlign: 'left',
                                maxWidth: 300
                            }}
                            value={props.selectedActionRating || ''}
                            onChange={(event) => props.onChangedAddResults(event, 'selectedActionRating')}
                            inputProps={{
                                name: 'Action Rating',
                                id: 'action-rating',
                            }}
                        >
                            <MenuItem key="1" value='1'>Non-Critical Defect</MenuItem>
                            <MenuItem key="2" value='2'>Critical Defect</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Action Initiated</FormLabel>
                        <FormGroup row className={classes.formGroup}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id='selectedAdviseManager'
                                        name='selectedAdviseManager'
                                        disabled={selectedActionRating === 2}
                                        checked={props.selectedAdviseManager === '1'}
                                        onChange={(event) => props.handleActionInitiated(event)}
                                    />
                                }
                                label={`Advise Manager ${selectedActionRating === 2 ? '(Mandatory)' : ''}`}
                                className={classes.checkBox}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id='selectedAdviseAdministrator'
                                        name='selectedAdviseAdministrator'
                                        disabled={selectedActionRating === 2}
                                        checked={props.selectedAdviseAdministrator === '1'}
                                        onChange={(event) => props.handleActionInitiated(event)}
                                    />
                                }
                                label={`Advise Administrator ${selectedActionRating === 2 ? '(Mandatory)' : ''}`}
                                className={classes.checkBox}
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
            </React.Fragment>
        );
    }
    let resultsEditing = props.resultDetails.find(val =>  val.editing === true )
    let isEditing = resultsEditing != undefined
    return (
        <form action="" className={classes.root} onSubmit={(event) => props.submitResult(event)}>
            <Grid container className={classes.gridRoot} spacing={16}>
                <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="result-type">Overall Status</InputLabel>
                        <Select
                            label="Result Type"
                            fullWidth
                            style={{
                                textAlign: 'left',
                                maxWidth: 300
                            }}
                            value={props.selectedResult || 'Fail'}
                            onChange={(event) => props.onChangedAddResults(event, 'selectedResult')}
                            inputProps={{
                                name: 'Result Type',
                                id: 'result-type',
                            }}
                            disabled={true}
                        >
                            <MenuItem key="Pass" value='Pass'>Pass</MenuItem>
                            <MenuItem key="Fail" value='Fail'>Fail</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <FormControl margin="normal" className={classes.formControl}>
                        <InputLabel shrink>
                            Date Entered
                        </InputLabel>
                        <WrapperDatepicker>
                            <DatePicker
                                readOnly={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                                placeholderText={'dd/mm/yyyy'}
                                dateFormat="dd/MM/yyyy"
                                style={{width:'150px'}}
                                selected={props.resultDate ? new Date(props.resultDate) : null}
                                onChange={(event) => props.onChangedAddResultsDate(event, 'resultDate')}
                            />
                        </WrapperDatepicker>
                    </FormControl>
                </Grid>

                {failExclusiveFields}
            </Grid>

            <div>
                <TextField
                    className={classes.formControl}
                    id="comments"
                    value={props.comments}
                    label="Comments"
                    fullWidth
                    onChange={(event) => props.onChangedAddResults(event, 'comments')}
                    style={{
                        padding: 0,
                        marginTop: 0,
                    }}
                    disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                />

                <br/>
                <br/>
                <br/>

                <Button
                    style={{
                        textTransform: 'none',
                        fontSize: '16px',
                        marginBottom: '10px',
                    }}
                    disabled={isEditing}
                    type="submit"
                    variant="contained" color="primary">
                    <SaveIcon
                        style={{
                            color: 'white',
                            marginRight: '10px',
                        }}
                    />
                    Save
                </Button>
                <br/>
                <br/>

                <br/>
                <div style={{
                    height: '3px',
                    overflow: 'auto',
                    borderBottom: '3px solid #BF1E2E',
                }}></div>

                <br/>
                <br/>
                <br/>


                <h3>Result Detail</h3>

                <ResultDetailsDisplayTable
                    measureDetails={props.measureDetails}
                    resultDetails={props.resultDetails}
                    updateExitingTableFormRow={props.updateExitingTableFormRow}
                    onExistingChangedDateResult={props.updateExitingTableFormRowDate}
                    toggleEditForResultDetails={props.toggleEditForResultDetails}

                    onChangedDateResult={props.updateTableFormRowDate}
                    resultsDetail={props.resultsDetail}
                    updateTableFormRow={props.updateTableFormRow}
                    addTableForm={props.addTableForm}
                    removeTableForm={props.removeTableForm}
                    submit={props.submitResult}
                    revertChanges={props.revertChanges}
                />

            </div>
        </form>
    )
        ;
};

AddResultForm.propTypes = {
    // Add later.
    submitResult: propTypes.func.isRequired,
};

export default withStyles(styles)(AddResultForm);
