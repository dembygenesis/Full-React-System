import React from 'react';
import propTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import genericStyles from '../style';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import Link from '@material-ui/core/Link';

const styles = theme => ({
    ...genericStyles,
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        overflowX: 'auto',
    },
    button: {
        margin: theme.spacing.unit,
    },
    table: {
        width: '60%',
    },
    textField: {
        width: '600px',
    },
    datePickerContainer: {
        display: 'flex'
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
    }
`


const MeasureDashboardDetails = props => {

    const {classes} = props;

    const fontSize = '16px';

    const measureFields = {
        'Measure:': 'measure',
        'Location:': 'location',
        'Space:': 'space',
        'Compliance Category:': 'compliance_category',
        'Frequency:': 'frequency',
        'Standard:': 'standard',
        'NCC/BCA or State provisions for performance standards:': 'ncc_bca_provisions',
        'Description:': 'description',
        'Link to Document:': 'document_link',
        'Current Status:': 'status',
        'Last Result:': 'latest_status',
        'Last Action(s) Initiated:': 'latest_actions_initiated',
        'Last Action Rating:': 'latest_action_rating',
        'Due Date:': 'due',
    };

    const readOnly = ['Manager', 'Reviewer'].indexOf(props.userType) !== -1;
    let dueDateObject = props.dueDate ? new Date(props.dueDate) : null
    let display = Object.keys(measureFields).length
        ? (
            <div className={classes.root} style={{overflow: "unset"}}>
                {
                    Object.keys(measureFields).map((key, val) => {
                        return (
                            <div key={key}>
                                {key === 'Due Date:'
                                    ? (
                                        <div className={classes.datePickerContainer}>
                                            <FormControl margin="normal">
                                                <InputLabel shrink>
                                                    Next Due Date
                                                </InputLabel>
                                                <WrapperDatepicker>
                                                    <DatePicker
                                                        placeholderText={'dd/mm/yyyy'}
                                                        dateFormat="dd/MM/yyyy"
                                                        readOnly={readOnly}
                                                        selected={dueDateObject}
                                                        onChange={props.onChangedDueDate}
                                                    />
                                                </WrapperDatepicker>
                                            </FormControl>

                                            <Button
                                                style={{
                                                    marginLeft: 10,
                                                    textTransform: 'none',
                                                    textAlign: 'justify',
                                                    fontSize: fontSize
                                                }}
                                                onClick={() => props.onDueDateUpdate()}
                                                disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                                                size="small" variant="contained" color="primary"
                                                className={classes.button}
                                            >
                                                Update Due
                                            </Button>
                                        </div>
                                    ):
                                    key == 'Link to Document:'?
                                        <FormControl margin="normal">
                                            <InputLabel shrink>
                                                Link to Document
                                            </InputLabel>
                                            <br/>
                                            <Link
                                                style={{cursor: "pointer"}}
                                                component="a"
                                                onClick={() => window.open(props.measureDetails[measureFields[key]], '_blank')}
                                            >
                                                {props.measureDetails[measureFields[key]]}
                                            </Link>
                                        </FormControl>

                                    :(
                                        <TextField
                                            value={props.measureDetails[measureFields[key]] || 'None'}
                                            className={classes.textField}
                                            margin="normal"
                                            InputProps={{
                                                disableUnderline: true,
                                                readOnly: true
                                            }}
                                            multiline={true}
                                            label={key}
                                        />
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
        : null;

    return (
        <React.Fragment>
            {
                typeof measureFields !== "undefined"
                    ? display
                    : null
            }
        </React.Fragment>
    );
};

MeasureDashboardDetails.propTypes = {
    measureDetails: propTypes.object.isRequired,
    onChangedDueDate: propTypes.func.isRequired,
    onDueDateUpdate: propTypes.func.isRequired,
    dueDate: propTypes.string.isRequired,
};

export default withStyles(styles)(MeasureDashboardDetails);
