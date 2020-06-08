import React from 'react';
import propTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
    paper: {
        padding: theme.spacing.unit * 2
    },
    scaffold: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    select: {
        input: {
            width: '300px'
        },
    },
    formControl: {
        marginRight: theme.spacing.unit * 5,
        marginBottom: theme.spacing.unit * 2,
        width: '40%',
    },
    formHeading: {
        color: '#BF1E2E',
        fontWeight: 'bold',
        fontSize: '1rem'
    }
});

const complianceFilter = props => {
    const {classes} = props;
    return (
        <Paper className={classes.paper} elevation={0}>
            <Typography variant="h6" gutterBottom className={classes.formHeading}>
                Select your space and the compliance categories selected will be listed for your choice <br/>
                <small>If you would like the full compliance category list to choose from, select “All” under Location Type</small>
            </Typography>



            <div className={classes.scaffold}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedLocationId">
                        Location
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

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedSpaceId">
                        Spaces
                    </InputLabel>
                    <Select
                        autoWidth={true}
                        value={props.selectedSpaceId}
                        onChange={props.updateFilter.bind(this)}
                        inputProps={{
                            name: 'selectedSpaceId',
                            id: 'selectedSpaceId',
                        }}
                    >
                        {props.spaces.map(space => (
                            <MenuItem
                                key={space.id}
                                value={space.id}
                            >
                                {space.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

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
                        Location Type
                    </InputLabel>
                    <Select
                        autoWidth={true}
                        value={props.selectedLocationTypeId}
                        onChange={props.updateFilter.bind(this)}
                        inputProps={{
                            name: 'selectedLocationTypeId',
                            id: 'selectedLocationTypeId',
                        }}
                    >
                        <MenuItem
                            value="other"
                        >
                            All
                        </MenuItem>
                        {props.locationTypes.map(locationType => (
                            <MenuItem
                                key={locationType.id}
                                value={locationType.id}
                            >
                                {locationType.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </Paper>
    );
};

complianceFilter.propTypes = {
    selectedCompanyId: propTypes.string.isRequired,
    selectedLocationId: propTypes.string.isRequired,
    selectedSpaceId: propTypes.string.isRequired,

    companies: propTypes.array.isRequired,
    locations: propTypes.array.isRequired,
    spaces: propTypes.array.isRequired,

    updateFilter: propTypes.func.isRequired,
};

export default withStyles(styles)(complianceFilter);