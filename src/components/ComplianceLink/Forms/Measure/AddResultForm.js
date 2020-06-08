import React from 'react';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
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
});

const addResultForm = props => {

    const {classes} = props;

    return (
        <form action="" className={classes.root} onSubmit={(event) => event.preventDefault()}>

            <TextField
                className={classes.textField}
                value={props.resultDate}
                label="Date"
                type="date"
                id="date"
                onChange={(event) => props.onChangedAddResults(event, 'resultDate')}
                fullWidth
                disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <TextField
                value={props.comments}
                label="Comments"
                id="comments"
                onChange={(event) => props.onChangedAddResults(event, 'comments')}
                style={{padding: 4}}
                disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <br/>

            <Grid item xs={12} className={classes.grid}>
                <Button
                    className={classes.button}
                    onClick={() => props.submitResultTypeHandler(0)}
                    type="button"
                    size="small"
                    disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                    variant="outlined"
                    color="secondary">
                    Mark as Fail
                </Button>

                <Button
                    onClick={() => props.submitResultTypeHandler(1)}
                    type="button"
                    disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                    size="small"
                    variant="outlined"
                    color="primary">
                    Mark as Pass and Move next due date
                </Button>
            </Grid>
        </form>
    );
};

export default withStyles(styles)(addResultForm);