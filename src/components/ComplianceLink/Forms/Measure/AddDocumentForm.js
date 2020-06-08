import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        padding: '20px',

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
                    <Button
                        type="file"
                        component="span"
                        size="small"
                        disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                        variant="contained">
                        Add Document
                    </Button>
                </label>

                <span className={classes.span}>
                    {props.documentToUploadName}  <span>{uploadPercent}</span>
                </span>

                <br/>
                <br/>

                <Button
                    type="submit"
                    size="small"
                    disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                    variant="outlined"
                    color="primary">
                    Submit
                </Button>
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