import * as actionTypes from '../actions/actionTypes';

const initialState = {
    errors: [],
    successes: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_API_ERROR: {
            const newErrors = [...state.errors];

            newErrors.push(action.error);

            return {
                ...state,
                errors: newErrors
            };
        }
        case actionTypes.REMOVE_API_ERROR: {

            const newErrors = [...state.errors].filter((data) => {
                return data.name !== action.index
            });

            return {
                ...state,
                errors: newErrors,
            };
        }
        case actionTypes.ADD_API_SUCCESS: {
            const newSuccesses = [...state.successes];

            newSuccesses.push(action.success);

            return {
                ...state,
                successes: newSuccesses
            };
        }
        case actionTypes.REMOVE_API_SUCCESS: {
            const newSuccesses = [...state.successes].filter((data) => {
                return data.name !== action.index
            });

            return {
                ...state,
                successes: newSuccesses,
            };
        }

        default:
            return state;
    }
}

export default reducer;