import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import TimelineIcon from '@material-ui/icons/Timeline';
import AccountCircleIcon from '@material-ui/icons/AccountCircleOutlined';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

import {withStyles} from "@material-ui/core/styles";

import {connect} from 'react-redux';

import AssignmentLateIcon from '@material-ui/icons/AssignmentLateOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';

import {NavLink, withRouter} from "react-router-dom";

import {
    logout
} from '../../../store/actions';
import {formatDrawerSectionDescription, inArray} from "../../../utilities/utilities";

const styles = {
    listSubHeader: {
        backgroundColor: '#BF1E2E',
        borderRadius: '5px',
        marginBottom: '10px',
        color: 'white',
        boxShadow: '0 2px 2px 0 #888888',
    },
    listSubHeaderIcon: {
        position: 'absolute',
        top: '13px',
        left: '18px'
    },
    listSubHeaderItem: {
        borderRadiusOld: '5px',
        marginBottom: '5px',
    },
    menuItem: {
        borderRadius: '5px',
        marginBottom: '2px',
    },
    selected: {
        color: 'white'
    },
    hover: {
        paddingRight: 0
    }
};

class SidebarListItems extends Component {

    logoutHandler = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            this.props.logout();
        }
    };

    render() {

        const {open} = this.props;

        let routeRoot = this.props.location.pathname.split('/').filter(data => data !== '')[0];
        let currentRoute = '/' + routeRoot;

        const userRoute = {
            path: '/user',
            name: 'User',
            component: '',
            icon: <PeopleIcon/>
        };
        const userManualRoute = {
            path: '/user-manual',
            name: 'User Manual',
            component: '',
            icon: <PeopleIcon/>
        };

        const ComplianceMeasureRoute = {
            path: '/complianceMeasure',
            name: 'Measures',
            component: '',
            icon: <AssignmentIcon/>
        };

        const companyRoute = {
            path: '/company',
            name: 'Company/Landlord',
            component: '',
            icon: <AssignmentLateIcon/>
        };

        const userActivityRoute = {
            path: '/user-activity',
            name: 'User Activity',
            component: '',
            icon: <AssignmentIcon/>
        };

        const locationRoute = {
            path: '/location',
            name: 'Location',
            component: '',
            icon: <AccountBalanceIcon/>
        };
        const spaceRoute = {
            path: '/space',
            name: 'Space',
            component: '',
            icon: <AccountCircleIcon/>
        };
        const complianceRoute = {
            path: '/compliance',
            name: 'Compliance',
            component: '',
            icon: <AssignmentIcon/>
        };
        const measuresRoute = {
            path: '/dashboard/compliance',
            name: 'Compliance',
            component: '',
            icon: <AssignmentIcon/>
        };
        const reportsRoute = {
            path: '/dashboard/reportDetails',
            name: 'Reports',
            component: '',
            icon: <TimelineIcon/>
        };

        const userType = this.props.userType;

        const sidebarRoutesConfig = [
            inArray(['Account Holder', 'Administrator', 'Super Administrator'], userType) ? userRoute : null,
            inArray(['Super Administrator'], userType) ? ComplianceMeasureRoute : null,
            inArray(['Account Holder'], userType) ? companyRoute : null,
            inArray(['Account Holder'], userType) ? userActivityRoute : null,
            inArray(['Account Holder', 'Administrator'], userType) ? locationRoute : null,
            inArray(['Account Holder', 'Administrator', 'Manager', 'Reviewer'], userType) ? spaceRoute : null,
            inArray(['Account Holder', 'Administrator', 'Manager', 'Reviewer'], userType) ? complianceRoute : null,
        ];

        const sidebarRoutesDashboard = [
            inArray([
                'Account Holder',
                'Administrator',
                'Compliance Certifier',
                'Reviewer',
                'Manager'
            ], userType) ? measuresRoute : null,
            inArray([
                'Account Holder',
                'Administrator',
                'Compliance Certifier',
                'Reviewer',
                'Manager'
            ], userType) ? reportsRoute : null,
        ];

        let dynamicDrawerStyles = {};

        if (open === false) {
            dynamicDrawerStyles = {
                margin: 0,
                padding: 0,
                textAlign: 'center',
            };
        }

        return (
            <React.Fragment>
                <List>
                    <div>
                        <Divider style={{
                            width: '80%',
                            margin: '0 auto',
                            marginBottom: '25px',
                        }}/>

                        {inArray(['Account Holder', 'Administrator', 'Manager', 'Reviewer', 'Super Administrator'], userType) ? (
                            <React.Fragment>
                                <ListSubheader
                                    style={dynamicDrawerStyles}>{userType === 'Manager' || userType === 'Reviewer' ? `${formatDrawerSectionDescription('Configuration (View Only)', open)}` : `${formatDrawerSectionDescription('Configuration', open)}`}</ListSubheader>
                            </React.Fragment>
                        ) : null}

                        {sidebarRoutesConfig.map(route => {
                            if (route === null)
                                return null;

                            return (
                                <ListItem
                                    key={route.path}
                                    selected={route.path === currentRoute}
                                    component={NavLink}
                                    to={route.path}
                                    button
                                >
                                    <ListItemIcon>
                                        {route.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={route.name}/>
                                </ListItem>
                            )
                        })}
                    </div>
                </List>

                <List>
                    <div>
                        {inArray(['Account Holder', 'Administrator', 'Compliance Certifier', 'Manager', 'Reviewer'], userType) ? (
                            <React.Fragment>
                                <ListSubheader
                                    style={dynamicDrawerStyles}>{userType === 'Manager' || userType === 'Reviewer' ? `${formatDrawerSectionDescription('Dashboard (View Only)', open)}` : `${formatDrawerSectionDescription('Dashboard', open)}`}</ListSubheader>
                            </React.Fragment>
                        ) : null}

                        {sidebarRoutesDashboard.map(route => {
                            if (route !== null) {

                                const dashboardRoute = this.props.location.pathname.split('/')[2];

                                const currentRoute = route.name.toLowerCase();

                                return (
                                    <MenuItem
                                        key={route.path}
                                        selected={dashboardRoute === currentRoute}
                                        component={NavLink}
                                        to={route.path}
                                        button

                                    >
                                        <ListItemIcon

                                        >
                                            {route.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={route.name}/>
                                    </MenuItem>
                                )
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </List>

                <List>
                    <div>
                        <React.Fragment>
                            <ListSubheader
                                style={dynamicDrawerStyles}>{formatDrawerSectionDescription('Settings', open)}</ListSubheader>
                        </React.Fragment>

                        <MenuItem
                            selected={this.props.location.pathname === '/profile'}
                            component={NavLink}
                            to={'/profile'}
                            button>
                            <ListItemIcon

                            >
                                <SettingsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Profile"/>
                        </MenuItem>

                        {
                            ['Account Holder', 'Administrator'].indexOf(userType) !== -1
                                ? (
                                    <MenuItem
                                        selected={this.props.location.pathname === '/managementCompany'}
                                        component={NavLink}
                                        to={'/managementCompany'}
                                        button>
                                        <ListItemIcon

                                        >
                                            <SettingsIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Managing Company"/>
                                    </MenuItem>
                                )
                                : null
                        }
                    </div>
                </List>

                <List style={{flex: "1", height: "100%", display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <div style={{alignSelf: 'flex-end', width: '100%'}}>

                        <ListItem
                            key={userManualRoute.path}
                            selected={userManualRoute.path === currentRoute}
                            // component={NavLink}
                            // to={userManualRoute.path}
                            button
                            onClick={() => window.open(userManualRoute.path, "_blank", "width=900,height=900")}
                        >
                            <ListItemIcon>
                                {userManualRoute.icon}
                            </ListItemIcon>
                            <ListItemText primary={userManualRoute.name}/>
                        </ListItem>
                    </div>
                </List>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userType: state.auth.userDetails.userType,
        sideDrawerToggled: state.ui.sideDrawerToggled,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SidebarListItems)));