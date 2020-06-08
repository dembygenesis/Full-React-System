import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import complianceLogo from '../../../../assets/logo.png'
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    compliancelogo:{
        width:'100%',
        marginBottom:'48px',
        marginTop:'48px'
    }
});

function SignIn(props) {
    const {classes} = props;

    const form = (
        <form method="POST" className={classes.form} onSubmit={(event) => props.submitHandler(event)}>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                    value={props.username}
                    onChange={(event) => props.usernameChanged(event)}

                    id="username"
                    name="username"
                    autoComplete="username"
                    autoFocus/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    value={props.password}
                    onChange={(event) => props.passwordChanged(event)}

                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"/>
            </FormControl>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={props.rememberMe}
                        onChange={(event) => props.rememberMeChanged(event)}
                        value="remember"
                        color="primary" />
                }
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign in
            </Button>
        </form>
    );

    const loginFailedIndicator = props.failed ? (
        <Typography variant="subtitle2" gutterBottom color="secondary">
            Invalid Username/Password
        </Typography>
    ) : null;

    return (
        <main className={classes.main}>
            <CssBaseline/>
            <Paper className={classes.paper}>
                <img className={classes.compliancelogo} src={complianceLogo}/>

                <Avatar className={classes.avatar}>
                    <LockIcon
                        style={{
                            color: 'white',
                        }}
                    />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                {loginFailedIndicator}
                {props.loading ? <Spinner /> : null}
                {!props.loading ? form : null}
            </Paper>
        </main>
    );
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
    submitHandler: PropTypes.func.isRequired,
    usernameChanged: PropTypes.func.isRequired,
    passwordChanged: PropTypes.func.isRequired,
    rememberMeChanged: PropTypes.func.isRequired,
};

export default withStyles(styles)(SignIn);