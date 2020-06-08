import React from 'react';
import propTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
    button: {
        margin: theme.spacing.unit * .5,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    checkbox: {
        margin: 0,
        marginRight: '5px',
        padding: 0,
    },
    paper: {

    },
    select: {

    },
    formControl: {
        marginRight: theme.spacing.unit * 1.5,
        minWidth: 350,
    },
    formControlPostalCode: {
        marginRight: theme.spacing.unit * 1.5,
        minWidth: 150,
    },
});

const complianceMeasureForm = props => {

    const {classes} = props;

    return (
        <Paper className={classes.root}>
            <form className={classes.form} onSubmit={(event) => props.update(event)}>
                <TextField
                    value={props.name}
                    label="Name"
                    name="name"
                    id="name"
                    onChange={(event) => props.formEventChanged(event, 'name')}
                    style={{padding: 4}}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    value={props.nccBcaProvisions}
                    label="NCC BCA Provisions"
                    name="nccBcaProvisions"
                    id="nccBcaProvisions"
                    onChange={(event) => props.formEventChanged(event, 'nccBcaProvisions')}
                    style={{padding: 4}}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="state">
                        Frequency Type
                    </InputLabel>
                    <Select
                        style={{
                            display: 'block',
                            width: '150px',
                        }}
                        autoWidth={true}
                        value={props.frequencyType}
                        onChange={(event) => props.formEventChanged(event, 'frequencyType')}
                        inputProps={{
                            name: 'frequencyType',
                            id: 'frequencyType',
                        }}
                    >
                        {
                            props.complianceMeasureFrequencyCategory.map(frequencyCategory => {
                                return (
                                    <MenuItem
                                        key={frequencyCategory.id}
                                        value={frequencyCategory.id}
                                    >
                                        {frequencyCategory.name}
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>

                <TextField
                    value={props.frequencyUnit}
                    label="Frequency Unit"
                    name="frequencyUnit"
                    id="frequencyUnit"
                    onChange={(event) => props.formEventChanged(event, 'frequencyUnit')}
                    style={{
                        padding: 4,
                    }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    value={props.standard}
                    label="Standard"
                    name="standard"
                    id="standard"
                    onChange={(event) => props.formEventChanged(event, 'standard')}
                    style={{
                        padding: 4,
                    }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <FormControl className={classes.formControl} style={{
                    display: 'block',
                    marginBottom: '10px',
                }}>
                    <InputLabel htmlFor="complianceCategory">
                        Compliance Category
                    </InputLabel>
                    <Select
                        autoWidth={true}
                        value={props.complianceCategoryId}
                        onChange={(event) => props.formEventChanged(event, 'complianceCategoryId')}
                        inputProps={{
                            name: 'complianceCategoryId',
                            id: 'complianceCategoryId',
                        }}
                    >
                        {
                            props.complianceMeasureCategory.map(category => {
                                return (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>

                <TextField
                    value={props.description}
                    label="Description"
                    name="description"
                    id="description"
                    onChange={(event) => props.formEventChanged(event, 'description')}
                    style={{
                        padding: 4,
                    }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    value={props.documentLink}
                    label="Document Link"
                    name="documentLink"
                    id="documentLink"
                    onChange={(event) => props.formEventChanged(event, 'documentLink')}
                    style={{
                        padding: 4,
                    }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                {
                    // Inline checkbox.
                }

                <div>
                    <Checkbox
                        className={classes.checkbox}
                        checked={props.isNational === 1 ? true : false}
                        onChange={() => props.isNationalChanged(props.isNational)}
                        value="checkedA"
                    />
                    Is National
                </div>

                <br/>

                {props.states.map(state => {
                    return (
                        <div key={state.state}>
                            <Checkbox
                                checked={ props.selectedStates.indexOf(state.state) !== -1 ? true : false }
                                className={classes.checkbox}
                                onChange={props.selectedStatesChanged.bind(this, state.state)}
                                value="checkedB"
                                color="primary"
                            />
                            {state.id} {state.name}
                        </div>
                    )
                })}

                <br/>

                <Button
                    type="submit"
                    variant="contained" color="primary">
                    Update
                </Button>
            </form>
        </Paper>
    );
};

complianceMeasureForm.propTypes = {
    name                                : propTypes.string,
    nccBcaProvisions                    : propTypes.string,
    frequencyType                       : propTypes.number,
    frequencyUnit                       : propTypes.number,
    standard                            : propTypes.string,
    complianceCategoryId                : propTypes.number,
    description                         : propTypes.string,
    documentLink                        : propTypes.string,
    isNational                          : propTypes.number,

    complianceMeasureCategory           : propTypes.array.isRequired,
    complianceMeasureFrequencyCategory  : propTypes.array.isRequired,
    states                              : propTypes.array.isRequired,
    formEventChanged                    : propTypes.func.isRequired,
    selectedStatesChanged               : propTypes.func.isRequired,
    isNationalChanged                   : propTypes.func.isRequired,
};

export default withStyles(styles)(complianceMeasureForm);