import * as actionTypes from '../actions/actionTypes';

export const setPageTitle = pageTitle => {
    return {
        type: actionTypes.SET_PAGE_TITLE,
        pageTitle: pageTitle
    }
};

export const toggleSideDrawer = () => {
    return {
        type: actionTypes.TOGGLE_SIDE_DRAWER,
    }
};