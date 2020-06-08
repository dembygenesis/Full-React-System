import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userFields: {
        userId: '',
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        email: '',
        mobileNumber: '',
        userTypeId: 999,
        managementCompanyId: 999,
    },
    managementCompanies: [],
    userTypes: [],
    loading: true,
    formType: '',

    users: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_SET_MANAGEMENT_COMPANIES:
            return {
                ...state,
                managementCompanies: action.managementCompanies
            };
        case actionTypes.USER_SET_ACCOUNT_TYPES:
            return {
                ...state,
                userTypes: action.userTypes
            };
        case actionTypes.USER_SET_USER_FORM_TYPE:
            return {
                ...state,
                formType: action.formType
            };
        case actionTypes.USER_UPDATE_FORM_HANDLER:
            return {
                ...state,
                userFields: {
                    ...state.userFields,
                    [action.formField]: action.value
                }
            };
        case actionTypes.USER_FORM_CHANGE_MODE:
            return {
                ...state,
                userFields: {
                    ...state.userFields,
                    [action.formField]: action.value
                }
            };
        case actionTypes.RESET_MANAGE_FORM_FIELDS:

            const resetFields = {
                userFields: {
                    userId: '',
                    firstname: '',
                    lastname: '',
                    username: '',
                    password: '',
                    email: '',
                    mobileNumber: '',
                    userTypeId: 999,
                    managementCompanyId: 999,
                },
                managementCompanies: [],
                userTypes: [],
                loading: true,
                formType: '',

                users: [],
            };

            return {
                ...state,
                ...resetFields,
                userFields: {
                    ...resetFields.userFields
                },
            };
        case actionTypes.USER_SET_USER_DETAILS:
            if (action.userDetails !== false) {
                return {
                    ...state,
                    userFields: {
                        ...state.userFields,

                        userId: action.userDetails.id,
                        firstname: action.userDetails.firstname,
                        lastname: action.userDetails.lastname,
                        username: action.userDetails.username,
                        password: action.userDetails.password,
                        email: action.userDetails.email,
                        mobileNumber: action.userDetails.mobile_number,
                        userTypeId: action.userDetails.user_type_id,
                        managementCompanyId: action.userDetails.management_company_id,
                    }
                };
            }

            return {
                ...state,
            };

        case actionTypes.SET_USERS:
            const users = action.users;

            return {
                ...state,
                users: users
            };
        default:
            return state;
    }
};

export default reducer;