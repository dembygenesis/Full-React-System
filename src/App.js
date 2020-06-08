import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

import './App.css';

import Layout from './hoc/Layout/Layout';

import responseHandler from './hoc/responseHandler/responseHandler';
import axios from './axios-instance';

import getRoutes from './views/routes';

import {
    getUserDetailsViaToken,
    checkTokenValidity,
    setPageTitle,
} from './store/actions';

/**
 * ==============
 * Routes.
 * ==============
 */
const asyncRoutes = getRoutes();

class App extends Component {

    componentDidMount() {
        this.props.getUserDetailsViaToken();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Don't EVER CAUSE SIDE EFFECTS HERE. lol

        if (this.props.checkedToken) {
            const currentRoute = this.props.location.pathname;
            const oldRoute = prevProps.location.pathname;

            if (currentRoute !== '/login' && currentRoute !== oldRoute) {
                this.props.checkTokenValidity(this.props.token);
            }

            const oldToken = prevProps.token;
            const newToken = this.props.token;

            if (oldToken === false && newToken !== false) {
                this.props.getUserDetailsViaToken();
            }
        }
    }

    addRoute(routeContainer, url, Component) {

        const additionalMethods = {
            setPageTitle: this.props.setPageTitle,
            userType: this.props.userDetails.userType
        };

        const RouteComponent = asyncRoutes[Component];

        Component = (
            <Route
                render={routeProps => (
                    <RouteComponent
                        {...routeProps}
                        {...additionalMethods}
                    />
                )}
                key={url}
                path={url} exact
            />
        );

        routeContainer.push(Component);
    }

    addRoutes(availableRoutes, routes) {
        for (let url in routes) {
            if (routes.hasOwnProperty(url))
                this.addRoute(availableRoutes, url, routes[url]);
        }
    }

    render() {
        let routes = null;

        const userType = this.props.userDetails.userType;

        if (this.props.checkedToken) {

            let availableRoutes = [];

            if (this.props.token) {

                this.addRoutes(availableRoutes, {
                    '/test'                           : 'Test',
                    '/profile'                        : 'Profile',
                    '/dashboard/reports'              : 'Reports',
                    '/dashboard/reportDetails'        : 'ReportDetails',
                    '/managementCompany'              : 'ManagementCompany',
                    '/user-manual'                    : 'UserManual',
                });

                if (userType === 'Super Administrator') {
                    this.addRoutes(availableRoutes, {
                        '/complianceMeasure'              : 'ComplianceMeasure',
                        '/complianceMeasure/edit/:number' : 'ManageComplianceMeasure',
                        '/user/approve/:number': 'UserApprove',
                    });
                }

                if (userType === 'Super Administrator' || userType === 'Administrator' || userType === 'Account Holder') {
                    this.addRoutes(availableRoutes, {
                        '/user/add'         : 'UserManage',
                        '/user/edit/:number': 'UserManage',
                        '/user'             : 'User',
                    });
                }

                if (userType === 'Account Holder') {
                    this.addRoutes(availableRoutes, {
                        '/user-activity'         : 'UserActivity',

                        '/company'               : 'Company',
                        '/company/add'           : 'CompanyManage',
                        '/company/edit/:number'  : 'CompanyManage',
                        '/company/assign/:number': 'CompanyManagePrivileges',
                    });
                }

                if (userType === 'Administrator' || userType === 'Account Holder' || userType === 'Manager' || userType === 'Reviewer') {
                    if (userType !== 'Manager' && userType !== 'Reviewer') {
                        this.addRoutes(availableRoutes, {
                            '/location'                 : 'Location',
                            '/location/edit/:number'    : 'LocationManage',
                            '/location/assign/:number'  : 'LocationManagePrivileges',
                            '/location/add'             : 'LocationManage',
                        });
                    }

                    this.addRoutes(availableRoutes, {
                        '/space'                : 'Space',
                        '/space/add'            : 'SpaceManage',
                        '/space/edit/:number'   : 'SpaceManage',
                    });

                    this.addRoutes(availableRoutes, {
                        '/compliance'               : 'ManageCompliance',
                        '/compliance/edit/:number'  : 'ManageCompliance',
                    });
                }

                if (userType === 'Administrator' || userType === 'Compliance Certifier' || userType === 'Manager' || userType === 'Reviewer' || userType === 'Account Holder') {
                    this.addRoutes(availableRoutes, {
                        '/dashboard/compliance'         : 'MeasureManage',
                        '/dashboard/measure/:number'    : 'MeasureDashboard',
                    });
                }

                let defaultPageByUserType = null;

                if (userType === 'Compliance Certifier') {
                    defaultPageByUserType = <Redirect to="/dashboard/compliance" exact/>;
                } else if (userType === 'Manager') {
                    defaultPageByUserType = <Redirect to="/space" exact/>;
                } else if (userType === 'Reviewer') {
                    defaultPageByUserType = <Redirect to="/space" exact/>;
                } else {
                    defaultPageByUserType = <Redirect to="/user" exact/>;
                }

                routes = (
                    <Switch>
                        {availableRoutes}

                        {defaultPageByUserType}
                    </Switch>
                );
            } else {

                // If unauthenticated, we only have the login route available.
                this.addRoutes(availableRoutes, {
                    '/login' : 'Login',
                });

                routes = (
                    <Switch>
                        { availableRoutes }

                        <Redirect to="/login"/>
                    </Switch>
                );
            }
        }

        return (
            <Layout authenticated={this.props.token}>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token,
        checkedToken: state.auth.checkedToken,
        userDetails: state.auth.userDetails,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setPageTitle: (pageTitle) => dispatch(setPageTitle(pageTitle)),
        getUserDetailsViaToken: () => dispatch(getUserDetailsViaToken()),
        checkTokenValidity: (token) => dispatch(checkTokenValidity(token)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(responseHandler(App, axios)));
