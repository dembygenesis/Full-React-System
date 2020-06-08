import * as actionTypes from '../actions/actionTypes';
import {hasNoAPIErrors} from "../../utilities/utilities";

import API from '../../api';

export const getSpaces = () => {

    return async dispatch => {

        dispatch(resetManageSpaceFields());

        Promise.all([
            API().Space().getAll(),
            API().Space().getAllFilters()
        ]).then(res => {
            if (hasNoAPIErrors(res[0]) && hasNoAPIErrors(res[1])) {
                let spaces = res[0].data.data.data;
                let locationFilters = res[1].data.data.data;

                dispatch(setSpacesAndLocationFilters(spaces, locationFilters));
            }
        }).catch(err => {

        });
    }
};

export const setSpacesAndLocationFilters = (spaces, locationFilters) => {
    return {
        type: actionTypes.SET_SPACE_AND_LOCATION_FILTERS,
        spaces: spaces,
        locationFilters: locationFilters,
    }
};

export const getSpacesByLocation = locationId => {

    return async dispatch => {

        let spaces = await API().Space().getFiltered({location_id: locationId});

        if (hasNoAPIErrors(spaces)) {
            spaces = spaces.data.data.data;

            dispatch(setSpaces(spaces));
        }
    }
};

export const deleteSpace = spaceId => {

    return async dispatch => {
        let result = await API().Space().void({space_id: spaceId});

        if (hasNoAPIErrors(result)) {
            dispatch(getSpaces());
        }
    }
};

export const setSpaces = spaces => {
    return {
        type: actionTypes.SET_SPACES,
        spaces: spaces,
    }
};

export const resetManageSpaceFields = () => {
    return {
        type: actionTypes.RESET_MANAGE_SPACES_FORM,
    };
};

export const getSpaceAndLocations = (formType, spaceId, errorHandler, setterCallback) => {
    return async dispatch => {

        let hasLocations = await API().Space().accessCheck();

        if (hasNoAPIErrors(hasLocations)) {
            hasLocations = hasLocations.data.data.data;

            if (hasLocations) {
                dispatch(updateSpaceFormHandler(formType, 'formType'));

                Promise.all([
                    API().Space().getAllFilters(),
                    (formType === 'edit') ? API().Space().getOne(spaceId) : true,
                ]).then(res => {

                    if (hasNoAPIErrors(res[0]) && hasNoAPIErrors(res[1])) {
                        let locations = res[0].data.data.data;
                        let space = (formType === 'edit')
                            ? res[1].data.data.data[0]
                            : false;

                        if (space) {
                            dispatch(setLocationsAndSpaceDetails(locations, space));
                        } else {
                            dispatch(setLocations(locations));
                        }

                        setterCallback(locations, space);
                    }

                }).catch(err => {

                });
            }
        }
    };
};

export const setLocations = locations => {
    return {
        type: actionTypes.SET_SPACE_LOCATIONS,
        locations: locations,
    }
};

export const setLocationsAndSpaceDetails = (locations, space) => {
    return {
        type: actionTypes.SET_LOCATIONS_AND_SPACE_DETAILS,
        locations: locations,
        space: space,
    }
};

export const setSpace = space => {
    return {
        type: actionTypes.SET_SPACE,
        space: space,
    }
};

export const updateSpaceFormHandler = (value, formField) => {
    return {
        type: actionTypes.SPACE_UPDATE_FORM_HANDLER,
        value: value,
        formField: formField
    }
};

export const addSpace = (postData, navigationCallback) => {

    return async (dispatch) => {

        const newSpace = await API().Space().add(postData);
        
        if (hasNoAPIErrors(newSpace))
            navigationCallback(newSpace.data.data.data.newId);
    }
};

export const updateSpace = postData => {

    return async (dispatch) => {

        let updatedSpace = await API().Space().update(postData);

        if (hasNoAPIErrors(updatedSpace)) {
            const space = await API().Space().getOne(postData.space_id);

            if (hasNoAPIErrors(space)) {
                dispatch(setSpace(space.data.data.data[0]));
            }
        }
    }
};
