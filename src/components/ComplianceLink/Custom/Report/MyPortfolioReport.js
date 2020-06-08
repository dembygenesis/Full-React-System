import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import ReportTable from "../../Tables/Report/ReportTable";
import ReportDetail from "../../../UI/Reports/ReportLabel"

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
        marginRight: theme.spacing.unit * 5,
        minWidth: 250,
    },

});

const myPortfolioReport = props => {
    const {
        details,
        manager,
    } = props;



    return (
        <React.Fragment>
            <Grid container spacing={16}>
                <Grid item xs={12}>

                    <div style={{
                        display: 'flex',
                    }}>
                        <ReportDetail
                            logo={"Manager"}
                            type={"Manager"}
                            value={manager}
                        />
                    </div>

                    <ReportTable
                        report={details}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

myPortfolioReport.propTypes = {
    manager: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    details: PropTypes.array.isRequired,
};

export default withStyles(styles)(myPortfolioReport);