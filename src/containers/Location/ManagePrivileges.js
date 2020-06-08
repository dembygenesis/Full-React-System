import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import API from '../../api';
import {hasNoAPIErrors} from "../../utilities/utilities";
import ManagePrivilegeTable from "../../components/ComplianceLink/Tables/Location/ManagePrivilegeTable";
import {withStyles} from '@material-ui/core/styles';
import Alert from "../../components/UI/Alert/Alert";
import LinearLoading from "../../components/UI/LinearLoading/LinearLoading";
import BackButton from "../../components/UI/BackButton/BackButton";

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: theme.spacing.unit * 2,
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

    state = {
        filters: {
            selectedCompanyId: '',
            selectedLocationId: '',

            companies: [],
            locations: [],
        },

        assignableUsers: null,
        location: ''
    };

    getLocationID() {
        const {number: locationId} = this.props.match.params;

        return locationId;
    }

    updateFilter = async event => {

    };

    async getAssignableUsers() {
        const result = await API().Location().getOnePrivilege( this.getLocationID() );

        if (!hasNoAPIErrors(result))
            throw new Error('Error when trying to fetch the assignable users.');

        return result.data.data.data;
    }

    async getLocationDetails() {
        const result = await API().Location().getOne(this.getLocationID());

        if (hasNoAPIErrors(result) === false)
            throw new Error("There are errors when trying to fetch the location data.");

        return result.data.data.data[0];
    }

    handleClick = async (userId, userType) => {

        let result = null;

        const postData = {
            user_ids: userId.toString(),
            location_id: this.getLocationID(),
        };

        if (userType === 'Assigned')
            result = await API().Location().voidPrivilege(postData);

        if (userType === 'Unassigned')
            result = await API().Location().addPrivilege(postData);

        if (result)
            this.initUsers();
    };

    async initUsers() {
        const assignableUsers = await this.getAssignableUsers();

        this.setState({assignableUsers: assignableUsers});
    }

    async componentDidMount() {

        const errorHandler = () => this.props.history.push('/location');

        try {
            Promise.all([
                this.getLocationDetails(),
                this.getAssignableUsers(),
            ]).then(res => {
                let locationDetails = res[0];
                let assignableUsers = res[1];

                this.props.setPageTitle('Access management for: ' + locationDetails['name']);

                this.setState({
                    location: locationDetails['name'],
                    assignableUsers: assignableUsers,
                });
            }).catch(error => {
                errorHandler();
            });
        } catch (e) {
            alert('Some errors.');
            errorHandler();
        }

    }

    render() {
        const {classes} = this.props;

        let assignableUsers = [];
        let assignedUsers = [];

        if (this.state.assignableUsers !== null) {
            assignableUsers = this.state.assignableUsers.filter(assignableUser => {
                return assignableUser.type === 'Unassigned';
            });

            assignedUsers = this.state.assignableUsers.filter(assignableUser => {
                return assignableUser.type === 'Assigned';
            });
        }

        let display = (
            <React.Fragment>

                <BackButton routeTo="/location" />

                <br/>

                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <div className={classes.title}>
                                <Typography variant="h6" id="tableTitle">
                                    Has Access
                                </Typography>
                            </div>

                            <ManagePrivilegeTable
                                classes={classes}
                                users={assignedUsers}
                                onChange={this.handleClick}
                                type="assigned"
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>

                            <div className={classes.title}>
                                <Typography variant="h6" id="tableTitle">
                                    Has No Access
                                </Typography>
                            </div>

                            <ManagePrivilegeTable
                                classes={classes}
                                users={assignableUsers}
                                onChange={this.handleClick}
                                type="assignable"
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );

        return (
            <div>
                {
                    this.state.assignableUsers !== null
                        ? this.state.assignableUsers.length !== 0
                            ? display
                            : <Alert type="error">You have no managers created</Alert>
                        : <LinearLoading/>
                }
            </div>
        );
    }
}

export default withStyles(styles)(ManagePrivileges);