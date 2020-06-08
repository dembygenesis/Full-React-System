import * as actionTypes from './actionTypes';
import API from "../../api";
import {hasNoAPIErrors} from "../../utilities/utilities";

export const getArchives = dispatch => {
    return async dispatch => {
        const archives = await API().Report().getArchives();

        if (hasNoAPIErrors(archives)) {
            dispatch(setArchives(archives.data.data.data));
        }
    };
};

export const setArchives = archives => {
    return {
        type: actionTypes.SET_ARCHIVES,
        archives: archives,
    }
};