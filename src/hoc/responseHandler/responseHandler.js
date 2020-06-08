import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';

import {compose} from 'redux';
import {connect} from 'react-redux';

import {
    addApiError,
    addApiSuccess,
} from '../../store/actions';
import {getToken, objectChecker} from "../../utilities/utilities";

/**
 * This is a brilliant higher order component that is used to automatically catch
 * http errors.
 */

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };

        componentWillMount() {
            /**
             * Global Interceptor.
             * Intercept return and response, do some alerts - then proceed as normal.
             */

            this.reqInterceptor = axios.interceptors.request.use(req => {

                /**
                 * ===================
                 * Pre-attach token.
                 * ===================
                 */

                const {method} = req;

                if (method === 'get') {
                    req.params = {token: getToken()};
                }

                if (method === 'post' || method === 'delete')
                    req.data.token = getToken();

                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(response => {

                const hasError = objectChecker(response, ['data', 'data', 'error']);
                const hasSuccess = objectChecker(response, ['data', 'data', 'operation']);

                if (hasError) {
                    let apiErrors = response.data.data.error;

                    apiErrors = Object.keys(apiErrors)
                        .map(apiErrorIndex => {
                            this.props.addError({
                                name: apiErrorIndex,
                                msg: apiErrors[apiErrorIndex]
                            });

                            return {
                                name: apiErrorIndex,
                                msg: apiErrors[apiErrorIndex]
                            };
                        });
                }

                if (hasSuccess) {
                    let operation = response.data.data.operation;
                    let apiSuccessMsg = response.data.data.data.msg;

                    const listeners = {
                        UPDATE_SUCCESS: 'UPDATE_SUCCESS',
                        ADD_SUCCESS: 'ADD_SUCCESS',
                        DELETE_SUCCESS: 'DELETE_SUCCESS',
                    };

                    if (typeof listeners[operation] !== "undefined") {
                        this.props.addSuccess({
                            name: operation,
                            msg: apiSuccessMsg
                        });
                    }
                }

                return response;
            }, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        // To be able to dismiss the error.
        errorConfirmedHandler = () => {
            this.setState({error: false});
        };

        onCloseHandler = () => {
            this.setState({error: null});
        };

        render() {
            return (
                <React.Fragment>
                    <Modal
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error !== null}
                        closeHandler={this.onCloseHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}
//

const mapStateToProps = state => {
    return {
        errors: state.apiError.errors,
        token: state.auth.token,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        addError: (error) => dispatch(addApiError(error)),
        addSuccess: (success) => dispatch(addApiSuccess(success)),
    }
};

const composedWithErrorHandler = compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithErrorHandler
);

export default composedWithErrorHandler;
//

// export default WithErrorHandler;
