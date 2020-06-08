import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: false,
    loggedIn: '',
    loading: false,
    failed: false,
    checkedToken: false,
    userDetails: {
        firstname: '',
        lastname: '',
        userType: '',
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE:
            return state;
        case actionTypes.SET_TOKEN:
            return {
                ...state,
                token: action.token,
            };
        case actionTypes.SET_AUTH_INITIAL_VALUES:
            return {
                ...state,
                token: action.token,
                userDetails: action.userDetails,
                checkedToken: true,
            };
        case actionTypes.SET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.userDetails,
            };
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                token: false,
                checkedToken: true,
            };
        case actionTypes.AUTH_END:
            return {
                ...state,
                loading: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                failed: true
            };
        case actionTypes.CHECKED_TOKEN:
            return {
                ...state,
                checkedToken: true
            };
        case actionTypes.UPDATE_SITE_WIDE_MESSAGE:
            let {userDetails} = state
            userDetails.company.site_wide_message = action.payload
            return {
                ...state,
                userDetails: userDetails
            };
        default:
            return state;
    }
};

export default reducer;