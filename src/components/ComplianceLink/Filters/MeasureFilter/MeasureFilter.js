import React, {Component} from 'react';

import propTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Select from '@material-ui/core/Select';
import {removeObjectDuplicates} from "../../../../utilities/utilities";

import ComplianceFilter from '../../../UI/Filter/ComplianceFilter';

import Grid from '@material-ui/core/Grid';


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

        locationAnchors: [],
        spaceAnchors: [],
        complianceCategoryAnchors: [],
        complianceMeasureAnchors: [],
    };

    transformFilters(filters) {

        let companies = [];
        let locations = [];
        let spaces = [];
        let complianceCategories = [];
        let measures = [];

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

            complianceCategories.push({
                spaceId: filter.space_id,
                complianceCategoryId: filter.compliance_category_id,
                complianceCategoryName: filter.compliance_category_name,
            });

            measures.push({
                locationId: filter.location_id,
                spaceId: filter.space_id,
                spaceName: filter.space_name,
            });
        });

        companies = removeObjectDuplicates(companies);
        locations = removeObjectDuplicates(locations);
        spaces = removeObjectDuplicates(spaces);
        complianceCategories = removeObjectDuplicates(complianceCategories);

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
                complianceCategories = complianceCategories.filter(complianceCategory => {
                    return complianceCategory.spaceId === lastUpdatedFilterValue
                });
            }
        }

        return {
            companies: companies,
            locations: locations,
            spaces: spaces,
            complianceCategories: complianceCategories,
        };
    }

    onFilterUpdated = (event, formField) => {
        event.preventDefault();

        const value = event.target.value;

        if (formField === 'company') {
            this.props.formUpdateHandler(value, 'companyId');

            this.props.formUpdateHandler('', 'locationId');
            this.props.formUpdateHandler('', 'spaceId');
            this.props.formUpdateHandler('', 'complianceCategoryId');
            this.props.formUpdateHandler('', 'complianceMeasureId');
        }

        if (formField === 'location') {
            this.props.formUpdateHandler(value, 'locationId');

            this.props.formUpdateHandler('', 'spaceId');
            this.props.formUpdateHandler('', 'complianceCategoryId');
            this.props.formUpdateHandler('', 'complianceMeasureId');
        }

        if (formField === 'space') {
            this.props.formUpdateHandler(value, 'spaceId');

            this.props.formUpdateHandler('', 'complianceCategoryId');
            this.props.formUpdateHandler('', 'complianceMeasureId');
        }

        if (formField === 'complianceCategory') {
            this.props.formUpdateHandler(value, 'spaceId');
        }

        this.setState({
            lastUpdatedFilter: formField,
            lastUpdatedFilterValue: value,
        });
    };

    render() {

        return (
            <React.Fragment>

                <Grid container spacing={16}>
                    <Grid item xs={4}>
                        <Paper style={{
                            width: '100%',
                        }}>
                            <ComplianceFilter
                                icon="Company"
                                data={this.props.companies}
                                value={this.props.companyId}
                                onChange={(event) => this.props.updateHandler(event, 'companyId')}
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={4}>
                         <Paper style={{
                            width: '100%',
                        }}>
                            <ComplianceFilter
                                icon="Location"
                                data={this.props.locations}
                                value={this.props.locationId}
                                onChange={(event) => this.props.updateHandler(event, 'locationId')}
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={4}>
                         <Paper style={{
                            width: '100%',
                        }}>
                            <ComplianceFilter
                                icon="Space"
                                data={this.props.spaces}
                                value={this.props.spaceId}
                                onChange={(event) => this.props.updateHandler(event, 'spaceId')}
                            />
                        </Paper>
                    </Grid>
                </Grid>

                <br/>

                <Grid container spacing={16}>
                    <Grid item xs={7}>
                        <Paper style={{
                            marginTop: '10px',
                            padding: '10px 30px',
                            backgroundColor: '#f3f3f3',
                        }}>
                            <Grid container spacing={16}>

                                <Grid
                                    style={{
                                        position: 'relative'
                                    }}
                                    item xs={4}>

                                    <div>
                                        <AssignmentIcon style={{
                                            position: 'absolute',
                                            marginTop: '5px',
                                        }}/>

                                        <span style={{
                                            marginTop: '10px',
                                            marginLeft: '37px',
                                            position: 'absolute',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            color: '#'
                                        }}>Compliance Category</span>
                                    </div>

                                </Grid>

                                <Grid item xs={8}>
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        autoWidth={true}
                                        value={this.props.complianceCategoryId}
                                        onChange={(event) => this.props.updateHandler(event, 'complianceCategoryId')}
                                        disabled={this.props.spaceId === '0'}
                                        inputProps={{
                                            name: 'Category',
                                            id: 'category',
                                        }}
                                    >
                                        <MenuItem
                                            value='0'
                                        >
                                            All
                                        </MenuItem>
                                        {
                                            this.props.complianceCategories.map(complianceCategory => (
                                                <MenuItem
                                                    key={complianceCategory.id}
                                                    value={complianceCategory.id}
                                                >
                                                    {complianceCategory.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>

                {/*Invade*/}

                {/*<br/>
                <br/>
                <br/>

                <FormControl className={classes.formControl}>

                    <InputLabel htmlFor="company">
                        Company
                    </InputLabel>
                    <Select
                        autoWidth={true}
                        value={this.props.companyId}
                        onChange={(event) => this.props.updateHandler(event, 'companyId')}
                        inputProps={{
                            name: 'Company',
                            id: 'company',
                        }}
                    >
                        {
                            this.props.companies.map(company => (
                                <MenuItem
                                    key={company.id}
                                    value={company.id}
                                >
                                    {company.name}
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
                        value={this.props.locationId}
                        onChange={(event) => this.props.updateHandler(event, 'locationId')}
                        disabled={this.props.companyId === ''}
                        inputProps={{
                            name: 'Location',
                            id: 'location',
                        }}
                    >
                        {
                            this.props.locations.map(location => (
                                <MenuItem
                                    key={location.id}
                                    value={location.id}
                                >
                                    {location.name}
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
                        value={this.props.spaceId}
                        onChange={(event) => this.props.updateHandler(event, 'spaceId')}
                        disabled={this.props.locationId === ''}
                        inputProps={{
                            name: 'Space',
                            id: 'space',
                        }}
                    >
                        <MenuItem
                            value="0"
                        >
                            All
                        </MenuItem>
                        {
                            this.props.spaces.map(space => (
                                <MenuItem
                                    key={space.id}
                                    value={space.id}
                                >
                                    {space.name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <br/>
                <br/>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="category">
                        Compliance Category
                    </InputLabel>
                    <Select
                        autoWidth={true}
                        value={this.props.complianceCategoryId}
                        onChange={(event) => this.props.updateHandler(event, 'complianceCategoryId')}
                        disabled={this.props.spaceId === '0'}
                        inputProps={{
                            name: 'Category',
                            id: 'category',
                        }}
                    >
                        <MenuItem
                            value='0'
                        >
                            All
                        </MenuItem>
                        {
                            this.props.complianceCategories.map(complianceCategory => (
                                <MenuItem
                                    key={complianceCategory.id}
                                    value={complianceCategory.id}
                                >
                                    {complianceCategory.name}
                                </MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>*/}
            </React.Fragment>
        );
    }
}

CompanyLocationSpaceFilter.propTypes = {
    filters: propTypes.array.isRequired,
    companyId: propTypes.oneOfType([
        propTypes.string,
        propTypes.number
    ]).isRequired,
    locationId: propTypes.oneOfType([
        propTypes.string,
        propTypes.number
    ]).isRequired,
    spaceId: propTypes.oneOfType([
        propTypes.string,
        propTypes.number
    ]).isRequired,
    complianceCategoryId: propTypes.oneOfType([
        propTypes.string,
        propTypes.number
    ]).isRequired,
    formUpdateHandler: propTypes.func.isRequired,
    updateHandler: propTypes.func.isRequired,
    spaceChangedHandler: propTypes.func.isRequired,
};

export default withStyles(styles)(CompanyLocationSpaceFilter);