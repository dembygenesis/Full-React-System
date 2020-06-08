import * as actionTypes from './actionTypes';

import API from '../../api';
import axios from '../../axios-instance';
import {hasNoAPIErrors} from "../../utilities/utilities";

export const setLocationsAndCompanyTypes = (locations, companyTypes) => {
    return {
        type: actionTypes.SET_LOCATIONS_AND_COMPANY_TYPES,
        locations: locations,
        companyTypes: companyTypes,
    };
};


export const updateLocationCompanyTypeFilter = (companyTypeSelected) => {
    return {
        type: actionTypes.UPDATE_LOCATION_COMPANY_TYPE_FILTER,
        companyTypeSelected: companyTypeSelected
    }
};

export const updateLocationFormHandler = (value, formField) => {
    return {
        type: actionTypes.LOCATION_UPDATE_FORM_HANDLER,
        value: value,
        formField: formField
    }
};

export const getLocationsAndCategories = (companyTypeSelected) => {

    return async dispatch => {

        dispatch(resetManageLocationFields());

        let hasCompanies = await API().Location().accessCheck();

        if (hasNoAPIErrors(hasCompanies)) {
            hasCompanies = hasCompanies.data.data.data;

            dispatch(setHasCompanies(hasCompanies));

            if (hasCompanies === false) {
                dispatch(setLocationsAndCompanyTypes([], []));
                return;
            }
            Promise.all([
                isNaN(companyTypeSelected) || companyTypeSelected * 1 === 0 ? API().Location().getAll() : API().Location().getFiltered({company_id: companyTypeSelected}),
                API().Location().getAllFiltersCompany()
            ]).then(res => {
                if (hasNoAPIErrors(res[0]) && hasNoAPIErrors(res[1])) {
                    let locations = res[0].data.data.data
                    let companyTypes = res[1].data.data.data;

                    dispatch(setLocationsAndCompanyTypes(locations, companyTypes));
                }
            }).catch(err => {
                alert('On fetch locations and company types error encountered.');
            });
        } else {
            alert('On fetch locations and company types error encountered.');
        }
    }
};

export const getLocationsByCompanyType = (companyTypeSelected) => {

    return async dispatch => {

        let locations = await API().Location().getFiltered({company_id: companyTypeSelected});

        if (hasNoAPIErrors(locations)) {
            locations = locations.data.data.data;

            dispatch(setLocations(locations));
        }
    }
};

export const setLocations = locations => {
    return {
        type: actionTypes.SET_LOCATIONS,
        locations: locations
    }
};

export const resetManageLocationFields = () => {
    return {
        type: actionTypes.RESET_MANAGE_LOCATION_FORM_FIELDS
    }
};

export const setFormTypes = formType => {
    return {
        type: actionTypes.LOCATION_SET_USER_FORM_TYPE,
        formType: formType,
    };
};


export const deleteLocation = (locationId, callback) => {

    return async dispatch => {

        const result = await API().Location().void({location_id: locationId});

        if (hasNoAPIErrors(result)) {
            callback();
            dispatch(getLocationsAndCategories());
        }
    }
};

/*export const deleteLocation = (locationId, callback) => {

    return dispatch => {
        const token = localStorage.getItem('token');

        if (token) {

            const url = 'location/deleteLocation';
            const postData = {
                token: token,
                location_id: locationId,
            };

            axios.post(url, postData)
                .then(response => {
                    const hasError = typeof response.data.data.error !== "undefined";

                    // Interceptor handles it.
                    if (!hasError) {
                        callback();
                        dispatch(getLocationsAndCategories());
                    } else {

                    }
                })
                .catch(err => {
                    alert('Adding the location.');
                });
        } else {

        }
    }
};*/

export const addLocation = (postData, navigationCallback) => {

    return async dispatch => {
        try {
            const response = await API().Location().add(postData);

            if (hasNoAPIErrors(response)) {
                const locationId = response.data.data.data.newId;

                navigationCallback(locationId);
            }
        } catch (e) {
            alert('Something went wrong when trying to add a new location.')
        }
    }
};

export const updateLocation = postData => {

    return async dispatch => {
        try {
            const response = await API().Location().update(postData);

            if (hasNoAPIErrors(response)) {

                let locationDetails = await API().Location().getOne(postData.location_id);

                if (hasNoAPIErrors(locationDetails)) {
                    locationDetails = locationDetails.data.data.data[0];

                    locationDetails.company_id = parseFloat(locationDetails['company_id']);
                    locationDetails.locationTypeId = parseFloat(locationDetails['locationTypeId']);

                    dispatch(setLocationDetails(locationDetails));
                }
            }
        } catch (err) {
            alert('Something went wrong when updating the location.')
        }
    }
};

export const getLocationFormData = (formType, locationId, errorHandler, setterCallback) => {

    return async dispatch => {

        Promise.all([
            (formType === 'edit') ? API().Location().getOne(locationId) : true,
            API().Location().getAllTypesLocation(),
            API().Location().getAllFiltersCompany(),
            API().Location().getAllFiltersStates(),
        ]).then(res => {

            if (hasNoAPIErrors(res[0])
                && hasNoAPIErrors(res[1])
                && hasNoAPIErrors(res[2])
                && hasNoAPIErrors(res[3])
            ) {
                let locationDetails = (formType === 'edit') ? res[0].data.data.data[0] : true;
                let locationTypes = res[1].data.data.data;
                let companies = res[2].data.data.data;
                let states = res[3].data.data.data;

                dispatch(setLocationTypes(locationTypes));
                dispatch(setCompanies(companies));
                dispatch(setFormTypes(formType));
                dispatch(setStates(states));

                if (formType === 'edit') {
                    dispatch(setLocationDetails(locationDetails));
                }

                setterCallback(locationTypes, companies);
            } else {
                errorHandler();
            }
        }).catch(err => {

        });
    }
};

export const setLocationDetails = locationDetails => {
    return {
        type: actionTypes.SET_LOCATION_DETAILS,
        locationDetails: locationDetails
    }
};

export const setLocationTypes = locationTypes => {
    return {
        type: actionTypes.SET_LOCATION_TYPES,
        locationTypes: locationTypes
    }
};

export const setCompanies = companies => {
    return {
        type: actionTypes.SET_COMPANIES_TYPES,
        companies: companies
    }
};

export const getPostCodesByState = (state, callback) => {

    return async dispatch => {

        dispatch(updateLocationFormHandler(state, 'state'));

        const postData = {
            token: localStorage.getItem('token'),
            state: state,
        };

        const urlPostCodes = 'location/getPostCodesByState';

        let postCodes = await axios.post(urlPostCodes, postData);

        const hasErrorStates = typeof postCodes.data.data.error !== "undefined";

        if (!hasErrorStates) {
            postCodes = postCodes.data.data.data;

            dispatch(setPostCodes(postCodes));
            callback();
        }
    }
};

export const setStates = states => {
    return {
        type: actionTypes.SET_STATES,
        states: states,
    }
};

export const setPostCodes = postCodes => {
    return {
        type: actionTypes.SET_POSTCODES,
        postCodes: postCodes,
    }
};

export const setHasCompanies = hasCompanies => {
    return {
        type: actionTypes.SET_HAS_COMPANIES,
        hasCompanies: hasCompanies,
    }
};
