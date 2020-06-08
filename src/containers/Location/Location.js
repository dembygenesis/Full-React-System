import React, {Component} from 'react';

import {NavLink} from "react-router-dom";

import Paper from '@material-ui/core/Paper';

import {withStyles} from '@material-ui/core/styles';

import {connect} from 'react-redux';

import {
    getLocationsByCompanyType,
    getLocationsAndCategories,
    deleteLocation,
    updateLocationCompanyTypeFilter,
} from "../../store/actions";

import LinearLoading from "../../components/UI/LinearLoading/LinearLoading";
import Alert from '../../components/UI/Alert/Alert';
import {hasNoAPIErrors} from "../../utilities/utilities";
import LocationsTable from "../../components/ComplianceLink/Tables/Location/LocationsTable";
import ButtonWithIcon from "../../components/UI/ButtonWithIcon/ButtonWithIcon";
import SelectWithTitle from "../../components/UI/SelectWithTitle/SelectWithTitle";

import API from '../../api';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit * .5,
    },
    formControl: {
        // margin: theme.spacing.unit * 1.5,
        minWidth: 250,
    },
    cellStyle: {
        align: 'left',
        margin: '0',
        padding: '5px 10px',
    }
});

class Location extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hasLocations: null,
            companyTypeSelected: sessionStorage.getItem('locationCompanyFilter') || props.companyTypeSelected
        }
    }

    deleteHandler = (locationId) => {
        if (window.confirm('Are you sure you want to delete this location?')) {
            this.props.deleteLocation(locationId, this.checkHasLocations);
        }
    };

    companyFilterChangedHandler = (event) => {
        const value = event.target.value;
        this.setState({
            companyTypeSelected: value
        }, this.saveFilterToSession(value))

        this.props.updateLocationCompanyTypeFilter(value);

        if (value === '0') {
            this.props.onLoadGetLocationsAndCategories();
        } else {
            this.props.getLocationsByCompanyType(value);
        }
    };

    saveFilterToSession(value) {
        sessionStorage.setItem('locationCompanyFilter', JSON.stringify(value))
    }

    checkHasLocations = async companyId => {
        // let result = await API().Location().hasCompaniesWithLocations({company_id: companyId});
        let result = await API().Location().accessCheck();

        if (!hasNoAPIErrors(result)) {
            alert("Error when trying to check if locations exists.");
        }

        result = result.data.data.data;

        this.setState({hasLocations: result});
    };

    /**
     * Lifecycle methods.
     */

    async componentDidMount() {
        this.props.setPageTitle('Location');

        this.checkHasLocations();

        this.props.onLoadGetLocationsAndCategories(this.state.companyTypeSelected);
    }

    render() {

        let display = null;

        // Display rules.
        if (this.state.hasLocations === null || this.props.hasCompanies === null || this.props.locations === null) {
            display = <LinearLoading/>;
        } else if (this.props.hasCompanies === false) {
            display = (
                <Alert type="error">
                    You have no companies assigned to you, you can only add locations if you were assigned a company.
                    Please contact your account holder.
                </Alert>
            );
        } else {
            // This is either the table or the alert.
            let table = this.props.locations.length === 0
                ? (
                    <Alert type="error">
                        You have no locations available.
                    </Alert>
                ) : (
                    <Paper style={{
                        marginTop: '5px'
                    }}>
                        <LocationsTable
                            locations={this.props.locations}
                            delete={this.deleteHandler}
                            userType={this.props.userType}
                        />
                    </Paper>
                );

            // Show table and statement.
            display = (
                <React.Fragment>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <div style={{
                            marginRight: '20px',
                        }}>
                            <ButtonWithIcon
                                title="Add New Location"
                                disabled={this.props.userType !== 'Administrator' &&  this.props.userType !== 'Account Holder'}
                                component={NavLink}
                                to="/location/add"
                                variant="contained"
                                color="primary"
                                icon="Add Circle"
                                styleOverrides={{
                                    margin: 0,
                                }}
                            />
                        </div>

                        <div>
                            <SelectWithTitle
                                title="Company Filter"
                                options={this.props.companies}
                                value={isNaN(this.state.companyTypeSelected) ? 0 : this.state.companyTypeSelected * 1}
                                hasAll
                                disabled={false}
                                onChange={(event) => this.companyFilterChangedHandler(event)}
                                selectStylesOverride={{
                                    minWidth: '300px',
                                }}
                                styleOverrides={{
                                    margin: 0,
                                    marginTop: '5px',
                                    padding: 0,
                                }}
                            />
                        </div>
                    </div>

                    <br/>

                    {table}
                </React.Fragment>
            );
        }

        return display;
    }
}

const mapStateToProps = state => {
    return {
        locations: state.location.locations,
        categories: state.location.categories,
        companies: state.location.companies,
        companyTypeSelected: state.location.companyTypeSelected,
        hasCompanies: state.location.hasCompanies,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getLocationsByCompanyType: (companyTypeSelected) => dispatch(getLocationsByCompanyType(companyTypeSelected)),
        onLoadGetLocationsAndCategories: (companyFilter) => dispatch(getLocationsAndCategories(companyFilter)),
        updateLocationCompanyTypeFilter: (companyTypeSelected) => dispatch(updateLocationCompanyTypeFilter(companyTypeSelected)),
        deleteLocation: (locationId, callback) => dispatch(deleteLocation(locationId, callback)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Location));