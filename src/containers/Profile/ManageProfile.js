import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import TextField from "@material-ui/core/TextField";

import {connect} from 'react-redux';

import {
    getUserDetailsViaToken,
} from "../../store/actions";

import Grid from '@material-ui/core/Grid';
import API from "../../api";
import {hasNoAPIErrors} from "../../utilities/utilities";

const styles = theme => ({
    root: {
        width: '100%',
        padding: '20px',
        overflowX: 'auto',
    },
    button: {
        margin: theme.spacing.unit * .5,
    },
});

class ManageProfile extends Component {

    state = {
        firstname: '',
        lastname: '',
        password: '',
    };

    componentDidMount() {
        this.props.setPageTitle('Profile');

        this.setState({
            firstname: this.props.firstname,
            lastname: this.props.lastname,
        });
    }

    onUpdate(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value,
        });
    }

    async submitHandler(event) {
        event.preventDefault();

        let data = {
            user_firstname: this.state.firstname,
            user_lastname: this.state.lastname,
            user_id: this.props.userId,
        };

        if (this.state.password.trim() !== '') {
            data['password'] = this.state.password;
        }

        const result = await API().Profile().update(data);

        if (hasNoAPIErrors(result)) {
            this.props.getUserDetailsViaToken();
        }
    }

    render() {

        const {classes} = this.props;

        return (

            <Grid container>
                   <Grid item xs={4}>
                       <Paper className={classes.root}>
                           <form method="POST" onSubmit={(event) => this.submitHandler(event)}>
                               <TextField
                                   style={{
                                       width: '100%',
                                   }}
                                   value={this.state.firstname}
                                   label="Firstname"
                                   type="firstname"
                                   id="firstname"
                                   name="firstname"
                                   onChange={(event) => this.onUpdate(event)}
                                   fullWidth
                                   margin="normal"
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   required
                               />

                               <TextField
                                   value={this.state.lastname}
                                   label="Lastname"
                                   type="lastname"
                                   id="lastname"
                                   name="lastname"
                                   onChange={(event) => this.onUpdate(event)}
                                   fullWidth
                                   margin="normal"
                                   required
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                               />

                               <TextField
                                   value={this.state.password}
                                   style={{
                                       marginBottom: '20px',
                                   }}
                                   label="Password"
                                   type="password"
                                   id="password"
                                   name="password"
                                   onChange={(event) => this.onUpdate(event)}
                                   fullWidth
                                   margin="normal"
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                               />

                               <Button
                                   type="submit"
                                   variant="contained" color="primary">
                                   Submit
                               </Button>
                           </form>
                       </Paper>
                   </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        firstname: state.auth.userDetails.firstname,
        lastname: state.auth.userDetails.lastname,
        userId: state.auth.userDetails.id,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUserDetailsViaToken: () => dispatch(getUserDetailsViaToken()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ManageProfile));