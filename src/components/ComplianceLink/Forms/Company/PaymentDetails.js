import React, {Component} from 'react'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import {Number, Cvc, Expiration} from 'react-credit-card-primitives'
import Grid from  '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class PaymentDetails extends Component {

    constructor(props) {
        super(props)
        let today = new Date()
        this.state = {
            today: today,
            selectedMonth: props.data.selectedMonth || today.getMonth(),
            selectedYear: props.data.selectedYear || today.getFullYear(),
            cardNumber: props.data.cardNumber || "",
            cardCode: props.data.cardCode || "",
            focused: "name"
        }
    }


    handleNumberChange = (value) => {
        this.props.change('cardNumber', value)
    }
    handleExpiryChange = (month, year) => {
        this.props.change('selectedMonth', month || this.state.today.getMonth())
        this.props.change('selectedYear', year || this.state.today.getFullYear())
    }
    handleCvcChange = (value) => {
        this.props.change('cardCode', value)

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
        let expiryValue = (this.props.data.selectedMonth >= 10 ? this.props.data.selectedMonth : "0" + this.props.data.selectedMonth) + "" + this.props.data.selectedYear
        return (
                <Grid container>
                    <Grid item lg={8} md={8} xs={12} sm={8} >
                        <Cards
                            number={this.props.data.cardNumber}
                            name={this.props.data.first_name + " " + this.props.data.last_name}
                            expiry={expiryValue}
                            cvc={this.props.data.cardCode}
                            focused={this.state.focused}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} xs={12} sm={4} >
                            <FormControl onFocus={() => {
                                this.onNewFocus("number")
                            }} onBlur={this.onBlur.bind(this)}>
                                <InputLabel shrink htmlFor="cardNumber">
                                    Card Number
                                </InputLabel>
                                <Number
                                    id={"cardNumber"}
                                    value={this.props.data.cardNumber}
                                    onChange={({value, valid}) => {
                                        this.handleNumberChange(value)
                                    }}
                                    render={({getInputProps, valid}) => {
                                        return (
                                            <input
                                                {...getInputProps()}
                                                className={valid ? '' : 'error'}/> )
                                    }}/>
                            </FormControl>
                        <FormControl onFocus={() => {
                            this.onNewFocus("expiry")
                        }} onBlur={this.onBlur.bind(this)}>
                            <InputLabel shrink htmlFor="expiry">
                                Expiry
                            </InputLabel>
                            <Expiration
                                id={'expiry'}
                                defaultMonth={this.props.data.selectedMonth || this.state.today.getMonth()}
                                defaultYear={this.props.data.selectedYear || this.state.today.getFullYear()}
                                onChange={({month, year, valid}) => {
                                    this.handleExpiryChange(month, year)
                                }}
                                render={({getInputProps, valid, error}) => {
                                    return (
                                        <div>
                                            <input
                                                {...getInputProps()} className={valid ? '' : 'error'}/>
                                        </div>
                                    )
                                }}/>
                        </FormControl>

                        <FormControl onFocus={() => {
                            this.onNewFocus("cvc")
                        }} onBlur={this.onBlur.bind(this)}>
                            <InputLabel shrink htmlFor="cvc">
                                Code
                            </InputLabel>
                            <Cvc
                                id={'cvc'}
                                value={this.props.data.cardCode}
                                onChange={({value, valid}) => {
                                    this.handleCvcChange(value)
                                }}
                                render={({getInputProps, valid, focused}) => {
                                    return (
                                        <input
                                            {...getInputProps()}
                                            className={valid ? '' : 'error'}/>)
                                }}/>
                        </FormControl>
                    </Grid>
                </Grid>
        )
    }
}

export default PaymentDetails