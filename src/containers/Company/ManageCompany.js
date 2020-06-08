import React, {Component} from 'react';

import ManageCompanyform from '../../components/ComplianceLink/Forms/Company/ManageCompanyForm';

import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import {
    updateCompanyFormHandler,
    getCompanyFormData,
    resetCompanyFormFields,
    updateCompany,
    addNewCompany,
    saveCreditCard
} from '../../store/actions';
import SplitBackButton from "../../components/UI/BackButton/SplitBackButton";
import SplitButtonWithIcon from '../../components/UI/ButtonWithIcon/SplitButtonWithIcon';

class ManageCompany extends Component {

    state = {
        focused: '',
        open: false
    };

    getFormType() {
        const url = this.props.location.pathname;

        const formType = url.match('/company/add') ? 'add'
            : url.match('/company/edit') ? 'edit' : null;

        console.log('executed: ' + formType);

        return formType;
    }

    initializeForm() {
        this.props.resetCompanyFormFields();

        const formType = this.getFormType();
        const {number: companyId} = formType === 'edit' ? this.props.match.params : '';
        const errorHandler = () => this.props.history.push('/company');
        const callback = () => {
        };

        this.props.onLoadGetCompanyFormData(formType, companyId, errorHandler, callback);
    }

    formEventChangedHandler = (event, formField) => {
        this.props.formUpdateHandler(event.target.value, formField);
    };

    formValueChangedHandler = (value, formField) => {
        this.props.formUpdateHandler(value, formField);
    };
    onSubmitHandler = (event) => {
        event.preventDefault();

        const formType = this.getFormType();

        if (formType === 'add') {

            const navigationCallback = (newUserId) => {
                // const redirectTo = `/company/edit/${newUserId}`;
                const redirectTo = `/company`;

                this.props.history.push(redirectTo);
            };

            const postData = {
                name: this.props.name,
                acn_vcn: this.props.acnVcn,
                mobile_number: this.props.mobileNumber,
                telephone_number: this.props.telephoneNumber,

                // Billing info.
                billing_street_number: this.props.billingStreetNumber,
                billing_street_name: this.props.billingStreetName,
                billing_suburb: this.props.billingSuburb,
                billing_post_code: this.props.billingPostCode,

                contact_name: this.props.contactName,
                email: this.props.email,
                purchase_order_number: this.props.purchaseOrderNumber,
            };

            this.props.addNewCompany(postData, navigationCallback);
        }

        if (formType === 'edit') {
            const postData = {
                company_id: this.props.companyId,
                name: this.props.name,
                acn_vcn: this.props.acnVcn,
                mobile_number: this.props.mobileNumber,
                telephone_number: this.props.telephoneNumber,

                // Billing info.
                billing_street_number: this.props.billingStreetNumber,
                billing_street_name: this.props.billingStreetName,
                billing_suburb: this.props.billingSuburb,
                billing_post_code: this.props.billingPostCode,

                contact_name: this.props.contactName,
                email: this.props.email,
                purchase_order_number: this.props.purchaseOrderNumber,
            };

            this.props.updateCompany(postData);
        }

    };

    saveCreditCard = event => {
        event.preventDefault()
        const postData = {
            company_id: this.props.companyId,
            selected_month: this.props.selectedMonth,
            selected_year: this.props.selectedYear,
            card_number: this.props.cardNumber,
            card_code: this.props.cardCode,
            billing_street_number: this.props.billingStreetNumber,
            billing_street_name: this.props.billingStreetName,
            billing_suburb: this.props.billingSuburb,
            billing_post_code: this.props.billingPostCode,
            name: this.props.name,
            contact_name: this.props.contactName,
        };
        this.props.saveCreditCard(postData)
    }

    /**
     * Lifecycle methods.
     */

    componentDidMount() {
        this.props.setPageTitle((this.props.type === 'add' ? 'Add' : 'Edit') + ' Company/Landlord');
        this.initializeForm();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Determines if view should be update or add.
        if (this.props.location !== prevProps.location) {
            this.initializeForm();
        }
    }


    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    render() {
        let today = new Date()
        return (
            <React.Fragment>
                <SplitBackButton routeTo="/company"
                                 styleOverrides={{
                                     marginRight: '15px',
                                 }}/>
                <SplitButtonWithIcon
                    title={(this.props.qbCreditCardToken ? 'Update' : 'Add') + ' Credit Card'}
                    variant="contained"
                    color="primary"
                    icon="Assignment Late"
                    onClick={this.handleOpen}
                />
                <ManageCompanyform
                    submitHandler={this.onSubmitHandler}
                    type={this.props.formType}
                    formEventChanged={this.formEventChangedHandler}
                    formValueChanged={this.formValueChangedHandler}
                    saveCreditCard={this.saveCreditCard}
                    name={this.props.name}
                    acnVcn={this.props.acnVcn}
                    mobileNumber={this.props.mobileNumber}
                    telephoneNumber={this.props.telephoneNumber}

                    address={this.props.address}
                    contactName={this.props.contactName}

                    billingStreetNumber={this.props.billingStreetNumber}
                    billingStreetName={this.props.billingStreetName}
                    billingSuburb={this.props.billingSuburb}
                    billingPostCode={this.props.billingPostCode}

                    email={this.props.email}

                    open={this.state.open}
                    handleClose={this.handleClose.bind(this)}

                    purchaseOrderNumber={this.props.purchaseOrderNumber}

                    selectedMonth={this.props.selectedMonth || today.getMonth()}
                    selectedYear={this.props.selectedYear || today.getFullYear()}
                    cardNumber={this.props.cardNumber || ""}
                    cardCode={this.props.cardCode || ""}
                />

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        formType: state.company.formType,

        companyId: state.company.companyFields.companyId,
        name: state.company.companyFields.name,
        acnVcn: state.company.companyFields.acnVcn,
        mobileNumber: state.company.companyFields.mobileNumber,
        telephoneNumber: state.company.companyFields.telephoneNumber,

        address: state.company.companyFields.address,
        contactName: state.company.companyFields.contactName,

        billingStreetNumber: state.company.companyFields.billingStreetNumber,
        billingStreetName: state.company.companyFields.billingStreetName,
        billingSuburb: state.company.companyFields.billingSuburb,
        billingPostCode: state.company.companyFields.billingPostCode,

        email: state.company.companyFields.email,
        purchaseOrderNumber: state.company.companyFields.purchaseOrderNumber,

        selectedMonth: state.company.companyFields.selectedMonth,
        selectedYear: state.company.companyFields.selectedYear,
        cardNumber: state.company.companyFields.cardNumber,
        cardCode: state.company.companyFields.cardCode,
        qbCreditCardToken: state.company.companyFields.qbCreditCardToken,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        formUpdateHandler: (value, formField) => dispatch(updateCompanyFormHandler(value, formField)),
        onLoadGetCompanyFormData: (formType, companyId, errorHandler, callback) => dispatch(getCompanyFormData(formType, companyId, errorHandler, callback)),
        resetCompanyFormFields: () => dispatch(resetCompanyFormFields()),
        updateCompany: (postData) => dispatch(updateCompany(postData)),
        saveCreditCard: (postData) => dispatch(saveCreditCard(postData)),
        addNewCompany: (postData, navigationCallback) => dispatch(addNewCompany(postData, navigationCallback)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageCompany));