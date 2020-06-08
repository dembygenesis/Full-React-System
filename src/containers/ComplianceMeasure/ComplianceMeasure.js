import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';

import ComplianceMeasuresTable from "../../components/ComplianceLink/Tables/ComplianceMeasure/ComplianceMeasureTable";

import API from '../../api';
import {hasNoAPIErrors} from "../../utilities/utilities";
import LinearLoading from "../../components/UI/LinearLoading/LinearLoading";

class ComplianceMeasure extends Component {

    state = {
        complianceMeasures: null,
        complianceMeasureFrequencyCategory: null,
    };

    async componentDidMount() {

        this.props.setPageTitle('Compliance Measure');

        let complianceMeasures = await API().ComplianceMeasure().getComplianceMeasures();
        let complianceMeasureFrequencyCategory = await API().ComplianceMeasure().getComplianceMeasureFrequencyCategory();

        if (hasNoAPIErrors(complianceMeasures) && hasNoAPIErrors(complianceMeasureFrequencyCategory)) {
            complianceMeasures = complianceMeasures.data.data.data;
            complianceMeasureFrequencyCategory = complianceMeasureFrequencyCategory.data.data.data;

            this.setState({
                complianceMeasures: complianceMeasures,
                complianceMeasureFrequencyCategory: complianceMeasureFrequencyCategory,
            });
        }
    }

    render() {
        let display = (
            <Paper style={{
                width: '100%',
                overflowX: 'auto',
                padding: '20px',
            }}>
                <ComplianceMeasuresTable
                    complianceMeasures={this.state.complianceMeasures}
                />
            </Paper>
        );

        display = (this.state.complianceMeasures === null)
            ? <LinearLoading/>
            : display;

        return display;
    }
}

export default ComplianceMeasure;