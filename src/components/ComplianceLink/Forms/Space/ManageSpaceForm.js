import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ButtonWithIcon from "../../../UI/ButtonWithIcon/ButtonWithIcon";
import {NavLink} from "react-router-dom";


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        padding: '20px',
        maxWidth: '700px',
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
        marginRight: theme.spacing.unit * 1.5,
        minWidth: 250,
    },
});

const manageSpaceForm = props => {
    const {classes} = props;

    return (
        <React.Fragment>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Paper className={classes.root} elevation={1}>
                    <form method="POST" className={classes.form} onSubmit={(event) => props.submitHandler(event)}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="company-type">
                                Location
                            </InputLabel>
                            <Select
                                autoWidth={true}
                                value={props.selectedLocationId}
                                onChange={(event) => props.formEventChanged(event, 'selectedLocationId')}
                                inputProps={{
                                    name: 'Location Type',
                                    id: 'location-type',
                                }}
                            >
                                {
                                    props.locations.map(location => (
                                        <MenuItem
                                            value={location.id}
                                            key={location.id}
                                        >
                                            {location.name}
                                        </MenuItem>
                                    ))
                                }

                            </Select>
                        </FormControl>

                        <TextField
                            autoComplete='off'
                            value={props.name}
                            onChange={(event) => props.formEventChanged(event, 'name')}
                            label="Name"
                            id="name"
                            style={{padding: 4}}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            autoComplete='off'
                            value={props.description}
                            onChange={(event) => props.formEventChanged(event, 'description')}
                            label="Description"
                            id="description"
                            style={{padding: 4}}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <br/>

                        <div style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}>
                            <ButtonWithIcon
                                title={ (props.type === 'edit' ? 'Update' : 'Add') + ' Space'}
                                type="submit"
                                variant="contained"
                                color="primary"
                                icon="Identity"
                                styleOverrides={{
                                    marginTop: '20px',
                                    marginBottom: '15px',
                                    marginRight: '15px',
                                }}
                            />

                            { props.type === 'edit' ? (
                                <ButtonWithIcon
                                    title="Add Another Space"
                                    component={NavLink}
                                    to="/space/add"
                                    variant="contained"
                                    icon="Add Circle"
                                    color="primary"
                                    styleOverrides={{
                                        marginTop: '20px',
                                        marginBottom: '15px',
                                    }}
                                />
                                ) : null
                            }
                        </div>

                    </form>
                </Paper>
            </div>
        </React.Fragment>
    );
};

export default withStyles(styles)(manageSpaceForm);