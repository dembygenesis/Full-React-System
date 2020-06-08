import axios from "../../axios-compliance-link";
import * as actionTypes from '../actions/actionTypes';

import API from '../../api';

import {removeObjectDuplicates, hasNoAPIErrors} from '../../utilities/utilities';

export const getCompliances = () => {

    return async dispatch => {
        const token = localStorage.getItem('token');

        if (token) {

            const postData = {
                token: token,
            };

            const urlCompliances = 'compliance/getCompliances';

            let compliances = await axios.post(urlCompliances, postData);

            const hasErrorCompliances = typeof compliances.data.data.error !== "undefined";

            if (!hasErrorCompliances) {

                compliances = compliances.data.data.data;

                dispatch(setCompliances(compliances));
            }
        } else {

        }
    }
};

export const deleteCompliance = (complianceId, successCallback) => {

    return async dispatch => {

        const query = await API().Compliance().void({compliance_id: complianceId});

        alert('query: ' + JSON.stringify(query));
        
        /*const token = localStorage.getItem('token');

        if (token) {

            const postData = {
                token: token,
                compliance_id: complianceId,
            };

            const urlComplianceDelete = 'compliance/deleteCompliance';

            let deleteCompliance = await axios.post(urlComplianceDelete, postData);

            const hasErrorDeleteCompliance = typeof deleteCompliance.data.data.error !== "undefined";

            if (!hasErrorDeleteCompliance) {
                successCallback();
            }
        } else {

        }*/
    }
};

/*export const deleteCompliance = (complianceId, successCallback) => {

    return async dispatch => {
        const token = localStorage.getItem('token');

        if (token) {

            const postData = {
                token: token,
                compliance_id: complianceId,
            };

            const urlComplianceDelete = 'compliance/deleteCompliance';

            let deleteCompliance = await axios.post(urlComplianceDelete, postData);

            const hasErrorDeleteCompliance = typeof deleteCompliance.data.data.error !== "undefined";

            if (!hasErrorDeleteCompliance) {
                successCallback();
            }
        } else {

        }
    }
};*/

export const getComplianceDataWithFiltersAndCategories = (formType, spaceId, errorHandler, callback) => {

    return async dispatch => {
        const token = localStorage.getItem('token');

        const postData = {
            token: token,
            space_id: spaceId,
        };

        // Check has spaces first.
        const urlComplianceHasSpaces = 'compliance/hasSpaces';

        let complianceHasSpaces = await axios.post(urlComplianceHasSpaces, postData);
        const hasErrorComplianceHasSpaces = typeof complianceHasSpaces.data.data.error !== "undefined";

        if (hasErrorComplianceHasSpaces) {
            errorHandler();

            return;
        }

        dispatch(updateComplianceFormHandler(formType, 'formType'));

        const urlFilters = 'compliance/getComplianceFilters';
        const urlCategoriesAndMeasures = 'compliance/getComplianceCategoriesAndMeasures';
        const urlComplianceDetails = 'compliance/getCompliancesFromSpaceId';

        let filters = await axios.post(urlFilters, postData);
        let categoriesAndMeasures = await axios.post(urlCategoriesAndMeasures, postData);
        let complianceDetails = (formType === 'edit')
            ? await axios.post(urlComplianceDetails, postData)
            : true;

        const hasErrorFilters = typeof filters.data.data.error !== "undefined";
        const hasErrorCategoriesAndMeasures = typeof categoriesAndMeasures.data.data.error !== "undefined";
        const hasErrorComplianceDetails = (formType === 'edit')
            ? typeof complianceDetails.data.data.error !== "undefined"
            : false;

        if (!hasErrorFilters && !hasErrorComplianceDetails && !hasErrorCategoriesAndMeasures) {
            filters = filters.data.data.data;
            categoriesAndMeasures = categoriesAndMeasures.data.data.data;

            dispatch(setComplianceFilters(filters));
            dispatch(transformComplianceCategoriesAndMeasures(categoriesAndMeasures, formType));

            if (formType === 'edit') {
                // Pull table here later.
                const urlCompliancesBySpaceId = 'compliance/getCompliancesFromSpaceId';

                let spaceIdCompliances = await axios.post(urlCompliancesBySpaceId, postData);

                if (hasNoAPIErrors(spaceIdCompliances)) {
                    spaceIdCompliances = spaceIdCompliances.data.data.data;

                    dispatch(setSpaceIdCompliances(spaceIdCompliances));
                }
            }

            callback();
        } else {
            errorHandler();
        }
    }
};

