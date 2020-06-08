import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PermIdentityIcon from '@material-ui/icons/PermIdentityOutlined';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import DeleteIcon from '@material-ui/icons/Delete';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SaveIcon from '@material-ui/icons/Save';

// This component has a button that has an icon beside it.

const buttonWithIcon = props => {

    let Icon = null;

    /**
     * Icons.
     */

    if (props.icon === 'Add Circle') {
        Icon = AddCircleIcon;
    }

    if (props.icon === 'Account Circle') {
        Icon = AccountCircleIcon;
    }

    if (props.icon === 'Identity') {
        Icon = PermIdentityIcon;
    }

    if (props.icon === 'Account Balance') {
        Icon = AccountBalanceIcon;
    }

    if (props.icon === 'Assignment Late') {
        Icon = AssignmentLateIcon;
    }

    if (props.icon === 'Keyboard Backspace') {
        Icon = KeyboardBackspaceIcon;
    }

    if (props.icon === 'Insert Photo') {
        Icon = InsertPhotoIcon;
    }
    if (props.icon === 'Delete') {
        Icon = DeleteIcon;
    }
    if (props.icon === 'LockOpen') {
        Icon = LockOpenIcon;
    }
    if (props.icon === 'Save') {
        Icon = SaveIcon;
    }

    /**
     * Styling overrides.
     */

    let styles = {
        textTransform: 'none',
    };

    let iconStyleOverrides = {

    };

    if (typeof props.styleOverrides !== "undefined") {
        styles = {
            textTransform: 'none',
            ...props.styleOverrides,
        };
    } else {
        styles = {
            textTransform: 'none',
        };
    }

    if (typeof props.iconStyleOverrides !== "undefined") {
        iconStyleOverrides = {
            ...props.iconStyleOverrides,
        };
    }

    // For attributes (remove non button props).
    const trimmedProps = {};

    for (let i in props) {
        // Remove non-compatible button props.
        if (['styleOverrides', 'iconStyleOverrides'].indexOf(i) === -1) {
            trimmedProps[i] = props[i];
        }
    }

    return (
        <div>
            <Button
                style={{
                    ...styles,
                }}
                {...trimmedProps}
            >
                <Icon
                    style={{
                        color: 'white',
                        marginRight: props.title?'10px':'0px',
                        ...iconStyleOverrides
                    }}
                /> {props.title}
            </Button>
        </div>
    );
};

buttonWithIcon.propTypes = {
    title: propTypes.string.isRequired,
    icon: propTypes.string.isRequired,
    styleOverrides: propTypes.object,
    iconStyleOverrides: propTypes.object,
};

export default buttonWithIcon;

