import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Grid from '@material-ui/core/Grid';
import ButtonWithIcon from "../../../UI/ButtonWithIcon/ButtonWithIcon";

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

    },
    formControl: {
        marginRight: theme.spacing.unit * 1.5,
        minWidth: '300px',
    },
    formControlPostalCode: {
        marginRight: theme.spacing.unit * 1.5,
        minWidth: 150,
    },
});


const manageLocationForm = props => {
    const {classes} = props;

    return (
        <React.Fragment>
            <Paper className={classes.root}>

                <form method="POST" className={classes.form} onSubmit={(event) => props.submitHandler(event)}>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="company-type">
                            Location Company
                        </InputLabel>
                        <Select

                            autoWidth={true}
                            value={props.companyId}
                            onChange={(event) => props.formEventChanged(event, 'companyId')}
                            inputProps={{
                                name: 'Company',
                                id: 'company',
                            }}
                        >
                            {
                                props.companies.map(company => {
                                    return (
                                        <MenuItem
                                            key={company.id}
                                            value={company.id}
                                        >
                                            {company.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    <TextField
                        value={props.name}
                        label="Name"
                        id="standard-full-width"
                        onChange={(event) => props.formEventChanged(event, 'name')}
                        style={{padding: 4}}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="company-type">
                            Location Type
                        </InputLabel>
                        <Select
                            autoWidth={true}
                            value={props.locationTypeId}
                            onChange={(event) => props.formEventChanged(event, 'locationTypeId')}
                            inputProps={{
                                name: 'Location Type',
                                id: 'location-type',
                            }}
                        >
                            {
                                props.locations.map(location => {
                                    return (
                                        <MenuItem
                                            key={location.id}
                                            value={location.id}
                                        >
                                            {location.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    <Grid container spacing={16}>
                        <Grid item xs={3}>
                            <TextField
                                value={props.streetNumber}
                                label="Street No."
                                id="standard-full-width"
                                onChange={(event) => props.formEventChanged(event, 'streetNumber')}
                                style={{padding: 4}}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={9}>
                            <TextField
                                value={props.streetName}
                                label="Street Name"
                                id="standard-full-width"
                                onChange={(event) => props.formEventChanged(event, 'streetName')}
                                style={{padding: 4}}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>

                    <TextField
                        value={props.suburb}
                        label="Suburb"
                        id="standard-full-width"
                        onChange={(event) => props.formEventChanged(event, 'suburb')}
                        style={{padding: 4}}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="state">
                            State
                        </InputLabel>
                        <Select
                            autoWidth={true}
                            value={props.state}
                            onChange={(event) => props.stateUpdateHandler(event)}
                            inputProps={{
                                name: 'State',
                                id: 'state',
                            }}
                        >
                            {
                                props.states.map(state => {
                                    return (
                                        <MenuItem
                                            key={state.state}
                                            value={state.state}
                                        >
                                            {state.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControlPostalCode}>
                        <InputLabel htmlFor="postal-code">
                            Post Code
                        </InputLabel>
                        <Select
                            disabled={props.state === ''}
                            autoWidth={true}
                            value={props.postalCode}
                            onChange={(event) => props.formEventChanged(event, 'postalCode')}
                            inputProps={{
                                name: 'Postal Code',
                                id: 'postal-code',
                            }}
                        >
                            {
                                props.postCodes.map(postCode => {
                                    return (
                                        <MenuItem
                                            key={postCode.postcode}
                                            value={postCode.postcode}
                                        >
                                            {postCode.postcode}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    <br/>
                    <br/>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '25px',
                    }}>
                        <ButtonWithIcon
                            title={ (props.formType === 'edit' ? 'Update' : 'Create') + ' Location'}
                            type="submit"
                            variant="contained"
                            color="primary"
                            icon="Account Balance"
                            styleOverrides={{
                                marginBottom: '15px',
                            }}
                        />
                    </div>
                </form>
            </Paper>
        </React.Fragment>
    )
};

manageLocationForm.propTypes = {

    // My fields.
    formType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    streetName: PropTypes.string.isRequired,
    streetNumber: PropTypes.string.isRequired,
    suburb: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    companyId: PropTypes.number.isRequired,
    locationTypeId: PropTypes.number.isRequired,
    stateUpdateHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(manageLocationForm);
