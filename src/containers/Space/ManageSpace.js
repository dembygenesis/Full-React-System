import React, {Component} from 'react';

import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import ManageSpaceForm from '../../components/ComplianceLink/Forms/Space/ManageSpaceForm';

import {
    resetManageSpaceFields,
    getSpaceAndLocations,
    updateSpaceFormHandler,
    addSpace,
    updateSpace,
} from "../../store/actions";
import LinearLoading from "../../components/UI/LinearLoading/LinearLoading";
import BackButton from "../../components/UI/BackButton/BackButton";

class Location extends Component {

    getFormType() {
        const url = this.props.location.pathname;

        const formType = url.match('/space/add') ? 'add'
            : url.match('/space/edit') ? 'edit' : null;

        return formType;
    }

    initializeForm() {
        this.props.resetManageSpaceFields();

        const errorHandler = () => this.props.history.push('/space');
        const formType = this.getFormType();

        const setterCallback = (locations, space) => {

            if (formType === 'add') {
                const locationId = parseFloat(locations[0].id);
                this.props.formUpdateHandler(locationId, 'selectedLocationId');
            }

            if (formType === 'edit') {
                const locationId = parseFloat(space.location_id);
                this.props.formUpdateHandler(locationId, 'selectedLocationId');
            }
        };

        const {number: spaceId} = this.props.match.params;

        this.props.onLoadGetSpaceAndLocationFormData(formType, spaceId, errorHandler, setterCallback);
    }

    formEventChangedHandler = (event, formField) => {
        this.props.formUpdateHandler(event.target.value, formField);
    };

    onSubmitHandler = (event) => {

        event.preventDefault();

        const formType = this.getFormType();

        if (formType === 'add') {
            const postData = {
                location_id: this.props.selectedLocationId,
                name: this.props.name,
                description: this.props.description,
            };

            const navigationCallback = (newUserId) => {
                const redirectTo = `/space/edit/${newUserId}`;

                this.props.history.push(redirectTo);
            };

            this.props.addSpace(postData, navigationCallback);
        }

        if (formType === 'edit') {
            const postData = {
                space_id: this.props.spaceId,
                location_id: this.props.selectedLocationId,
                name: this.props.name,
                description: this.props.description,
            };

            this.props.updateSpace(postData);
        }
    };

    /**
     * Lifecycle methods.
     */

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Detect url changes (when successfully creating a location, we redirect to the edit page).
        if (this.props.location !== prevProps.location) {
            this.initializeForm();
        }

        if (this.props.formType !== prevProps.formType) {
            let pageTitle = this.props.formType === 'add' ? 'Add' : 'Edit';

            this.props.setPageTitle(pageTitle + ' Space');
        }
    }

    componentDidMount() {
        this.props.setPageTitle('');

        this.initializeForm();
    }

    render() {

        const form = (
            <React.Fragment>
                <BackButton routeTo="/space" />

                <ManageSpaceForm
                    type={this.props.formType}
                    locations={this.props.locations}
                    submitHandler={this.onSubmitHandler}
                    formEventChanged={this.formEventChangedHandler}
                    spaceId={this.props.spaceId}
                    name={this.props.name}
                    description={this.props.description}
                    selectedLocationId={this.props.selectedLocationId}
                />
            </React.Fragment>

        );

        let display = this.props.locations !== null
            ? form
            : <LinearLoading/>;

        return display;

    }
}

const mapStateToProps = state => {
    return {
        locations: state.space.locations,

        formType: state.space.spaceFormFields.formType,

        spaceId: state.space.spaceFormFields.spaceId,
        name: state.space.spaceFormFields.name,
        description: state.space.spaceFormFields.description,
        selectedLocationId: state.space.spaceFormFields.selectedLocationId,


    }
};

const mapDispatchToProps = dispatch => {
    return {
        addSpace: (postData, navigationCallback) => dispatch(addSpace(postData, navigationCallback)),
        updateSpace: (postData) => dispatch(updateSpace(postData)),
        resetManageSpaceFields: () => dispatch(resetManageSpaceFields()),
        formUpdateHandler: (value, formField) => dispatch(updateSpaceFormHandler(value, formField)),
        onLoadGetSpaceAndLocationFormData: (formType, spaceId, errorHandler, setterCallback) => dispatch(getSpaceAndLocations(formType, spaceId, errorHandler, setterCallback)),
    }
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Location)
);
