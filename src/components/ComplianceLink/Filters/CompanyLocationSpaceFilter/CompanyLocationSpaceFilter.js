import React, {Component} from 'react';

import propTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {removeObjectDuplicates} from "../../../../utilities/utilities";

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

class CompanyLocationSpaceFilter extends Component {

    state = {
        filters: [],

        lastUpdatedFilter: '',
        lastUpdatedFilterValue: '',
    };

    transformFilters(filters) {

        let companies = [];
        let locations = [];
        let spaces = [];

        filters.forEach(filter => {
            companies.push({
                companyId: filter.company_id,
                companyName: filter.company_name,
            });

            locations.push({
                companyId: filter.company_id,
                locationId: filter.location_id,
                locationName: filter.location_name,
            });

            spaces.push({
                locationId: filter.location_id,
                spaceId: filter.space_id,
                spaceName: filter.space_name,
            });
        });

        companies = removeObjectDuplicates(companies);
        locations = removeObjectDuplicates(locations);
        spaces = removeObjectDuplicates(spaces);

        const lastUpdatedFilter = this.state.lastUpdatedFilter;
        const lastUpdatedFilterValue = this.state.lastUpdatedFilterValue;

        if (lastUpdatedFilter !== '') {

            if (lastUpdatedFilter === 'company') {
                locations = locations.filter(location => {
                    return location.companyId === lastUpdatedFilterValue
                });
            }

            if (lastUpdatedFilter === 'location') {
                spaces = spaces.filter(space => {
                    return space.locationId === lastUpdatedFilterValue
                });
            }

            if (lastUpdatedFilter === 'space') {
                // Do nothing - no filtering follows. Just kept for pattern purposes.
            }
        }

        return {
            companies: companies,
            locations: locations,
            spaces: spaces,
        };
    }

    onFilterUpdated = (event, formField) => {
        event.preventDefault();

        const value = event.target.value;

        if (formField === 'company') {
            this.props.formUpdateHandler(value, 'selectedCompanyId');
            this.props.formUpdateHandler('', 'selectedLocationId');
            this.props.formUpdateHandler('', 'selectedSpaceId');
        }

        if (formField === 'location') {
            this.props.formUpdateHandler(value, 'selectedLocationId');
            this.props.formUpdateHandler('', 'selectedSpaceId');
        }

        if (formField === 'space') {
            this.props.formUpdateHandler(value, 'selectedSpaceId');

            this.props.spaceChangedHandler(value);
        }

        this.setState({
            lastUpdatedFilter: formField,
            lastUpdatedFilterValue: value,
        });
    };

    componentDidMount() {

    }

    render() {
        const {classes} = this.props;

        const generatedFilters = this.transformFilters(this.props.filters);

        const companies = generatedFilters['companies'];
        const locations = generatedFilters['locations'];
        const spaces = generatedFilters['spaces'];

        return (
            <React.Fragment>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="company">
                        Company
                    </InputLabel>
                    <Select
                        autoWidth={true}
                        value={this.props.selectedCompanyId}
                        onChange={(event) => this.onFilterUpdated(event, 'company')}
                        inputProps={{
                            name: 'Company',
                            id: 'company',
                        }}
                    >
                        {
                            companies.map(company => (
                                <MenuItem
                                    key={company.companyId}
                                    value={company.companyId}
                                >
                                    {company.companyName}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>


                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="location">
                        Location
                    </InputLabel>
                    <Select
                        autoWidth={true}
                        value={this.props.selectedLocationId}
                        onChange={(event) => this.onFilterUpdated(event, 'location')}
                        disabled={this.props.selectedCompanyId === ''}
                        inputProps={{
                            name: 'Location',
                            id: 'location',
                        }}
                    >
                        {
                            locations.map(location => (
                                <MenuItem
                                    key={location.locationId}
                                    value={location.locationId}
                                >
                                    {location.locationName}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="space">
                        Space
                    </InputLabel>
                    <Select
                        autoWidth={true}
                        value={this.props.selectedSpaceId}
                        onChange={(event) => this.onFilterUpdated(event, 'space')}
                        disabled={this.props.selectedLocationId === ''}
                        inputProps={{
                            name: 'Space',
                            id: 'space',
                        }}
                    >
                        {
                            spaces.map(space => (
                                <MenuItem
                                    key={space.spaceId}
                                    value={space.spaceId}
                                >
                                    {space.spaceName}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </React.Fragment>
        );
    }
}

CompanyLocationSpaceFilter.propTypes = {
    filters: propTypes.array.isRequired,
    selectedCompanyId: propTypes.oneOfType([
        propTypes.string,
        propTypes.number
    ]).isRequired,
    selectedLocationId: propTypes.oneOfType([
        propTypes.string,
        propTypes.number
    ]).isRequired,
    selectedSpaceId: propTypes.oneOfType([
        propTypes.string,
        propTypes.number
    ]).isRequired,
    formUpdateHandler: propTypes.func.isRequired,
    spaceChangedHandler: propTypes.func.isRequired,
};

export default withStyles(styles)(CompanyLocationSpaceFilter);