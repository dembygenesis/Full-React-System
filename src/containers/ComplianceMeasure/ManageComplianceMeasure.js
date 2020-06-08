import React, {Component} from 'react';

import API from '../../api';
import {hasNoAPIErrors} from "../../utilities/utilities";

import ComplianceMeasure from '../../components/ComplianceLink/Forms/ComplianceMeasure/ComplianceMeasureForm';
import LinearLoading from "../../components/UI/LinearLoading/LinearLoading";
import BackButton from "../../components/UI/BackButton/BackButton";

class ManageComplianceMeasure extends Component {

    state = {
        loading: null,
        complianceMeasureCategory: null,
        complianceMeasureFrequencyCategory: null,
        states: [],
        selectedStates: [],

        formFields: {
            name: '',
            nccBcaProvisions: '',
            frequencyType: '',
            frequencyUnit: '',
            standard: '',
            complianceCategoryId: '',
            description: '',
            documentLink: '',
            isNational: '',
        },
    };

    getMeasureId() {
        const {number: complianceMeasureId} = this.props.match.params;

        return complianceMeasureId;
    }

    formEventChangedHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => {
            return {
                formFields: {
                    ...prevState.formFields,
                    [name]: value,
                }
            }
        });
    };

    isNationalChangedHandler = () => {
        const isNational = this.state.formFields.isNational;

        if (isNational === 1) {
            // Set to false, and uncheck all states selected.
            this.setState(prevState => {
                return {
                    ...prevState,
                    formFields: {
                        ...prevState.formFields,
                        isNational: 0,
                    },
                    selectedStates: []
                };
            });
        } else {
            this.setState(prevState => {
                return {
                    ...prevState,
                    formFields: {
                        ...prevState.formFields,
                        isNational: 1,
                    },
                    selectedStates: this.state.states.reduce((accumulator, idx) => accumulator.concat(idx.state), [])
                };
            });
        }
    };

    selectedStatesChangedHandler = state => {

        let newSelectedStates = [...this.state.selectedStates];

        if (this.state.selectedStates.indexOf(state) !== -1) {
            const idx = newSelectedStates.indexOf(state);

            newSelectedStates.splice(idx, 1);
        } else {
            newSelectedStates.push(state);
        }

        // Set is national automatically when all states are selected.
        if (newSelectedStates.length === this.state.states.length)
            this.setState(prevState => {
                return {
                    ...prevState,
                    formFields: {
                        ...prevState.formFields,
                        isNational: 1
                    },
                    selectedStates: newSelectedStates,
                }
            });
        else
            this.setState(prevState => {
                return {
                    ...prevState,
                    formFields: {
                        ...prevState.formFields,
                        isNational: 0
                    },
                    selectedStates: newSelectedStates,
                }
            });
    };

    updateHandler = async (event) => {

        event.preventDefault();

        const postData = {
            name: this.state.formFields.name,
            compliance_measure_id: this.getMeasureId(),
            ncc_bca_provisions: this.state.formFields.nccBcaProvisions,
            compliance_measure_category_id: this.state.formFields.complianceCategoryId,
            compliance_measure_frequency_category_id: this.state.formFields.frequencyType,
            frequency_unit: this.state.formFields.frequencyUnit,
            description: this.state.formFields.description,
            document_link: this.state.formFields.documentLink,
            standard: this.state.formFields.standard,

            is_national: this.state.formFields.isNational,
            selected_states: this.state.selectedStates,
        };

        try {
            const result = await API().ComplianceMeasure().updateComplianceMeasure(postData);

            if (hasNoAPIErrors(result)) {
                this.initializeData();
            }
        } catch (errors) {
            alert(JSON.stringify(errors));
        }
    };

    async initializeData() {
        this.setState({loading: true});

        const postData = {
            compliance_measure_id: this.getMeasureId()
        };

        Promise.all([
            API().ComplianceMeasure().getComplianceMeasureById(postData),
            API().ComplianceMeasure().getComplianceMeasureCategory(),
            API().ComplianceMeasure().getComplianceMeasureFrequencyCategory(),
            API().Location().getStates()
        ]).then(res => {

            const hasNoErrors = hasNoAPIErrors(res[0])
                && hasNoAPIErrors(res[1])
                && hasNoAPIErrors(res[2])
                && hasNoAPIErrors(res[3]);

            if (hasNoErrors) {
                let complianceMeasure = res[0].data.data.data[0];
                let complianceMeasureCategory = res[1].data.data.data;
                let complianceMeasureFrequencyCategory = res[2].data.data.data;
                let states = res[3].data.data.data;

                let selectedStates = complianceMeasure['states'] !== null
                    ? complianceMeasure['states'].length !== 0
                        ? complianceMeasure['states']
                        : []
                    : [];

                // Remove nulls.
                for (let i in complianceMeasure)
                    complianceMeasure[i] = complianceMeasure[i] === null ? '' : complianceMeasure[i];

                const isNational = parseFloat(complianceMeasure['is_national']);
                
                this.setState(prevState => {
                    return {
                        ...prevState,

                        formFields: {
                            name: complianceMeasure['name'],
                            nccBcaProvisions: complianceMeasure['ncc_bca_provisions'],
                            frequencyType: complianceMeasure['frequency_type'],
                            frequencyUnit: complianceMeasure['frequency_unit'],
                            standard: complianceMeasure['standard'],
                            complianceCategoryId: complianceMeasure['compliance_category_id'],
                            description: complianceMeasure['description'],
                            documentLink: complianceMeasure['document_link'],
                            isNational: isNational,
                        },
                        loading: false,
                        states: states,
                        selectedStates: isNational === 1
                            ? states.reduce((accumulator, idx) => accumulator.concat(idx['state']), [])
                            : selectedStates,
                        complianceMeasureCategory: complianceMeasureCategory,
                        complianceMeasureFrequencyCategory: complianceMeasureFrequencyCategory,
                    };
                });
            }
        });
    }

    componentDidMount() {
        this.props.setPageTitle('Compliance Measure');
        
        try {
            this.initializeData();
        } catch (err) {
            alert('Something went wrong.');
        }
    }

    render() {
        
        let form = (
            <React.Fragment>
                {
                    this.state.loading === false
                        ? (
                            <React.Fragment>
                                <BackButton routeTo="/complianceMeasure" />

                                <ComplianceMeasure
                                    name={this.state.formFields.name}
                                    nccBcaProvisions={this.state.formFields.nccBcaProvisions}
                                    frequencyType={this.state.formFields.frequencyType}
                                    frequencyUnit={this.state.formFields.frequencyUnit}
                                    standard={this.state.formFields.standard}
                                    complianceCategoryId={this.state.formFields.complianceCategoryId}
                                    description={this.state.formFields.description}
                                    documentLink={this.state.formFields.documentLink}
                                    isNational={this.state.formFields.isNational}

                                    states={this.state.states}
                                    selectedStates={this.state.selectedStates}
                                    complianceMeasureCategory={this.state.complianceMeasureCategory}
                                    complianceMeasureFrequencyCategory={this.state.complianceMeasureFrequencyCategory}
                                    formEventChanged={this.formEventChangedHandler}
                                    selectedStatesChanged={this.selectedStatesChangedHandler}
                                    isNationalChanged={this.isNationalChangedHandler}
                                    update={this.updateHandler}
                                />
                            </React.Fragment>
                        )
                        : <LinearLoading/>
                }
            </React.Fragment>
        );

        // let display = null;
        //
        // if (this.state.loading !== null) {
        //     display = form;
        // }

        return (
            <React.Fragment>
                {form}
            </React.Fragment>
        );
    }
}

export default ManageComplianceMeasure;