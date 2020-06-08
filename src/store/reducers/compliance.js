import * as actionTypes from '../actions/actionTypes';

const initialState = {
    compliances: [],
    spaceIdCompliances: [],

    loadingCategoryOptions: false,

    // Filters.
    filters: [],
    locations: [],
    companies: [],
    spaces: [],

    // Filtered arrays.
    filteredLocations: [],
    filteredCompanies: [],
    filteredSpaces: [],
    filteredMeasures: [],

    complianceMeasureOptions: [],

    measures: [],
    categories: [],

    complianceFormFields: {
        formType: '',

        selectedCompanyId: '',
        selectedLocationId: '',
        selectedComplianceId: '',
        selectedSpaceId: '',
        selectedComplianceCategoryId: '',
        selectedComplianceMeasureId: '',
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMPLIANCE_UPDATE_FORM_HANDLER:
            return {
                ...state,
                complianceFormFields: {
                    ...state.complianceFormFields,
                    [action.formField]: action.value
                }
            };
        case actionTypes.START_LOADING_CATEGORY_OPTIONS:
            return {
                ...state,
                loadingCategoryOptions: true
            };
        case actionTypes.STOP_LOADING_CATEGORY_OPTIONS:
            return {
                ...state,
                loadingCategoryOptions: false
            };
        case actionTypes.SET_SPACE_ID_COMPLIANCES:
            return {
                ...state,
                spaceIdCompliances: action.spaceIdCompliances,
            };
        case actionTypes.SET_COMPLIANCE_MEASURE_OPTIONS:
            return {
                ...state,
                complianceMeasureOptions: action.complianceMeasureOptions,
            };
        case actionTypes.SET_FILTERED_MEASURES:
            return {
                ...state,
                filteredMeasures: action.filteredMeasures,
            };
        case actionTypes.SET_COMPLIANCE_FORM_DETAILS:

            return {
                ...state,
                complianceFormFields: {
                    ...state.complianceFormFields,

                    selectedComplianceId: action.complianceDetails.id,
                    selectedSpaceId: action.complianceDetails.space_id,
                    selectedComplianceCategoryId: action.complianceDetails.compliance_category_id,
                    selectedComplianceMeasureId: action.complianceDetails.compliance_measure_id,
                }
            };
        case actionTypes.SET_COMPLIANCES:
            return {
                ...state,
                compliances: action.compliances
            };
        case actionTypes.SET_FILTERED_LOCATIONS:
            return {
                ...state,
                filteredLocations: action.filteredLocations
            };
        case actionTypes.SET_FILTERED_SPACES:
            return {
                ...state,
                filteredSpaces: action.filteredSpaces
            };
        case actionTypes.SET_COMPLIANCE_FILTERS:
            return {
                ...state,
                filters: action.filters,
                locations: action.locations,
                companies: action.companies,
                spaces: action.spaces,
            };
        case actionTypes.SET_COMPLIANCE_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        case actionTypes.SET_COMPLIANCE_MEASURES:
            return {
                ...state,
                measures: action.measures
            };
        case actionTypes.RESET_COMPLIANCE_FORM_FIELDS:
            return {
                ...state,
                spaceIdCompliances: [],

                locations: [],
                companies: [],
                spaces: [],

                measures: [],
                categories: [],

                complianceFormFields: {
                    selectedCompanyId: '',
                    selectedLocationId: '',
                    selectedSpaceId: '',
                    selectedComplianceCategoryId: '',
                    selectedComplianceMeasureId: '',
                },
            };
        default:
            return state;
    }
};

export default reducer;