export const getSpaceIdCompliances = spaceId => {
    return async dispatch => {
        const url = 'compliance/getCompliancesFromSpaceId';
        const postData = {
            token: localStorage.getItem('token'),
            space_id: spaceId
        };

        let result = await axios.post(url, postData);

        if (hasNoAPIErrors(result)) {
            result = result.data.data.data;

            dispatch(setSpaceIdCompliances(result));
        }
    };
};

export const setSpaceIdCompliances = spaceIdCompliances => {
    return {
        type: actionTypes.SET_SPACE_ID_COMPLIANCES,
        spaceIdCompliances: spaceIdCompliances
    };
};

export const transformComplianceCategoriesAndMeasures = (categoriesAndMeasures, formType) => {

    return dispatch => {
        let categories = [];
        let measures = [];

        categoriesAndMeasures.forEach(categoryAndMeasure => {
            categories.push({
                id: categoryAndMeasure.compliance_category_id,
                name: categoryAndMeasure.compliance_category_name,
            });

            measures.push({
                id: categoryAndMeasure.compliance_measure_id,
                name: categoryAndMeasure.compliance_measure_name,
                categoryId: categoryAndMeasure.compliance_category_id,
            });
        });

        categories = removeObjectDuplicates(categories);
        measures = removeObjectDuplicates(measures);

        dispatch(setComplianceCategories(categories));
        dispatch(setComplianceMeasures(measures));

        if (formType === 'edit') {
            // Load full data filtered measures when editing.
            dispatch(setFilteredMeasures(measures));
        }
    };
};

export const updateComplianceFormHandler = (value, formField) => {
    return {
        type: actionTypes.COMPLIANCE_UPDATE_FORM_HANDLER,
        value: value,
        formField: formField
    }
};

export const setFilteredMeasures = filteredMeasures => {
    return {
        type: actionTypes.SET_FILTERED_MEASURES,
        filteredMeasures: filteredMeasures,
    }
};

export const setNarrowedFilters = (companies, locations, spaces, categories, measures, value, filterType) => {

    return async dispatch => {

        if (filterType === 'category') {

            const categoryId = value;

            const filteredMeasures = measures.filter(measure => {
                return measure.categoryId === categoryId;
            });

            dispatch(updateComplianceFormHandler('', 'selectedComplianceMeasureId'));
            dispatch(updateComplianceFormHandler(value, 'selectedComplianceCategoryId'));
            dispatch(setFilteredMeasures(filteredMeasures));
        }

        if (filterType === 'company') {
            const companyId = value;
            const filteredLocations = locations.filter(location => {
                return location.companyId === companyId
            });

            dispatch(updateComplianceFormHandler('', 'selectedLocationId'));
            dispatch(updateComplianceFormHandler('', 'selectedSpaceId'));
            dispatch(updateComplianceFormHandler(value, 'selectedCompanyId'));
            dispatch(setFilteredLocations(filteredLocations));
        }

        if (filterType === 'location') {
            const locationId = value;
            const filteredSpaces = spaces.filter(space => {
                return space.locationId === locationId
            });

            dispatch(updateComplianceFormHandler('', 'selectedSpaceId'));
            dispatch(setFilteredSpaces(filteredSpaces));
            dispatch(updateComplianceFormHandler(value, 'selectedLocationId'));
        }
    };
};

export const setFilteredSpaces = filteredSpaces => {
    return {
        type: actionTypes.SET_FILTERED_SPACES,
        filteredSpaces: filteredSpaces,
    };
};

export const setFilteredLocations = filteredLocations => {
    return {
        type: actionTypes.SET_FILTERED_LOCATIONS,
        filteredLocations: filteredLocations,
    };
};

