import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import {withStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        marginTop: '10px',
    },
    table: {
        minWidth: 700,
    },
    grid: {
        alignContent: 'right'
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
        minWidth: 250,
    },
    input: {
        display: 'none'
    },
    span: {
        padding: '20px'
    }
});

const addDocumentForm = props => {

    const {classes} = props;

    let uploadPercent = props.uploadPercent !== null ? (
        (parseFloat(props.uploadPercent) * 100).toFixed(2)
    ).toString() + '%' : '';

    if (uploadPercent === '100%') {
        uploadPercent = 'File uploaded, sending...';
    }

    let display = (
        <div className={classes.root}>

            <form action="post" onSubmit={props.documentSubmitted}>
                <input
                    onChange={(event) => props.fileChanged(event)}
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                />

                <label htmlFor="contained-button-file">
                    <span className={classes.span}>
                        {props.documentToUploadName}  <strong>{uploadPercent}</strong>
                    </span>

                    <Button
                        style={{
                            textTransform: 'none',
                            marginRight: '10px',
                            padding: '5px 15px',
                            fontSize: '16px',
                        }}
                        type="file"
                        component="span"
                        color="primary"
                        size="small"
                        disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                        variant="contained">
                        Add Document
                    </Button>

                    {
                        props.documentToUploadName !== ''
                            ? (
                                <React.Fragment>
                                <Button
                                    style={{
                                        textTransform: 'none',
                                        marginRight: '10px',
                                        padding: '10px 20px',
                                    }}
                                    type="submit"
                                    size="small"
                                    disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                                    variant="outlined"
                                    color="primary">
                                    Submit
                                </Button>
                                    <FormControlLabel
                                        control={<Checkbox onChange={props.handleLocationWideDocument} value="true" />}
                                        label="Add Document to Entire Location"
                                    />
                                </React.Fragment>
                            ) : null
                    }
                </label>
            </form>
        </div>
    );

    return display;
};

addDocumentForm.propTypes = {
    fileChanged: propTypes.func.isRequired,
    documentSubmitted: propTypes.func.isRequired,
    documentToUploadName: propTypes.string.isRequired,
};

export default withStyles(styles)(addDocumentForm);