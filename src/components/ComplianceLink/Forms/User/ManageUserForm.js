import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Grid from '@material-ui/core/Grid';
import ButtonWithIcon from "../../../UI/ButtonWithIcon/ButtonWithIcon";
import {NavLink} from "react-router-dom";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        padding: '20px',
        maxWidth: '700px',
        margin: 'auto',
    },
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit * .5,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    paper: {},
    select: {
        input: {
            width: '300px'
        },
    },
    formControl: {
        minWidth: 300,
    },
    selectMenu: {
        color: 'blue',
        backgroundColor: 'red'
    }
});

const manageUserForm = props => {
    const {classes} = props;

    const pageTitle = props.type !== ''
        ? props.type === 'add'
            ? 'Add User'
            : 'Edit User'
        : '';

    // Page title update.
    props.setPageTitle(pageTitle);

    return (
        <React.Fragment>

            <Paper className={classes.root}>
                <form method="POST" className={classes.form} onSubmit={(event) => props.submitHandler(event)}>
                    <Grid container spacing={16}>
                        <Grid item xs={6}>
                            <TextField
                                value={props.firstname}
                                label="First Name"
                                id="firstname"
                                onChange={(event) => props.formEventChanged(event, 'firstname')}
                                style={{padding: 4}}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                value={props.lastname}
                                onChange={(event) => props.formEventChanged(event, 'lastname')}
                                id="lastname"
                                style={{padding: 4}}
                                label="Last Name"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={16}>
                        <Grid item xs={6}>
                            <TextField
                                value={props.username}
                                onChange={(event) => props.formEventChanged(event, 'username')}
                                id="username"
                                style={{padding: 4}}
                                label="Username"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                value={props.password}
                                onChange={(event) => props.formEventChanged(event, 'password')}
                                id="password"
                                style={{padding: 4}}
                                type="password"
                                label="Password"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required={props.type === 'add'}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={16}>
                        <Grid item xs={6}>
                            <TextField
                                value={props.email}
                                onChange={(event) => props.formEventChanged(event, 'email')}
                                id="email"
                                style={{padding: 4}}
                                label="Email"
                                type="email"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                value={props.mobileNumber}
                                onChange={(event) => props.formEventChanged(event, 'mobileNumber')}
                                id="mobile_number"
                                style={{padding: 4}}
                                label="Mobile Number"
                                type="text"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                    </Grid>

                    <div style={{
                        flexDirection: 'row',
                        textAlign: 'center',
                        margin: '30px 0',
                    }}>
                        <span style={{
                            color: '#BF1E2E',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}>User Type: </span>
                        <div style={{
                            display: 'inline',
                            position: 'relative',
                        }}>
                            <Select
                                style={{
                                    textAlign: 'left',
                                    marginLeft: '10px',
                                }}
                                classes={{
                                    root: {
                                        color: 'red'
                                    }
                                }}
                                autoWidth={true}
                                value={props.userTypeId}
                                onChange={(event) => props.formEventChanged(event, 'userTypeId')}
                                disabled={props.type === 'edit'}
                                inputProps={{
                                    name: 'User Type',
                                    id: 'account-type',
                                }}
                                required
                                MenuProps2={{
                                    classes: {
                                        paper: classes.selectMenu
                                    }
                                }}
                            >
                                {props.userTypes.map(userType => {
                                    return (
                                        <MenuItem
                                            key={userType.id}
                                            value={userType.id}
                                        >{userType.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </div>
                    </div>

                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                        <ButtonWithIcon
                            title={ (props.type === 'edit' ? 'Update' : 'Create') + ' User'}
                            type="submit"
                            variant="contained"
                            color="primary"
                            icon="Identity"
                            styleOverrides={{
                                marginRight: '15px',
                            }}
                        />

                        { props.type === 'edit' ? (
                            <ButtonWithIcon
                                title="Add Another User"
                                component={NavLink}
                                to="/user/add"
                                variant="contained"
                                color="primary"
                                icon="Add Circle"
                            />
                        ) : null}
                    </div>
                </form>
            </Paper>
        </React.Fragment>
    )
};

manageUserForm.propTypes = {

    // My fields.
    type: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    userTypeId: PropTypes.number.isRequired,
    managementCompanyId: PropTypes.number.isRequired,
    formEventChanged: PropTypes.func.isRequired,
};

export default withStyles(styles)(manageUserForm);
