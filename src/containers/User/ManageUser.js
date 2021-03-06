import React, {Component} from 'react';

import {connect} from 'react-redux';

import ManageUserForm from '../../components/ComplianceLink/Forms/User/ManageUserForm';
import {
    getUserFormData,
    updateUserFormHandler,
    addUser,
    updateUser,
    resetManageFormFields
} from "../../store/actions";

import {withRouter} from 'react-router-dom';
import BackButton from "../../components/UI/BackButton/BackButton";

class ManageUser extends Component {

    getFormType() {
        const url = this.props.location.pathname;

        const formType = url.match('/user/add') ? 'add'
            : url.match('/user/edit') ? 'edit' : null;

        return formType;
    }

    initializeForm() {

        this.props.resetManageFormFields();

        const errorHandler = () => this.props.history.push('/user');
        const formType = this.getFormType();
        const setterCallback = (userTypes, managementCompanies) => {
            if (formType === 'add') {
                const defaultUserTypeId = parseFloat(userTypes[0].id);
                const defaultManagementCompanyId = parseFloat(managementCompanies[0].id);

                this.props.formUpdateHandler(defaultUserTypeId, 'userTypeId');
                this.props.formUpdateHandler(defaultManagementCompanyId, 'managementCompanyId');
            }
        };
        const {number: userId} = this.props.match.params;

        this.props.onLoadGetUserFormData(formType, userId, errorHandler, setterCallback);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Determines if view should be update or add.
        if (this.props.location !== prevProps.location) {
            this.props.setPageTitle('');
            this.initializeForm();
        }
    }

    componentDidMount() {
        this.props.setPageTitle('');
        this.initializeForm();
    }

    formCanRender = () => {
        const managementCompanies = this.props.managementCompanies;
        const userTypes = this.props.userTypes;

        return userTypes.length !== 0 && managementCompanies.length !== 0;
    };

    formEventChangedHandler = (event, formField) => {
        this.props.formUpdateHandler(event.target.value, formField);
    };

    onSubmitHandler = (event) => {

        event.preventDefault();

        const formType = this.getFormType();

        if (formType === 'add') {
            const postData = {
                "user_username": this.props.username,
                "user_firstname": this.props.firstname,
                "user_lastname": this.props.lastname,
                "user_email": this.props.email,
                "user_mobile_number": this.props.mobileNumber,
                "user_password": this.props.password,
                "user_user_type_id": this.props.userTypeId,
                "user_management_company_id": this.props.managementCompanyId
            };

            const navigationCallback = (newUserId) => {
                const redirectTo = `/user/edit/${newUserId}`;

                this.props.history.push(redirectTo);
                // this.initializeForm();
            };

            this.props.addUser(postData, navigationCallback);
        }

        if (formType === 'edit') {
            const postData = {
                "user_edit_id": this.props.userId,
                "user_edit_username": this.props.username,
                "user_edit_firstname": this.props.firstname,
                "user_edit_lastname": this.props.lastname,
                "user_edit_email": this.props.email,
                "user_edit_mobile_number": this.props.mobileNumber,
                "user_edit_password": this.props.password
            };

            this.props.updateUser(postData);
        }
    };

    render() {
        let form = (
            <React.Fragment>
                <BackButton routeTo="/user" />

                <ManageUserForm
                    formEventChanged={this.formEventChangedHandler}
                    submitHandler={this.onSubmitHandler}
                    type={this.props.formType}
                    userId={this.props.userId}
                    firstname={this.props.firstname}
                    lastname={this.props.lastname}
                    username={this.props.username}
                    mobileNumber={this.props.mobileNumber}
                    email={this.props.email}
                    password={this.props.password}
                    userTypeId={this.props.userTypeId}
                    managementCompanyId={this.props.managementCompanyId}
                    setPageTitle={this.props.setPageTitle}

                    userTypes={this.props.userTypes}
                    managementCompanies={this.props.managementCompanies}
                />
            </React.Fragment>
        );

        return this.formCanRender() ? form : null;
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,

        // Form Fields.
        userId: state.user.userFields.userId,
        firstname: state.user.userFields.firstname,
        lastname: state.user.userFields.lastname,
        username: state.user.userFields.username,
        password: state.user.userFields.password,
        email: state.user.userFields.email,
        mobileNumber: state.user.userFields.mobileNumber,
        userTypeId: state.user.userFields.userTypeId,
        managementCompanyId: state.user.userFields.managementCompanyId,
        formType: state.user.formType,

        managementCompanies: state.user.managementCompanies,
        userTypes: state.user.userTypes,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadGetUserFormData: (formType, userId, errorHandler, callback) => dispatch(getUserFormData(formType, userId, errorHandler, callback)),
        formUpdateHandler: (value, formField) => dispatch(updateUserFormHandler(value, formField)),
        updateUser: (postData) => dispatch(updateUser(postData)),
        addUser: (postData, navigationCallback) => dispatch(addUser(postData, navigationCallback)),
        resetManageFormFields: () => dispatch(resetManageFormFields()),
    }
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ManageUser)
);
