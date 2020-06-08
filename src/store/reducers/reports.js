import * as actionTypes from '../actions/actionTypes';

const initialState = {
    archives: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ARCHIVES:
            return {
                ...state,
                archives: action.archives,
            };
        case actionTypes.USER_SET_ACCOUNT_TYPES:
            return {
                ...state,
                userTypes: action.userTypes
            };
        default:
            return state;
    }
};

export default reducer;