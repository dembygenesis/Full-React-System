import * as actionTypes from './actionTypes';

export const addApiError = error => {
    return {
        type: actionTypes.ADD_API_ERROR,
        error: error
    }
};

export const removeAPIError = index => {
    return {
        type: actionTypes.REMOVE_API_ERROR,
        index: index
    }
};

export const addApiSuccess = success => {
    return {
        type: actionTypes.ADD_API_SUCCESS,
        success: success
    }
};

export const removeAPISuccess = index => {
    return {
        type: actionTypes.REMOVE_API_SUCCESS,
        index: index
    }
};

export const remove_all_error = error => {
    return{
        type: actionTypes.REMOVE_API_ERROR_ALL,
        error: error
    }
};
