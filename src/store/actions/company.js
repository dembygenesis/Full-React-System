import * as actionTypes from './actionTypes';

import API from '../../api';
import {hasNoAPIErrors} from "../../utilities/utilities";

export const getCompanies = () => {
    return async dispatch => {
        const companies = await API().Company().getAll();

        if (hasNoAPIErrors(companies)) {
            dispatch(setCompanies(companies.data.data.data));
        }
    }
};

export const setCompanies = companies => {
    return {
        type: actionTypes.SET_COMPANIES,
        companies: companies
    }
};

export const updateCompanyFormHandler = (value, formField) => {
    return {
        type: actionTypes.COMPANY_UPDATE_FORM_HANDLER,
        value: value,
        formField: formField
    }
};

export const getCompanyFormData = (formType, companyId, errorHandler, callback) => {
    return async dispatch => {
        if (formType === 'edit') {
            let companyDetails = await API().Company().getOne(companyId);

            if (hasNoAPIErrors(companyDetails)) {
                dispatch(setCompanyFormData(companyDetails.data.data.data[0]));
                dispatch(setFormType(formType));
            } else {
                errorHandler();
            }
        } else {
            dispatch(setFormType(formType));
        }
    };
};

export const updateCompany = postData => {
    return async dispatch => {
        const result = await API().Company().update(postData);

        if (hasNoAPIErrors(result)) {
            const companyDetails = await API().Company().getOne(postData.company_id);

            dispatch(setCompanyFormData(companyDetails.data.data.data[0]));
        }
    };
};

export const saveCreditCard = postData => {
    return async dispatch => {
        const result = await API().Company().saveCreditCard(postData);

        if (hasNoAPIErrors(result)) {
            const companyDetails = await API().Company().getOne(postData.company_id);
            dispatch(setCompanyFormData(companyDetails.data.data.data[0]));
        }
    }
}
export const resetCompanyFormFields = () => {
    return {
        type: actionTypes.RESET_COMPANY_FORM_FIELDS
    };
};

export const setFormType = formType => {
    return {
        type: actionTypes.SET_COMPANY_FORM_TYPE,
        formType: formType
    };
};

export const setCompanyFormData = companyDetails => {
    return {
        type: actionTypes.SET_COMPANY_DETAILS,
        companyDetails: companyDetails
    };
};

export const addNewCompany = (postData, navigationCallback) => {
    return async () => {

        const result = await API().Company().add(postData);

        if (hasNoAPIErrors(result)) {
            navigationCallback(result.data.data.data.newId);
        } else {
            console.log(result);
        }
    };
};

export const deleteCompanyById = companyId => {
    return async dispatch => {

        const result = await API().Company().void({ company_id: companyId });

        if (hasNoAPIErrors(result)) {
            dispatch(getCompanies());
        }
    };
};

export const getAssignableUsers = (companyId, errCallback, assignMode) => {
    return async dispatch => {

        const postData = { company_id: companyId };

        let assignableUsers = null;

        if (assignMode === 'Administrator' || assignMode === 'Account Holder') {
            assignableUsers = await API().Company().getAccountHolderAccessDetails(postData);
        }

        if (assignMode === 'Reviewer') {
            assignableUsers = await API().Company().getReviewerAccessDetails(postData);
        }

        if (hasNoAPIErrors(assignableUsers)) {
            assignableUsers = assignableUsers.data.data.data;

            dispatch(setAssignableUsers(assignableUsers));
        } else {
            alert('Something went wrong.');
            errCallback();
        }
    };
};

export const getCompanyDetailsAndAssignableUsers = (companyId, errCallback, assignMode) => {
    return async dispatch => {

        const postData = { company_id: companyId };

        let assignableUsers = null;

        // Fetch company details immediately, don't have to trouble with assign modes here.
        let companyDetails =  await API().Company().getCompanyDetails(postData);
        
        if (assignMode === 'Administrator' || assignMode === 'Account Holder' ) {
            assignableUsers = await API().Company().getOneAccountHolderAssignment(companyId);
        }

        if (assignMode === 'Reviewer') {
            assignableUsers = await API().Company().getOneReviewerAssignment(companyId);
        }

        if (hasNoAPIErrors(assignableUsers) && hasNoAPIErrors(companyDetails)) {
            assignableUsers = assignableUsers.data.data.data;
            companyDetails = companyDetails.data.data.data[0]['name'];

            dispatch(setManagedUsersAndCompany(assignableUsers, companyDetails));
        } else {
            alert('Something went wrong.');
            errCallback();
        }
    };
};

export const setManagedUsersAndCompany = (managedUsers, company) => {
    return {
        type: actionTypes.SET_MANAGED_USERS_AND_COMPANY,
        managedUsers: managedUsers,
        company: company,
    }
};

export const updateUserPrivilege = (companyId, userId, userPrivilege, assignMode) => {
    return async dispatch => {

        let result = null;

        const postData = {
            company_id: companyId,
            user_ids: '' + userId,
        };

        if (userPrivilege === 'Unassigned') {
            if (assignMode === 'Administrator' || assignMode === 'Account Holder') {
                result = await API().Company().addAccountHolderAssignment(postData);
            }
            else {
                result = await API().Company().addReviewerAssignment(postData);
            }
        }

        if (userPrivilege === 'Assigned') {
            if (assignMode === 'Administrator' || assignMode === 'Account Holder') {
                result = await API().Company().voidAccountHolderAssignment(postData);
            }
            else {
                result = await API().Company().voidReviewerAssignment(postData);
            }
        }

        if (hasNoAPIErrors(result)) {
            dispatch(getAssignableUsers(companyId, null, assignMode));
        } else {
            alert('Something went wrong.');
        }
    };
};

export const updateAssignMode = value => {
    return {
        type: actionTypes.SET_ASSIGN_MODE,
        value: value,
    }
};

export const setAssignableUsers = assignableUsers => {
    return {
        type: actionTypes.SET_ASSIGNABLE_USERS,
        assignableUsers: assignableUsers
    };
};
