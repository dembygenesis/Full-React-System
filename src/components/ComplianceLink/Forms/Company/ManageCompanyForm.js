import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';

import SplitButtonWithIcon from '../../../UI/ButtonWithIcon/SplitButtonWithIcon';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import {Number, Cvc, Expiration} from 'react-credit-card-primitives'
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        padding: '20px',

    },
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit * .5,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    paper: {},
    select: {
        input: {
            width: '300px'
        },
    },
    formControl: {
        margin: theme.spacing.unit * 1.5,
        minWidth: 250,
    },
});
function rand() {
    return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {

    return {
        top: `${50}%`,
        left: `${50}%`,
        transform: `translate(-${50}%, -${50}%)`,
    };
}

class manageCompanyForm extends Component {
    // Inherits classes from HOC with styles.

    constructor(props) {
        super(props)
        let today = new Date()
        this.state = {
            today: today,
            focused: "name",
            open: props.open
        }
    }

    componentWillReceiveProps(nextProps){
            this.setState({open: nextProps.open})
    }
    handleNumberChange = (value) => {
        this.props.formValueChanged(value, 'cardNumber')
    }
    handleExpiryChange = (month, year) => {
        this.props.formValueChanged(month || this.state.today.getMonth(), 'selectedMonth')
        this.props.formValueChanged(year || this.state.today.getFullYear(), 'selectedYear')

    }
    handleCvcChange = (value) => {
        this.props.formValueChanged(value, 'cardCode')
    }
    onNewFocus = (focused) => {
        setTimeout(() => {
            this.setState({focused})
        }, 100)
    }
    onBlur = () => {
        setTimeout(() => {
            this.setState({focused: "name"})
        }, 100)
    }

    render() {
        const {classes} = this.props;
        let props = this.props
        let expiryValue = (props.selectedMonth >= 10 ? props.selectedMonth : "0" + props.selectedMonth) + "" + props.selectedYear

        console.log(props.qbCreditCardToken)
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <form onSubmit={(event) => props.submitHandler(event)} method="POST" className={classes.form}>

                        <TextField
                            value={props.contactName}
                            required
                            onChange={(event) => props.formEventChanged(event, 'contactName')}
                            label="Contact Name"
                            id="contact-name"
                            style={{padding: 4}}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            value={props.name}
                            required
                            onChange={(event) => props.formEventChanged(event, 'name')}
                            label="Company Name"
                            id="company"
                            style={{padding: 4}}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            value={props.acnVcn}
                            required
                            onChange={(event) => props.formEventChanged(event, 'acnVcn')}
                            label="ABN"
                            id="abn"
                            style={{padding: 4}}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        {/*
                        BILLING DETAILS
                    */}

                        <TextField
                            value={props.billingStreetNumber}
                            required
                            onChange={(event) => props.formEventChanged(event, 'billingStreetNumber')}
                            label="Street Number"
                            id="address"
                            style={{padding: 4}}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            value={props.billingStreetName}
                            required
                            onChange={(event) => props.formEventChanged(event, 'billingStreetName')}
                            label="Street Name"
                            id="address"
                            style={{padding: 4}}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            value={props.billingSuburb}
                            required
                            onChange={(event) => props.formEventChanged(event, 'billingSuburb')}
                            label="Suburb"
                            id="address"
                            style={{padding: 4}}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            value={props.billingPostCode}
                            required
                            onChange={(event) => props.formEventChanged(event, 'billingPostCode')}
                            label="Postcode"
                            id="postal-code"
                            style={{padding: 4}}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />


                        {/*
                        BILLING DETAILS
                    */}

                        <TextField
                            value={props.mobileNumber}
                            onChange={(event) => props.formEventChanged(event, 'mobileNumber')}
                            label="Mobile Number"
                            id="standard-full-width"
                            style={{padding: 4}}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            value={props.telephoneNumber}
                            required
                            onChange={(event) => props.formEventChanged(event, 'telephoneNumber')}
                            label="Telephone Number"
                            id="standard-full-width"
                            style={{padding: 4}}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            value={props.email}
                            required
                            onChange={(event) => props.formEventChanged(event, 'email')}
                            label="Email"
                            id="email"
                            style={{padding: 4}}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            value={props.purchaseOrderNumber}
                            onChange={(event) => props.formEventChanged(event, 'purchaseOrderNumber')}
                            label="Purchase/Work Order Number"
                            id="purchaseOrderNumber"
                            style={{padding: 4}}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.props.handleClose}
                        >
                            <Paper style = {{width: "1000px",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                backgroundColor: "white",
                                position: "absolute",
                                border: "1px solid black",
                                padding: "24px"
                            }}>
                            <Grid container >
                                <Grid item lg={8} md={8} xs={12} sm={8}>
                                    <FormControl fullWidth
                                                 onFocus={() => {
                                                     this.onNewFocus("number")
                                                 }} onBlur={this.onBlur.bind(this)}>
                                        <InputLabel shrink htmlFor="cardNumber">
                                            Card Number
                                        </InputLabel>
                                        <Number
                                            id={"cardNumber"}
                                            value={props.cardNumber}
                                            onChange={({value, valid}) => {
                                                this.handleNumberChange(value)
                                            }}
                                            render={({getInputProps, valid}) => {
                                                return (
                                                    <Input
                                                        {...getInputProps()}
                                                        className={valid ? '' : 'error'}/> )
                                            }}/>
                                    </FormControl>
                                    <br/>
                                    <br/>
                                    <FormControl fullWidth
                                                 onFocus={() => {
                                                     this.onNewFocus("expiry")
                                                 }} onBlur={this.onBlur.bind(this)}>
                                        <InputLabel shrink htmlFor="expiry">
                                            Expiry
                                        </InputLabel>
                                        <Expiration
                                            id={'expiry'}
                                            defaultMonth={props.selectedMonth || this.state.today.getMonth()}
                                            defaultYear={props.selectedYear || this.state.today.getFullYear()}
                                            onChange={({month, year, valid}) => {
                                                this.handleExpiryChange(month, year)
                                            }}
                                            render={({getInputProps, valid, error}) => {
                                                return (
                                                    <Input
                                                        {...getInputProps()} className={valid ? '' : 'error'}/>
                                                )
                                            }}/>
                                    </FormControl>
                                    <br/>
                                    <br/>
                                    <FormControl fullWidth
                                                 onFocus={() => {
                                                     this.onNewFocus("cvc")
                                                 }} onBlur={this.onBlur.bind(this)}>
                                        <InputLabel shrink htmlFor="cvc">
                                            Code
                                        </InputLabel>
                                        <Cvc
                                            id={'cvc'}
                                            value={props.cardCode}
                                            onChange={({value, valid}) => {
                                                this.handleCvcChange(value)
                                            }}
                                            render={({getInputProps, valid, focused}) => {
                                                return (
                                                    <Input
                                                        {...getInputProps()}
                                                        className={valid ? '' : 'error'}/>)
                                            }}/>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={4} md={4} xs={12} sm={4}>
                                    <br/>
                                    <Cards
                                        number={props.cardNumber}
                                        name={props.contactName}
                                        expiry={expiryValue}
                                        cvc={props.cardCode}
                                        focused={this.state.focused}
                                    />
                                    <br/>
                                </Grid>
                            </Grid>
                                <SplitButtonWithIcon
                                    title={'Save Credit Card'}
                                    variant="contained"
                                    color="primary"
                                    icon="Save"
                                    styleOverrides={{
                                        marginRight: '15px',
                                    }}
                                    onClick={this.props.saveCreditCard}
                                />
                            </Paper>
                        </Modal>


                        <SplitButtonWithIcon
                            type="submit"
                            title={(props.type === 'add' ? 'Create' : 'Update') + ' Company/LandLord'}
                            variant="contained"
                            color="primary"
                            icon="Assignment Late"
                        />
                    </form>
                </Paper>
            </React.Fragment>
        );
    }
}


manageCompanyForm.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    acnVcn: PropTypes.string.isRequired,
    mobileNumber: PropTypes.string.isRequired,
    telephoneNumber: PropTypes.string.isRequired,
    formEventChanged: PropTypes.func.isRequired,
    formValueChanged: PropTypes.func.isRequired,
    // New business Fields.
    billingStreetNumber: PropTypes.string.isRequired,
    billingStreetName: PropTypes.string.isRequired,
    billingSuburb: PropTypes.string.isRequired,
    billingPostCode: PropTypes.string.isRequired,
};

export default withStyles(styles)(manageCompanyForm);