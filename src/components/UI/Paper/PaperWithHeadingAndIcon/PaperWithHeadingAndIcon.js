import React from 'react';

import Paper from '@material-ui/core/Paper/index';


import { withStyles } from '@material-ui/core/styles/index';
import DashboardIcon from '@material-ui/icons/Dashboard';



/**
 * This paper component will accept:
 * 1. An icon and style it accordingly according to the theme.
 * 2.
 */

const defaultStyles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
});

const PaperWithHeadingAndIcon = props => {


    const {classes} = props;

    let styles = typeof props.styles !== "undefined" ? props.styles : {};

    return (
        <Paper className={classes.root} style={styles}>
            <div style={{
                width: '100px',
                height: '80px',
            }}>
                <DashboardIcon/>
            </div>

            <h6>Measure Details</h6>
            {props.children}
        </Paper>
    );
};

export default withStyles(defaultStyles)(PaperWithHeadingAndIcon);