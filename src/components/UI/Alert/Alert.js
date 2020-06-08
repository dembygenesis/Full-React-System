import React from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

import './Alert.css';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        // backgroundColor: '#ffcdd2',
        /*paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,*/

        padding: 0.2,
        marginBottom: '5px'
    },
    paper: {
        height: '20px',
    }
});

const alert = props => {
    const {classes} = props;

    let styles = null;


    styles = {
        backgroundColor: props.type === 'error' ? '#ffcdd2' : '#b2dfdb',
        cursor: 'pointer'
    };

    if (props.stylesOverride) {
        styles = {
            ...styles,
            ...props.stylesOverride
        };
    }

    return (
        <div>
            <Paper
                style={styles}
                onClick={props.clickedHandler}
                className={classes.root} elevation={1}
            >
                {props.children}
            </Paper>
        </div>

    );
};

export default withStyles(styles)(alert);