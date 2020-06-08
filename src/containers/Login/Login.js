import React, {Component} from 'react';

import LoginForm from '../../components/ComplianceLink/Forms/Login/LoginForm';

import {connect} from 'react-redux';


import {
    authenticate,
} from '../../store/actions';

class Login extends Component {
    state = {
        username: '',
        password: '',
        rememberMe: true,
    };

    componentDidMount() {
        // this.props.onLoadAttemptAuthenticate('a', 'a');
    }

    usernameChangedHandler = (event) => {
        this.setState({username: event.target.value});
    };

    passwordChangedHandler = (event) => {
        this.setState({password: event.target.value});
    };

    rememberMeChangedHandler = (event) => {
        this.setState({rememberMe: event.target.checked});
    };

    onSubmitHandler = (event) => {
        event.preventDefault();

        const username = this.state.username;
        const password = this.state.password;
        const rememberMe = this.state.rememberMe;

        console.log('username', username);
        console.log('password', password);
        console.log('rememberMe', rememberMe);

        this.props.authenticate(username, password, rememberMe);
    };

    render() {
        return (
            <LoginForm
                username={this.state.username}
                password={this.state.password}
                rememberMe={this.state.rememberMe}
                loading={this.props.isLoading}
                failed={this.props.loginFailed}
                usernameChanged={this.usernameChangedHandler}
                passwordChanged={this.passwordChangedHandler}
                rememberMeChanged={this.rememberMeChangedHandler}
                submitHandler={this.onSubmitHandler}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.auth.loading,
        loginFailed: state.auth.failed,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // onLoadAttemptAuthenticate: (username, password) => dispatch(authenticate(username, password)),
        authenticate: (username, password, rememberMe) => dispatch(authenticate(username, password, rememberMe)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);