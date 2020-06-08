import * as actionTypes from '../actions/actionTypes';

const initialState = {
    locations: null,
    companies: [],
    states: [],
    postCodes: [],
    companyTypeSelected: '0',
    formType: '',
    locationFields: {
        locationId: '',
        name: '',
        streetName: '',
        streetNumber: '',
        suburb: '',
        postalCode: '',
        state: '',
        companyId: 0,
        locationTypeId: 0,
    },
    hasCompanies: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOCATIONS:
            return {
                ...state,
                locations: action.locations,
            };
        case actionTypes.SET_HAS_COMPANIES:
            return {
                ...state,
                hasCompanies: action.hasCompanies,
            };
        case actionTypes.SET_POSTCODES:
            return {
                ...state,
                postCodes: action.postCodes,
            };
        case actionTypes.SET_STATES:
            return {
                ...state,
                states: action.states,
            };
        case actionTypes.UPDATE_LOCATION_COMPANY_TYPE_FILTER:
            return {
                ...state,
                companyTypeSelected: action.companyTypeSelected,
            };
        case actionTypes.SET_LOCATION_DETAILS:

            return {
                ...state,
                locationFields: {
                    ...state.locationFields,
                    locationId: action.locationDetails.id,
                    name: action.locationDetails.name,
                    streetName: action.locationDetails.street_name,
                    streetNumber: action.locationDetails.street_number,
                    suburb: action.locationDetails.suburb,
                    postalCode: action.locationDetails.postal_code,
                    state: action.locationDetails.state,
                    companyId: action.locationDetails.company_id,
                    locationTypeId: action.locationDetails.location_type_id,
                }
            };
        case actionTypes.LOCATION_SET_USER_FORM_TYPE:
            return {
                ...state,
                formType: action.formType,
            };
        case actionTypes.SET_LOCATION_TYPES:
            return {
                ...state,
                locations: action.locationTypes,
            };
        case actionTypes.SET_COMPANIES_TYPES:
            return {
                ...state,
                companies: action.companies,
            };
        case actionTypes.SET_LOCATIONS_AND_COMPANY_TYPES:
            return {
                ...state,
                locations: action.locations,
                companies: action.companyTypes,
            };
        case actionTypes.RESET_MANAGE_LOCATION_FORM_FIELDS:
            return {
                ...state,
                locationFields: {
                    ...state.locationFields,
                    name: '',
                    streetName: '',
                    streetNumber: '',
                    suburb: '',
                    postalCode: '',
                    state: '',
                    companyId: 0,
                    locationTypeId: 0,
                },
                locations: null,
                companies: [],
                companyTypeSelected: '0',
                formType: '',
            };
        case actionTypes.LOCATION_UPDATE_FORM_HANDLER:
            return {
                ...state,
                locationFields: {
                    ...state.locationFields,
                    [action.formField]: action.value
                },

            };
        default:
            return state;
    }
}

export default reducer;