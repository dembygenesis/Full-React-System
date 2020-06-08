import React from 'react';
import propTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

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
    paper: {},
    select: {
        input: {
            width: '300px'
        },
    },
    formControl: {
        marginRight: theme.spacing.unit * 5,
        minWidth: 250,
    },
});

const complianceFilter = props => {
    const {classes} = props;
    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Select your Company and Location, then the users will appear
            </Typography>

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="selectedCompanyId">
                    Company
                </InputLabel>
                <Select
                    autoWidth={true}
                    value={props.selectedCompanyId}
                    onChange={props.updateFilter.bind(this)}
                    inputProps={{
                        name: 'selectedCompanyId',
                        id: 'selectedCompanyId',
                    }}
                >
                    {props.companies.map(company => (
                        <MenuItem
                            key={company.id}
                            value={company.id}
                        >
                            {company.name}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="selectedLocationId">
                    Locations
                </InputLabel>
                <Select
                    autoWidth={true}
                    value={props.selectedLocationId}
                    onChange={props.updateFilter.bind(this)}
                    inputProps={{
                        name: 'selectedLocationId',
                        id: 'selectedLocationId',
                    }}
                >
                    {props.locations.map(location => (
                        <MenuItem
                            key={location.id}
                            value={location.id}
                        >
                            {location.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </React.Fragment>
    );
};

complianceFilter.propTypes = {
    selectedCompanyId: propTypes.string.isRequired,
    selectedLocationId: propTypes.string.isRequired,

    companies: propTypes.array.isRequired,
    locations: propTypes.array.isRequired,

    updateFilter: propTypes.func.isRequired,
};

export default withStyles(styles)(complianceFilter);