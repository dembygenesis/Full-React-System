import React from 'react';
import propTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from "@material-ui/core/TextField";
import ButtonWithIcon from "../../../UI/ButtonWithIcon/ButtonWithIcon";
import _ from "lodash";

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto'

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
        minWidth: 250,
    },
    formHeading: {
        color: '#BF1E2E',
        fontWeight: 'bold',
        fontSize: '1rem'
    }
});

const ComplianceCategoryFilter = props => {
    const {classes} = props;

    let convertFrequencyLabel = (complianceMeasure) => {
        let filterOptions = props.complianceMeasureOptions.filter(option => {
            return option.measure === complianceMeasure.measure
        })
        let frequencyLabel = filterOptions.reduce((accumulator, val) => {
            let unit = val.frequency_unit || 1
            let label = unit === 1 ? "Monthly" : unit + " Monthly"
            if (val.frequency_type === 2) {
                label = unit === 1 ? "Yearly" : unit + " Yearly"
            }
            accumulator += (accumulator !== '' ? ', ' : ' ') + label;
            return accumulator;
        }, '');
        return frequencyLabel
    }
    return (
        <React.Fragment>

            <Typography variant="h6" className={classes.formHeading} gutterBottom>

                {
                    props.userType === 'Administrator' || props.userType === 'Account Holder'
                        ? 'Select a Compliance Category and tap to add'
                        : 'Filter by Compliance Category'
                }
            </Typography>

            <FormControl className={classes.formControl}>
                <InputLabel className={classes.formControl} htmlFor="compliance-category">
                    Compliance Category
                </InputLabel>

                <Select
                    autoWidth={true}
                    value={props.selectedComplianceCategoryId}
                    onChange={props.updateFilter.bind(this)}
                    inputProps={{
                        name: 'selectedComplianceCategoryId',
                        id: 'selectedComplianceCategoryId',
                    }}
                >
                    {props.complianceCategories.map(complianceCategory => (
                        <MenuItem
                            key={complianceCategory.id}
                            value={complianceCategory.id}
                        >
                            {complianceCategory.name}
                        </MenuItem>
                    ))}
                </Select>

                {
                    props.complianceMeasureOptions.length === 0 &&
                    props.userType !== 'Manager' &&
                    props.selectedComplianceCategoryId !== ''
                        ? <p>This space contains all the measures under this category.</p>
                        : null
                }

                {
                    (props.complianceMeasureOptions.length !== 0 &&
                        props.userType !== 'Manager' &&
                        props.selectedComplianceCategoryId !== '')
                        ? (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                                        checked={false}
                                        onChange={props.checkMarkTickedHandler.bind(this)}
                                        value=""
                                        name="Add all items"
                                        color="primary"
                                    />
                                }
                                label="Add all items"
                            />
                        )
                        : null
                }

                {
                    _.orderBy(_.uniqBy(props.complianceMeasureOptions, 'measure'), [measures => measures.measure.toLowerCase()], ['asc']).map(complianceMeasureOption => (
                        <React.Fragment key={complianceMeasureOption.id}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                                        checked={false}
                                        onChange={props.checkMarkTickedHandler.bind(this)}
                                        value={complianceMeasureOption.id.toString()}
                                        color="primary"
                                    />
                                }
                                label={
                                    complianceMeasureOption.measure + ( " [ " + convertFrequencyLabel(complianceMeasureOption) + " ]")
                                }
                            />
                        </React.Fragment>
                    ))
                }
            </FormControl>

            <br/>
            <br/>

            {
                props.selectedComplianceCategoryId !== ''
                    ? (
                        <React.Fragment>
                            <Typography variant="h6" className={classes.formHeading} style={{
                                marginBottom: '0'
                            }} gutterBottom>
                                Add Compliance Certifier to All Items
                            </Typography>

                            <form method="POST" onSubmit={props.updateAllCertifierEmailsHandler.bind()}>
                                <div style={{
                                    display: 'flex'
                                }}>
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            type="email"
                                            required
                                            disabled={['Manager', 'Reviewer'].indexOf(props.userType) !== -1}
                                            value={props.bulkComplianceCertifierEmails}
                                            onChange={props.updateFilter.bind(this)}
                                            inputProps={{
                                                name: 'bulkComplianceCertifierEmails',
                                                id: 'bulkComplianceCertifierEmails',
                                            }}
                                            label="Email"
                                        />
                                    </FormControl>

                                    <ButtonWithIcon
                                        type="submit"
                                        title="Update All"
                                        variant="contained"
                                        color="primary"
                                        icon="Identity"
                                        styleOverrides={{
                                            marginTop: '13px',
                                            marginLeft: '10px',
                                            padding: '3px 5px',
                                            paddingRight: '10px',
                                        }}
                                        iconStyleOverrides={{
                                            marginRight: '5px',
                                        }}
                                    />
                                </div>
                            </form>
                        </React.Fragment>
                    )
                    : null
            }
        </React.Fragment>
    );
};

ComplianceCategoryFilter.propTypes = {
    userType: propTypes.string.isRequired,
    selectedComplianceCategoryId: propTypes.string.isRequired,
    complianceCategories: propTypes.array.isRequired,
    selectedSpaceId: propTypes.string.isRequired,
    complianceCategoryChangedHandler: propTypes.func.isRequired,
    bulkComplianceCertifierEmails: propTypes.string.isRequired,
    updateFilter: propTypes.func.isRequired,
    updateAllCertifierEmailsHandler: propTypes.func.isRequired,
};

export default withStyles(styles)(ComplianceCategoryFilter);