import * as actionTypes from '../actions/actionTypes';
let today = new Date()

const initialState = {
    companies: [],
    formType: '',
    companyFields: {
        companyId: '',
        name: '',
        acnVcn: '',
        mobileNumber: '',
        telephoneNumber: '',

        address: '',
        contactName: '',

        // Business address fields
        billingStreetNumber: '',
        billingStreetName: '',
        billingSuburb: '',
        billingPostCode: '',

        email: '',
        purchaseOrderNumber: '',
        selectedMonth: today.getMonth(),
        selectedYear: today.getFullYear(),
        cardNumber: '',
        cardCode: '',
        qbCreditCardToken:''
    },
    assignableUsers: [],
    managedCompany: '',
    assignModes: ['Administrator', 'Reviewer', 'Account Holder'],
    assignMode: 'Administrator',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_COMPANIES:
            return {
                ...state,
                companies: action.companies
            };
        case actionTypes.SET_ASSIGNABLE_USERS:
            return {
                ...state,
                assignableUsers: action.assignableUsers
            };

        case actionTypes.SET_MANAGED_USERS_AND_COMPANY:
            return {
                ...state,
                assignableUsers: action.managedUsers,
                managedCompany: action.company,
            };

        case actionTypes.SET_MANAGED_COMPANY:
            return {
                ...state,
                managedCompany: action.managedCompany
            };
        case actionTypes.SET_COMPANY_FORM_TYPE:
            return {
                ...state,
                formType: action.formType
            };
        case actionTypes.RESET_COMPANY_FORM_FIELDS:
            return {
                companies: [],
                formType: '',
                companyFields: {
                    companyId: '',
                    name: '',
                    acnVcn: '',
                    mobileNumber: '',
                    telephoneNumber: '',

                    address: '',
                    contactName: '',

                    billingStreetNumber: '',
                    billingStreetName: '',
                    billingSuburb: '',
                    billingPostCode: '',

                    email: '',
                    purchaseOrderNumber: '',
                    qbCreditCardToken:''
                },
                assignableUsers: [],
                managedCompany: '',
                assignModes: ['Administrator', 'Reviewer', 'Account Holder'],
                assignMode: 'Administrator',
            };
        case actionTypes.COMPANY_UPDATE_FORM_HANDLER:
            return {
                ...state,
                companyFields: {
                    ...state.companyFields,
                    [action.formField]: action.value
                }
            };
        case actionTypes.SET_ASSIGN_MODE:
            return {
                ...state,
                assignMode: action.value
            };
        case actionTypes.SET_COMPANY_DETAILS:
            console.log(action.companyDetails)
            return {
                ...state,
                companyFields: {
                    ...state.companyFields,
                    companyId: action.companyDetails.id,
                    name: action.companyDetails.name,
                    acnVcn: action.companyDetails.acn_vcn,
                    mobileNumber: action.companyDetails.mobile_number,
                    telephoneNumber: action.companyDetails.telephone_number,

                    address: action.companyDetails.address,
                    contactName: action.companyDetails.contact_name,

                    billingStreetNumber: action.companyDetails.billing_street_number,
                    billingStreetName: action.companyDetails.billing_street_name,
                    billingSuburb: action.companyDetails.billing_suburb,
                    billingPostCode: action.companyDetails.billing_post_code,
                    qbCreditCardToken: action.companyDetails.qb_credit_card_token,

                    email: action.companyDetails.email,
                    purchaseOrderNumber: action.companyDetails.purchase_order_number,
                }
            };
        default:
            return state;
    }
};

export default reducer;