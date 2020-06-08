import React, {Component} from 'react';

import {connect} from 'react-redux';

import ManageLocationForm from '../../components/ComplianceLink/Forms/Location/ManageLocationForm';
import LinearLoading from '../../components/UI/LinearLoading/LinearLoading';

import {
    getLocationFormData,
    updateLocationFormHandler,
    updateLocation,
    resetManageLocationFields,
    addLocation,
    getPostCodesByState,
} from "../../store/actions";

import {withRouter} from 'react-router-dom';
import BackButton from "../../components/UI/BackButton/BackButton";

class ManageLocation extends Component {

    getFormType() {
        const url = this.props.location.pathname;

        const formType = url.match('/location/add') ? 'add'
            : url.match('/location/edit') ? 'edit' : null;

        return formType;
    }

    initializeForm() {
        this.props.resetManageLocationFields();

        const errorHandler = () => this.props.history.push('/location');
        const formType = this.getFormType();

        const setterCallback = (locations, companies) => {

            if (formType === 'add') {
                const locationTypeId = parseFloat(locations[0].id);
                const companyId = parseFloat(companies[0].id);

                this.props.formUpdateHandler(locationTypeId, 'locationTypeId');
                this.props.formUpdateHandler(companyId, 'companyId');
            }

            if (formType === 'edit') {
                const state = this.props.state;

                this.props.getPostCodesByState(state, () => {
                    this.props.formUpdateHandler(state, 'state');
                });
            }
        };

        const {number: locationId} = this.props.match.params;

        this.props.onLoadGetLocationFormData(formType, locationId, errorHandler, setterCallback);
    }

    formCanRender = () => {

        if (this.props.locations !== null) {
            const locations = this.props.locations;
            const companies = this.props.companies;

            return locations.length !== 0 && companies.length !== 0;
        }

        return false;
    };

    formEventChangedHandler = (event, formField) => {
        this.props.formUpdateHandler(event.target.value, formField);
    };

    onSubmitHandler = (event) => {

        event.preventDefault();

        const formType = this.getFormType();

        if (formType === 'add') {
            const postData = {
                name: this.props.name,
                street_name: this.props.streetName,
                street_number: this.props.streetNumber,
                billing_address: this.props.billingAddress,
                suburb: this.props.suburb,
                postal_code: this.props.postalCode,
                company_id: this.props.companyId,
                location_type_id: this.props.locationTypeId,
                state: this.props.state,
            };

            const navigationCallback = (newUserId) => {
                const redirectTo = `/location/edit/${newUserId}`;

                this.props.history.push(redirectTo);
                // this.initializeForm();
            };

            this.props.addLocation(postData, navigationCallback);
        }

        if (formType === 'edit') {
            const postData = {
                location_id: this.props.locationId,
                name: this.props.name,
                street_name: this.props.streetName,
                street_number: this.props.streetNumber,
                billing_address: this.props.billingAddress,
                suburb: this.props.suburb,
                postal_code: this.props.postalCode,
                company_id: this.props.companyId,
                location_type_id: this.props.locationTypeId,
                state: this.props.state,
            };

            this.props.updateLocation(postData);
        }
    };

    onStateUpdateHandler = event => {

        const state = event.target.value;

        this.props.getPostCodesByState(state, () => {
            this.props.formUpdateHandler(state, 'state');
        });
    };

    /**
     * Lifecycle methods.
     */

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Detect url changes (when successfully creating a location, we redirect to the edit page).
        if (this.props.location !== prevProps.location) {
            this.props.setPageTitle('');
            this.initializeForm();
        }

        if (this.props.formType !== prevProps.formType) {
            let pageTitle = this.props.formType === 'add' ? 'Add' : 'Edit';

            this.props.setPageTitle(pageTitle + ' Location');
        }
    };

    componentDidMount() {
        this.initializeForm();
    }

    render() {
        let form = (
            <React.Fragment>

                <BackButton routeTo="/location" />

                <ManageLocationForm
                    submitHandler={this.onSubmitHandler}
                    stateUpdateHandler={this.onStateUpdateHandler}
                    formType={this.props.formType}
                    formEventChanged={this.formEventChangedHandler}
                    name={this.props.name}
                    streetName={this.props.streetName}
                    streetNumber={this.props.streetNumber}
                    suburb={this.props.suburb}
                    postalCode={this.props.postalCode}
                    state={this.props.state}
                    companyId={this.props.companyId}
                    locationTypeId={this.props.locationTypeId}

                    locations={this.props.locations}
                    companies={this.props.companies}
                    states={this.props.states}
                    postCodes={this.props.postCodes}

                    locationFields={this.props.locationFields}
                />
            </React.Fragment>
        );

        return this.formCanRender() ? form : <LinearLoading/>;
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,

        // Form Fields.
        formType: state.location.formType,

        locationId: state.location.locationFields.locationId,
        streetName: state.location.locationFields.streetName,
        streetNumber: state.location.locationFields.streetNumber,
        billingAddress: state.location.locationFields.billingAddress,
        name: state.location.locationFields.name,
        suburb: state.location.locationFields.suburb,
        postalCode: state.location.locationFields.postalCode,
        state: state.location.locationFields.state,
        companyId: state.location.locationFields.companyId,
        locationTypeId: state.location.locationFields.locationTypeId,

        locations: state.location.locations,
        companies: state.location.companies,
        states: state.location.states,
        postCodes: state.location.postCodes,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadGetLocationFormData: (formType, locationId, errorHandler, callback) => dispatch(getLocationFormData(formType, locationId, errorHandler, callback)),
        formUpdateHandler: (value, formField) => dispatch(updateLocationFormHandler(value, formField)),
        updateLocation: (postData) => dispatch(updateLocation(postData)),
        resetManageLocationFields: () => dispatch(resetManageLocationFields()),
        addLocation: (postData, navigationCallback) => dispatch(addLocation(postData, navigationCallback)),
        getPostCodesByState: (state, callback) => dispatch(getPostCodesByState(state, callback)),
    }
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ManageLocation)
);