export const setComplianceFilters = filters => {

    let companies = [];
    let locations = [];
    let spaces = [];

    filters.forEach(filter => {
        companies.push({
            companyId: filter.company_id,
            companyName: filter.company_name,
        });

        locations.push({
            companyId: filter.company_id,
            locationId: filter.location_id,
            locationName: filter.location_name,
        });

        spaces.push({
            locationId: filter.location_id,
            spaceId: filter.space_id,
            spaceName: filter.space_name,
        });
    });

    companies = removeObjectDuplicates(companies);
    locations = removeObjectDuplicates(locations);
    spaces = removeObjectDuplicates(spaces);

    return {
        type: actionTypes.SET_COMPLIANCE_FILTERS,
        companies: companies,
        locations: locations,
        spaces: spaces,
        filters: filters,
    }
};

export const setComplianceCategories = categories => {
    return {
        type: actionTypes.SET_COMPLIANCE_CATEGORIES,
        categories: categories
    }
};

export const setComplianceMeasures = measures => {
    return {
        type: actionTypes.SET_COMPLIANCE_MEASURES,
        measures: measures
    }
};

export const setComplianceFormDetails = complianceDetails => {
    return {
        type: actionTypes.SET_COMPLIANCE_FORM_DETAILS,
        complianceDetails: complianceDetails,
    };
};

export const setCompliances = compliances => {
    return {
        type: actionTypes.SET_COMPLIANCES,
        compliances: compliances,
    }
};

export const resetComplianceFormFields = () => {
    return {
        type: actionTypes.RESET_COMPLIANCE_FORM_FIELDS,
    }
};

export const updateCompliance = postData => {
    return async dispatch => {
        const token = localStorage.getItem('token');

        if (token) {
            const urlAddCompliance = 'compliance/updateCompliance';

            postData = {
                ...postData,
                token: token
            };

            const result = await axios.post(urlAddCompliance, postData);
            const hasError = typeof result.data.data.error !== "undefined";

            if (!hasError) {

            }
        }
    };
};


export const addCompliance = (postData, successCallback) => {

    return async () => {
        const token = localStorage.getItem('token');

        if (token) {

            const urlAddCompliance = 'compliance/addCompliance';

            postData = {
                ...postData,
                token: token
            };

            const result = await axios.post(urlAddCompliance, postData);

            if (hasNoAPIErrors(result)) {
                successCallback();
            }
        } else {

        }
    };
};


export const checkSpaceForCompliance = (spaceId, successCallback) => {
    return async () => {
        const token = localStorage.getItem('token');
        const postData = {
            token: token,
            space_id: spaceId,
        };

        const urlCheckSpaceForCompliance = 'compliance/spaceHasCompliance';

        let result = await axios.post(urlCheckSpaceForCompliance, postData);
        const hasError = typeof result.data.data.error !== "undefined";

        if (!hasError) {
            result = result.data.data.data;

            if (result === true) {
                successCallback();
            } else {
                // Query current available compliance measures.
                console.log('I will stay where I am.');

                // Lol dont add me here
                /*const urlGetNonCheckedMeasuresByComplianceCategory = 'compliance/getNonCheckedMeasuresByComplianceCategory';
                let availableMeasuresToAdd = await axios.post(urlGetNonCheckedMeasuresByComplianceCategory, postData);
                alert('availableMeasuresToAdd: ' + JSON.stringify(availableMeasuresToAdd));*/
            }
        } else {

        }
    }
};

export const getAvailableMeasuresByCategoryAndSpaceId = (complianceCategoryId, spaceId) => {
    return async dispatch => {
        const token = localStorage.getItem('token');

        const postData = {
            token: token,
            compliance_category_id: complianceCategoryId,
            space_id: spaceId,
        };

        const url = 'compliance/getNonCheckedMeasuresByComplianceCategory';

        let result = await axios.post(url, postData);
        const hasError = typeof result.data.data.error !== "undefined";

        if (!hasError) {
            // Set some parameters.
            result = result.data.data.data;

            dispatch(setComplianceMeasureOptions(result));
        }
    };
};

export const setComplianceMeasureOptions = complianceMeasureOptions => {
    return {
        type: actionTypes.SET_COMPLIANCE_MEASURE_OPTIONS,
        complianceMeasureOptions: complianceMeasureOptions
    };
};