import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {withRouter} from 'react-router-dom';

import ManagePrivilegeTable from '../../components/ComplianceLink/Tables/Company/ManagePrivilegeTable';

import {connect} from 'react-redux';

import {
    getCompanyDetailsAndAssignableUsers,
    updateUserPrivilege,
    updateAssignMode,
    getAssignableUsers,
} from '../../store/actions';
import BackButton from "../../components/UI/BackButton/BackButton";

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    table: {

    },
    title: {
        textAlign: 'center',
    },
    formControl: {
        // margin: theme.spacing.unit * 1.5,
        minWidth: 250,
    },
});

class ManagePrivileges extends Component {

    static defaultProps = { // <-- DEFAULT PROPS
        assignableUsers: []       // undefined gets converted to array,render won't trigger error
    };

    constructor(props) {
        super(props);

        this.props.setPageTitle(`Access Management: "${props.managedCompany}"`);
    }

    initializeData() {
        const {number: companyId} = this.props.match.params;

        const errCallback = () => this.props.history.push('/company');

        this.props.getCompanyDetailsAndAssignableUsers(companyId, errCallback, this.props.assignMode);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.assignMode === this.props.assignMode) {

        }
    }

    handleClick = (userId, userAccessType) => {
        const {number: companyId} = this.props.match.params;

        this.props.updateUserPrivilege(companyId, userId, userAccessType, this.props.assignMode);
    };

    updateFilterMode = (event) => {
        const assignMode = event.target.value;

        const {number: companyId} = this.props.match.params;
        const errCallback = () => this.props.history.push('/company');

        this.props.updateAssignMode(assignMode);
        this.props.getAssignableUsers(companyId, errCallback, assignMode);
    };

    componentDidMount() {
        // this.props.setPageTitle('Company');
        this.initializeData();
    }


    render() {
        const {classes} = this.props;

        const assignableUsers = this.props.assignableUsers.filter(assignableUser => {
            return assignableUser.type === 'Unassigned';
        });

        const assignedUsers = this.props.assignableUsers.filter(assignableUser => {
            return assignableUser.type === 'Assigned';
        });

        return (
            <React.Fragment>
                <div className={classes.root}>

                    <BackButton routeTo="/company" styleOverrides={{
                        marginBottom: '15px',
                        marginTop: '0',
                    }}/>

                    <br/>
                    <br/>

                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.root}>

                                <div className={classes.title}>
                                    <Typography variant="h6" id="tableTitle">
                                        Has Access
                                    </Typography>
                                </div>

                                <ManagePrivilegeTable
                                    classes={classes}
                                    users={assignedUsers}
                                    checked={true}
                                    onChange={this.handleClick}
                                    type="assigned"
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.root}>

                                <div className={classes.title}>
                                    <Typography variant="h6" id="tableTitle">
                                        Has No Access
                                    </Typography>
                                </div>

                                <ManagePrivilegeTable
                                    classes={classes}
                                    users={assignableUsers}
                                    checked={false}
                                    onChange={this.handleClick}
                                    type="assignable"
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        managedCompany: state.company.managedCompany,
        assignableUsers: state.company.assignableUsers,
        assignModes: state.company.assignModes,
        assignMode: state.company.assignMode,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateAssignMode: (assignMode) => dispatch(updateAssignMode(assignMode)),
        getCompanyDetailsAndAssignableUsers: (companyId, errCallback, assignMode) => dispatch(getCompanyDetailsAndAssignableUsers(companyId, errCallback, assignMode)),
        getAssignableUsers: (companyId, errCallback, assignMode) => dispatch(getAssignableUsers(companyId, errCallback, assignMode)),
        updateUserPrivilege: (companyId, userId, userAccessType, assignMode) => dispatch(updateUserPrivilege(companyId, userId, userAccessType, assignMode)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ManagePrivileges))
);