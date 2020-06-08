import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pageTitle: '',
    sideDrawerToggled: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PAGE_TITLE:
            return {
                ...state,
                pageTitle: action.pageTitle
            };
        case actionTypes.TOGGLE_SIDE_DRAWER:
            return {
                ...state,
                sideDrawerToggled: !state.sideDrawerToggled
            };

        default:
            return state;
    }
};

export default reducer;