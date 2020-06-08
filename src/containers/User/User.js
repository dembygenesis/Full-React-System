import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

import {NavLink, withRouter} from "react-router-dom";
import ButtonWithIcon from "../../components/UI/ButtonWithIcon/ButtonWithIcon";

import {connect} from 'react-redux';

import {
    getUsers,
    voidUser,
} from "../../store/actions";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    button: {
        padding: '5px',
        margin: 0,
    },
    rowStyle: {
        borderTop: '1px solid rgba(0,0,0,.08)'
    }
});

class User extends Component {

    componentDidMount() {
        this.props.setPageTitle('User');
        this.props.onLoadGetUsers();
    }

    deleteHandler = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            this.props.voidUser(userId);
        }
    };

    renderLocations = locations => {
        if (locations !== null) {
            let display = [];

            locations = locations.split('---');

            for (let i in locations) {
                display.push(
                    <React.Fragment key={locations[i]}>
                        {locations[i]} <br/>
                    </React.Fragment>
                );
            }

            return display;
        }

        return 'None';
    };  

    render () {
        const { classes } = this.props;

        return (
            <React.Fragment>

                <ButtonWithIcon
                    title="Add New User"
                    component={NavLink}
                    to="/user/add"
                    variant="contained"
                    color="primary"
                    icon="Add Circle"
                />

                <Paper className={classes.root}>

                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">User Type</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell align="left">Full Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Locations with access</TableCell>
                                <TableCell align="left">Mobile Number</TableCell>
                                <TableCell align="left">Management Company</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.users.map(user => {
                                return (
                                    <TableRow key={user.user_id} className={classes.rowStyle} hover>
                                        <TableCell align="left">{user.user_type}</TableCell>
                                        <TableCell align="left">{user.username}</TableCell>
                                        <TableCell align="left">{user.firstname} {user.lastname}</TableCell>
                                        <TableCell align="left">{user.email}</TableCell>
                                        <TableCell align="left">{this.renderLocations(user.manager_assigned_locations)}</TableCell>
                                        <TableCell align="left">{user.mobile_number}</TableCell>
                                        <TableCell align="left">{user.management_company}</TableCell>

                                        <TableCell
                                            style={{
                                                width: '150px'
                                            }}
                                            align="center">
                                            {/*Buttons*/}

                                            <IconButton
                                                component={NavLink}
                                                to={`/user/edit/${user.user_id}`}
                                                size="small" variant="outlined" color="primary" className={classes.button}
                                            >
                                                <EditIcon
                                                    style={{
                                                        color: '#be1d2d',
                                                    }}
                                                />
                                            </IconButton>

                                            <IconButton
                                                className={classes.button}
                                                onClick={this.deleteHandler.bind(this, user.user_id)}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        );
    }
}

User.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
    return {
        users: state.user.users
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadGetUsers: () => dispatch(getUsers()),
        voidUser: (userId) => dispatch(voidUser(userId)),
    }
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(User))
);
