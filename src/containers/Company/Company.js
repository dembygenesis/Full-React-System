import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import {connect} from 'react-redux';

import {
    getCompanies,
    deleteCompanyById,
} from "../../store/actions";
import ButtonWithIcon from "../../components/UI/ButtonWithIcon/ButtonWithIcon";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

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
        margin: theme.spacing.unit * .5,
    },
    cellStyle: {
        align: 'left',
        padding: '5px 10px',
        maxWidth: '150px',
        wordBreak: 'break-all'
    }
});


class Company extends Component {

    deleteHandler = companyId => {
        if (window.confirm('Are you sure you want to delete this company?')) {
            this.props.deleteCompanyById(companyId);
        }
    };

    /**
     * Lifecycle methods.
     */

    componentDidMount() {
        this.props.setPageTitle('Company/Landlord');

        this.props.onLoadGetCompanies();
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div>
                    <ButtonWithIcon
                        title="Add New Company/Landlord"
                        component={NavLink}
                        to="/company/add"
                        variant="contained"
                        color="primary"
                        icon="Add Circle"
                        styleOverrides={{

                        }}
                    />
                </div>

                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cellStyle}>Company Name</TableCell>
                                <TableCell className={classes.cellStyle}>Created By</TableCell>
                                <TableCell className={classes.cellStyle}>ABN</TableCell>
                                <TableCell className={classes.cellStyle}>Mobile Number</TableCell>
                                <TableCell className={classes.cellStyle}>Phone</TableCell>
                                <TableCell className={classes.cellStyle}>Contact</TableCell>
                                <TableCell className={classes.cellStyle}>Billing Address</TableCell>
                                <TableCell className={classes.cellStyle}>Email</TableCell>
                                <TableCell className={classes.cellStyle}>PO #</TableCell>

                                <TableCell align="center">Action</TableCell>
                            </TableRow>

                        </TableHead>

                        <TableBody>
                            {
                                this.props.companies.map(company => {
                                    return (
                                        <TableRow key={JSON.stringify(company)}>
                                            <TableCell className={classes.cellStyle}>{company.name}</TableCell>
                                            <TableCell className={classes.cellStyle}>{company.creator}</TableCell>
                                            <TableCell className={classes.cellStyle}>{company.acn_vcn}</TableCell>
                                            <TableCell className={classes.cellStyle}>{company.mobile_number}</TableCell>
                                            <TableCell className={classes.cellStyle}>{company.telephone_number}</TableCell>
                                            <TableCell className={classes.cellStyle}>{company.contact_name}</TableCell>
                                            <TableCell className={classes.cellStyle}>{company.billing_address}</TableCell>
                                            <TableCell className={classes.cellStyle}>{company.email}</TableCell>
                                            <TableCell className={classes.cellStyle}>{company.purchase_order_number}</TableCell>

                                            <TableCell align="center">
                                                <ButtonWithIcon
                                                    title="Assign"
                                                    to={`/company/assign/${company.id}`}
                                                    component={NavLink}
                                                    variant="contained"
                                                    color="primary"
                                                    icon="Account Circle"
                                                    styleOverrides={{
                                                        padding: '5px',
                                                        margin: 0,
                                                    }}
                                                />

                                                <IconButton
                                                    component={NavLink}
                                                    to={`/company/edit/${company.id}`}
                                                    size="small"
                                                    variant="outlined"
                                                    color="primary"
                                                    style={{
                                                        padding: '5px',
                                                    }}
                                                >
                                                    <EditIcon
                                                        style={{
                                                            color: '#be1d2d',
                                                        }}
                                                    />
                                                </IconButton>

                                                <IconButton
                                                    onClick={this.deleteHandler.bind(this, company.id)}
                                                    size="small"
                                                    variant="outlined"
                                                    color="secondary"
                                                    style={{
                                                        padding: '5px',
                                                    }}
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        companies: state.company.companies
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadGetCompanies: () => dispatch(getCompanies()),
        deleteCompanyById: (companyId) => dispatch(deleteCompanyById(companyId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Company));