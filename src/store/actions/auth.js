import * as actionTypes from './actionTypes';

import axios from '../../axios-instance';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
        token: 'abcdefg'
    }
};

export const authEnd = () => {
    return {
        type: actionTypes.AUTH_END,
        token: 'abcdefg'
    }
};

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL,
    }
};

export const authenticate = (username, password, remember_me) => {

    return dispatch => {

        dispatch(authStart());

        const url = 'auth/auth';
        const authData = {
            username: username,
            password: password,
            remember_me: remember_me,
        };

        axios.post(url, authData)
            .then(response => {
                dispatch(authEnd());

                const responseData = response.data.data;

                if (typeof responseData.errors !== "undefined") {
                    dispatch(authFail());
                } else {
                    const token = responseData.data.token;
                    const userDetails = responseData.data.user_details;

                    if (typeof token !== "undefined") {
                        localStorage.setItem('token', token);
                        dispatch(setToken(token));
                        dispatch(setUserDetails(userDetails));
                    } else {
                        dispatch(authFail());
                    }
                }
            })
            .catch(err => {
                dispatch(authEnd());
            })
    };
};

export const checkTokenValidity = (token) => {

    return dispatch => {

        if (token) {
            // Validate token on the server and store variables in memory (erase later).
            const url = 'auth/getUserDetailsByToken';
            const authData = {
                token: token,
            };

            axios.post(url, authData)
                .then(response => {

                    const hasError = typeof response.data.data.error !== "undefined";

                    if (hasError) {
                        dispatch(logout());
                        alert('Token has expired, you are being logged out now: ' + JSON.stringify(response));
                    } else {

                    }
                })
                .catch(err => {
                    alert('Something went wrong when checking the token, you are being logged out now.');
                    dispatch(logout());
                });
        }


    }
};

export const getUserDetailsViaToken = () => {

    return dispatch => {
        const token = localStorage.getItem('token');

        if (token) {
            // Validate token on the server and store variables in memory (erase later).
            const url = 'auth/getUserDetailsByToken';
            const authData = {
                token: token,
            };

            axios.post(url, authData)
                .then(response => {

                    const hasError = typeof response.data.data.error !== "undefined";

                    if (hasError) {
                        window.location.replace('');
                        dispatch(logout());
                    } else {
                        const userDetails = response.data.data.data;
                        dispatch(setAuthInitialValues(token, userDetails));
                    }
                })
                .catch(err => {
                    alert('Something went wrong when checking the token, you are being logged out now.');
                    dispatch(logout());
                });
        } else {
            dispatch(checkedToken());
        }
    }
};

export const setAuthInitialValues = (token, userDetails) => {
    return {
        type: actionTypes.SET_AUTH_INITIAL_VALUES,
        token: token,
        userDetails: userDetails,
    };
};

export const checkedToken = () => {
    return {
        type: actionTypes.CHECKED_TOKEN
    }
};

export const  setToken = (token) => {
    return {
        type: actionTypes.SET_TOKEN,
        token: token,
    }
};

export const setUserDetails = (userDetails) => {
    return {
        type: actionTypes.SET_USER_DETAILS,
        userDetails: userDetails,
    }
};

export const logout = () => {
    localStorage.removeItem('token');

    return {
        type: actionTypes.LOGOUT,
    }
};

export const updateSideWideMessage = (message) => {
    return {
        type: actionTypes.UPDATE_SITE_WIDE_MESSAGE,
        payload:message
    }
}

