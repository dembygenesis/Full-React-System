import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// import CompanyLocationSpaceFilter from "../../Filters/CompanyLocationSpaceFilter/CompanyLocationSpaceFilter";

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

const manageComplianceForm = props => {

    const {classes} = props;

    return (
        <React.Fragment>

            <Typography variant="h6" gutterBottom>
                Select Space
            </Typography>

            <Paper>

            </Paper>



            <Paper className={classes.root}>

                <form onSubmit={(event) => props.submitHandler(event)} method="POST" className={classes.form}>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="compliance-category">
                            Compliance Category
                        </InputLabel>
                        <Select
                            autoWidth={true}
                            value={props.selectedComplianceCategoryId}
                            disabled={props.selectedSpaceId === ''}
                            onChange={(event) => props.complianceCategoryChangedHandler(event)}
                            inputProps={{
                                name: 'Compliance Category',
                                id: 'compliance-category',
                            }}
                        >
                            {
                                props.categories.map(category => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <br/>
                    <br/>

                    {props.complianceMeasureOptions.length === 0 && props.selectedComplianceCategoryId !== '' ? <h3>This space contains all the measures under this category.</h3> : null}
                    {props.complianceMeasureOptions.length !== 0 ? <h3>Available Compliance Measures to add.</h3> : null}

                    {
                        props.complianceMeasureOptions.map(complianceMeasureOption => (
                            <React.Fragment key={complianceMeasureOption.id}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={true}
                                            onChange={() => {}}
                                            value="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label={complianceMeasureOption.measure}
                                />

                                <br/>
                            </React.Fragment>
                        ))
                    }

                    <Button
                        type="submit"
                        disabled={false}
                        variant="contained" color="primary">
                        Add Compliance
                    </Button>
                </form>
            </Paper>
        </React.Fragment>
    );
};

export default withStyles(styles)(manageComplianceForm);