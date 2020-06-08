import React, {Component} from 'react';
import API from "../../api";
import LinearLoading from "../../components/UI/LinearLoading/LinearLoading";
import UserActivitiesTable from "../../components/ComplianceLink/Tables/UserActivities/UserActivitiesTable";
import {hasNoAPIErrors} from "../../utilities/utilities";

import Paper from '@material-ui/core/Paper';

class UserActivity extends Component {

    state = {
        userActivities: null,
    };

    async componentDidMount() {
        this.props.setPageTitle('User Activity');
        const result = await API().UserActivity().getUserActivity({});

        if (!hasNoAPIErrors(result)) {}
            this.setState({userActivities: result.data.data.data});
    }

    render() {
        let display = null;

        if (this.state.userActivities !== null)
            display = <UserActivitiesTable userActivities={this.state.userActivities}/>;

        display = this.state.userActivities !== null
            ? (
                <Paper>
                    {display}
                </Paper>
            )
            : <LinearLoading/>;

        return display;
    }
}

export default UserActivity;