import * as actionTypes from './actionTypes';

import API from '../../api';
import {hasNoAPIErrors} from "../../utilities/utilities";

const setUsers = users => {
    return {
        type: actionTypes.SET_USERS,
        users: users
    }
};

export const getUsers = () => {
    return async dispatch => {
        try {
            let users = await API().User().getAll();

            console.log(users);

            if (hasNoAPIErrors(users))
                dispatch(setUsers(users.data.data.data));
            else
                throw new Error("Error fetching the user.");
        } catch (errors) {
            alert(JSON.stringify(errors));
        }
    }
};

export const getUserDetails = (userId) => {
    return async dispatch => {
        const userDetails = await API().User().getOne(userId);

        if (hasNoAPIErrors(userDetails)) {
            dispatch(setUserDetails(userDetails.data.data.data));
        }
    }
};

export const addUser = (postData, navigationCallback) => {
    return async () => {
        const result = await API().User().add(postData);

        if (hasNoAPIErrors(result)) {
            navigationCallback(result.data.data.data.newId);
        }
    };
};

export const resetManageFormFields = () => {
    return {
        type: actionTypes.RESET_MANAGE_FORM_FIELDS
    }
};

export const updateUser = postData => {
    return async dispatch => {
        let result = await API().User().update(postData);

        if (hasNoAPIErrors(result))
            dispatch(getUserDetails(postData.user_edit_id));
    }
};

export const approveUser = postData => {
    return async dispatch => {
        let result = await API().User().approve(postData);

        if (hasNoAPIErrors(result))
            dispatch(getUserDetails(postData.user_edit_id));
    }
};

export const setManagementCompanies = (managementCompanies) => {
    return {
        type: actionTypes.USER_SET_MANAGEMENT_COMPANIES,
        managementCompanies: managementCompanies
    }
};

export const getUserFormData = (formType, userId, errorHandler, setterCallback) => {

    return async dispatch => {

        Promise.all([
            API().User().getAllManagementCompany(),
            API().User().getAllUserTypes(),
            (formType === 'edit' || formType === 'approve') ? API().User().getOne(userId) : true
        ]).then(response => {
            if (hasNoAPIErrors(response[0])
                && hasNoAPIErrors(response[1])
                && hasNoAPIErrors(response[2])
            ) {
                const managementCompanies = response[0].data.data.data;
                const userTypes = response[1].data.data.data;
                const userDetails = (formType === 'edit' || formType === 'approve') ? response[2].data.data.data : false;

                dispatch(setUserDetails(userDetails));
                dispatch(setManagementCompanies(managementCompanies));
                dispatch(setUserTypes(userTypes));
                dispatch(setFormType(formType));

                setterCallback(userTypes, managementCompanies);
            } else {
                alert('There are errors when populating the form fields. Redirecting...');
                errorHandler();
            }
        });


    }
};

export const setFormType = formType => {
    return {
        type: actionTypes.USER_SET_USER_FORM_TYPE,
        formType: formType
    }
};

export const setUserDetails = userDetails => {
    return {
        type: actionTypes.USER_SET_USER_DETAILS,
        userDetails: userDetails
    }
};

export const setUserTypes = (userTypes) => {
    return {
        type: actionTypes.USER_SET_ACCOUNT_TYPES,
        userTypes: userTypes
    }
};

export const updateUserFormHandler = (value, formField) => {
    return {
        type: actionTypes.USER_UPDATE_FORM_HANDLER,
        value: value,
        formField: formField
    };
};

export const voidUser = userId => {
    return async dispatch => {
        const result = await API().User().void({user_id: userId});

        if (hasNoAPIErrors(result))
            dispatch(getUsers());
    }
};