import React from 'react';
import propTypes from 'prop-types';

import DateRangeIcon from '@material-ui/icons/DateRange';
import RoomIcon from '@material-ui/icons/Room';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    labelColor: {
        color: theme.palette.primary.main,
    }
});

const reportLabel = (props) => {

    let {
        logo,
        type,
        value,
        classes,
        style
    } = props;

    let iconStyles = {
        marginTop: '13px',
        marginRight: '10px',
    };

    if (logo === 'date') {
        logo = <DateRangeIcon style={iconStyles} className={classes.labelColor} />;
    } else if (logo === 'manager') {
        logo = <AccountCircleIcon style={iconStyles} className={classes.labelColor} />;
    } else if (logo === 'location') {
        logo = <RoomIcon style={iconStyles} className={classes.labelColor} />;
    } else if (logo === 'company') {
        logo = <AssignmentLateIcon style={iconStyles} className={classes.labelColor} />;
    } else if(logo === 'space') {
        logo = <AccountCircleIcon style={iconStyles} className={classes.labelColor} />;
    }


    let defaultStyles = {
        margin: 0,
        padding: 0,
        display: 'flex',
        ...style
    };

    return (
        <div style={defaultStyles}>
            {logo}
            <p><span className={classes.labelColor}>{type}:</span>&nbsp;&nbsp;&nbsp; <b>{value}</b></p>
        </div>
    );
};

reportLabel.propTypes = {
    logo: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
};

export default withStyles(styles)(reportLabel);