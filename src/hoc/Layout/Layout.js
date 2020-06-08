import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

// END GAME.
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
import Header from '../../components/Navigation/Header/Header';
import Toolbar from '../../components/Navigation/Header/Toolbar';
import Alert from '../../components/UI/Alert/Alert';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import styles from './styles';
import {connect} from "react-redux";
import moment from 'moment'
import {withRouter} from "react-router-dom";

import {
    removeAPIError,
    removeAPISuccess,
    toggleSideDrawer
} from "../../store/actions";

class Layout extends React.Component {
    state = {
        open: true,
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    renderErrorNotifications = () => {
        return (
            this.props.apiErrors.map((apiError, idx) => (
                <CSSTransition
                    key={idx}
                    classNames="fade"
                    timeout={3000}
                    onEntered={() => (
                        setTimeout(() => {
                            this.props.removeAPIError(apiError.name)
                        }, 3000)
                    )}
                >
                    <Alert
                        type='error'
                        idx={idx}
                        clickedHandler={() => this.props.removeAPIError(apiError.name)}
                    >
                        {apiError.name}:{apiError.msg}
                    </Alert>
                </CSSTransition>
            ))
        )
    };

    renderSuccessNotifications = () => {
        return (
            this.props.apiSuccesses.map((apiSuccess, idx) => (
                <CSSTransition
                    key={idx}
                    classNames="fade"
                    timeout={3000}
                    onEntered={() => (
                        setTimeout(() => {
                            this.props.removeAPISuccess(apiSuccess.name)
                        }, 3000)
                    )}
                >
                    <Alert
                        type='success'
                        idx={idx}
                        clickedHandler={() => this.props.removeAPISuccess(apiSuccess.name)}
                    >
                        {apiSuccess.name}:{apiSuccess.msg}
                    </Alert>
                </CSSTransition>
            ))
        )
    };

    renderNotifications() {
        return (
            <TransitionGroup component="span">
                {this.renderErrorNotifications()}
                {this.renderSuccessNotifications()}
            </TransitionGroup>
        );
    }

    render() {
        const {classes} = this.props;

        let display = this.props.children;

        if (this.props.authenticated && this.props.location.pathname !=='/user-manual') {

            display = (
                <div className={classes.root}>
                    <CssBaseline/>
                    <Header
                        classNames={classNames}
                        pageTitle={this.props.pageTitle}
                        classes={classes}
                        openOld={this.state.open}
                        open={this.props.sideDrawerToggled}
                        handleDrawerOpenOld={this.handleDrawerOpen}
                        handleDrawerOpen={this.props.toggleSideDrawer}
                    />

                    <Sidebar
                        handleDrawerCloseOld={this.handleDrawerClose}
                        handleDrawerClose={this.props.toggleSideDrawer}
                        classNames={classNames}
                        classes={classes}
                        open={this.props.sideDrawerToggled}
                        userDetails={this.props.userDetails}
                    />

                    <main className={classes.content} style={{paddingTop: "106px"}}>
                        <Toolbar
                            classNames={classNames}
                            pageTitle={this.props.pageTitle}
                            classes={classes}
                            openOld={this.state.open}
                            open={this.props.sideDrawerToggled}
                            handleDrawerOpenOld={this.handleDrawerOpen}
                            handleDrawerOpen={this.props.toggleSideDrawer}
                        />
                        {this.props.userDetails.location
                        && this.props.userDetails.location.length > 0 ?
                            this.props.userDetails.location.map(location => {
                                if (location.payment_status === "Over Due" || location.payment_status === "Suspended") {
                                    let message = location.payment_status === "Over Due" ?
                                        'Location(' + location.name + ') will be suspended on ' + moment(location.suspension_date).format("LLLL") :
                                        'Location(' + location.name + ') was suspended '
                                    return (<React.Fragment>
                                        <br/>
                                        <Paper style={{paddingLeft: "20px"}}>
                                            <TextField
                                                value={message}
                                                margin="normal"
                                                InputProps={{
                                                    disableUnderline: true,
                                                    readOnly: true
                                                }}
                                                style={{width: "100%"}}
                                                multiline={true}
                                                label={location.payment_status === "Over Due" ? "Account Overdue:": "Account Suspended:"}
                                            />
                                        </Paper>
                                    </React.Fragment>)
                                }
                            })
                            : null}

                        {this.props.userDetails.company
                        && this.props.userDetails.company.site_wide_message
                        && this.props.userDetails.company.site_wide_message.trim().length > 0
                        && this.props.pageTitle !== "Managing Company"
                        && this.props.pageTitle !== "Profile" ?

                            <React.Fragment>
                                <br/>
                                <Paper style={{paddingLeft: "20px"}}>
                                    <TextField
                                        value={this.props.userDetails.company.site_wide_message}
                                        margin="normal"
                                        InputProps={{
                                            disableUnderline: true,
                                            readOnly: true
                                        }}
                                        style={{width: "100%"}}
                                        multiline={true}
                                        label={"Site Wide Message:"}
                                    />
                                </Paper>
                            </React.Fragment> : null}
                        <div className={classes.tableContainer}>
                            <br/>

                            {
                                this.props.authenticated !== false
                                    ? this.renderNotifications()
                                    : null
                            }

                            {this.props.children}
                        </div>
                    </main>
                </div>
            );
        }

        return display;
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    authenticated: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
};

const mapStateToProps = state => {
    return {
        pageTitle: state.ui.pageTitle,
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token,
        checkedToken: state.auth.checkedToken,
        apiErrors: state.apiError.errors,
        apiSuccesses: state.apiError.successes,
        sideDrawerToggled: state.ui.sideDrawerToggled,
        userDetails: state.auth.userDetails,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        removeAPIError: (index) => dispatch(removeAPIError(index)),
        removeAPISuccess: (index) => dispatch(removeAPISuccess(index)),
        toggleSideDrawer: () => dispatch(toggleSideDrawer())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Layout)));
