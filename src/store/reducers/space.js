import * as actionTypes from '../actions/actionTypes';

const initialState = {
    spaces: null,
    locations: null,
    spaceFormFields: {
        formType: '',

        spaceId: '',
        name: '',
        locationId: '',
        description: '',
        selectedLocationId: '0',
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SPACE_UPDATE_FORM_HANDLER:
            return {
                ...state,
                spaceFormFields: {
                    ...state.spaceFormFields,
                    [action.formField]: action.value,
                }
            };
        case actionTypes.SET_LOCATIONS_AND_SPACE_DETAILS:
            return {
                locations: action.locations,
                spaceFormFields: {
                    ...state.spaceFormFields,
                    spaceId: action.space.id,
                    name: action.space.name,
                    locationId: action.space.location_id,
                    description: action.space.description,
                }
            };
        case actionTypes.SET_SPACE_AND_LOCATION_FILTERS:
            return {
                ...state,
                spaces: action.spaces,
                locations: action.locationFilters,
            };
        case actionTypes.RESET_MANAGE_SPACES_FORM:
            return {
                spaces: null,
                locations: null,
                spaceFormFields: {
                    formType: '',

                    spaceId: '',
                    name: '',
                    locationId: '',
                    description: '',
                    selectedLocationId: '0',
                }
            };
        case actionTypes.SET_SPACES:
            return {
                ...state,
                spaces: action.spaces
            };
        case actionTypes.SET_SPACE:
            return {
                ...state,
                spaceFormFields: {
                    ...state.spaceFormFields,
                    spaceId: action.space.id,
                    name: action.space.name,
                    locationId: action.space.location_id,
                    description: action.space.description,
                    // selectedLocationId: action.space.location_id,
                }
            };
        case actionTypes.SET_SPACE_LOCATIONS:
            return {
                ...state,
                locations: action.locations
            };

        default:
            return state;
    }
};

export default reducer;