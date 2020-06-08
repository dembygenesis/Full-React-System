import React, {Component} from 'react';

import axios from '../../axios-instance';
import Alert from '../../components/UI/Alert/Alert';
import LinearLoading from '../../components/UI/LinearLoading/LinearLoading';

import Paper from '@material-ui/core/Paper';

import MeasureFilterFrom from '../../components/ComplianceLink/Filters/MeasureFilter/MeasureFilter';
import ComplianceMeasuresTable from '../../components/ComplianceLink/Tables/Measure/ComplianceMeasuresTable';
import {hasNoAPIErrors} from "../../utilities/utilities";
import ReportLabel from "../../components/UI/Reports/ReportLabel";

import {withStyles} from '@material-ui/core/styles';
import styles from './ManageMeasure.styles';
import API from '../../api';
import _ from "lodash";

class ManageMeasure extends Component {

    state = {
        token: localStorage.getItem('token'),
        userHasNoComplianceEntries: null,
        filters: [],
        complianceMeasures: [],

        companies: [],
        locations: [],
        spaces: [],
        complianceCategories: [],

        selectedFilters: JSON.parse(sessionStorage.getItem('selectedFilters')) ||
        {
            companyId: '',
            locationId: '',
            spaceId: '0',
            complianceCategoryId: '0',
            measureId: '',
        }
    };

    formUpdateHandler = (value, formField) => {

        this.setState(prevState => {
                let selectedFilters = {
                    ...prevState.selectedFilters,
                    [formField]: value,
                };
                return {
                    ...prevState,
                    selectedFilters
                }
            },
            this.saveFilterToSession);
    };

    updateLocationAndSetDefault = async (companyId, updateSelectedFields) => {

        let locations = await axios.post('measure/getLocationsWithAccess', {
            token: this.state.token,
            company_id: companyId
        });

        if (hasNoAPIErrors(locations)) {
            locations = locations.data.data.data;

            const initialLocation = locations.length === 0 ? '' : locations[0]['id'];
            let spaces = await axios.post('measure/getSpacesWithAccess', {
                token: this.state.token,
                location_id: initialLocation
            });

            spaces = spaces.data.data.data;
            this.setState(prevState => {

                    let selectedFilters = {
                        ...prevState.selectedFilters,
                        ...updateSelectedFields,
                        companyId: companyId,
                        locationId: initialLocation,
                    };

                    return {
                        ...prevState,
                        locations: locations,
                        spaces: spaces,
                        complianceCategories: [],
                        selectedFilters
                    }
                },
                this.saveFilterToSession);
        }
    };

    updateSpacesAndSetDefault = async (locationId, updateSelectedFields) => {

        let spaces = await axios.post('measure/getSpacesWithAccess', {
            token: this.state.token,
            location_id: locationId
        });

        if (hasNoAPIErrors(spaces)) {
            spaces = spaces.data.data.data;


            this.setState(prevState => {
                    let selectedFilters = {
                        ...prevState.selectedFilters,
                        ...updateSelectedFields,
                        locationId: locationId,
                    };

                    return {
                        ...prevState,
                        spaces: spaces,
                        complianceCategories: [],
                        selectedFilters
                    }
                },
                this.saveFilterToSession);
        }
    };

    updateComplianceCategoriesAndSetDefault = async (spaceId, updateSelectedFields) => {

        let complianceCategories = await axios.post('measure/getComplianceCategoriesWithAccess', {
            token: this.state.token,
            space_id: spaceId
        });
        if (hasNoAPIErrors(complianceCategories)) {
            complianceCategories = complianceCategories.data.data.data;


            this.setState(prevState => {
                let selectedFilters = {
                    ...prevState.selectedFilters,
                    ...updateSelectedFields,
                    spaceId: spaceId,
                    complianceCategoryId: updateSelectedFields.complianceCategoryId,
                };


                return {
                    ...prevState,
                    complianceCategories: complianceCategories,
                    selectedFilters
                }
            }, this.saveFilterToSession);
        } else {
            alert(JSON.stringify(complianceCategories));
        }
    };

    async checkHasComplianceEntries() {

        const result = await API().Measure().accessCheck();

        if (hasNoAPIErrors(result)) {
            return result.data.data.data;
        } else {
            return false;
        }
    }

    async initializeFilters() {

        let companies = await API().Measure().getAllFilterCompany();
        let companyId = companies.data.data.data[0]['id'];

        let locations = await API().Measure().getAllFilterLocation({
            company_id: companyId
        });

        let selectedLocation = locations.data.data.data.filter(location => location.id === this.state.selectedFilters.locationId)
        let locationId = selectedLocation.length > 0 ? selectedLocation[0].id : locations.data.data.data[0]['id'];

        let spaces = await API().Measure().getAllFilterSpace({
            location_id: locationId
        });
        let selectedSpace = spaces.data.data.data.filter(space => space.id === this.state.selectedFilters.spaceId)
        let spaceId = selectedSpace.length > 0 ? selectedSpace[0].id : spaces.data.data.data[0]['id'];

        let complianceCategories = await API().Measure().getAllFilterComplianceCategory({
            space_id: spaceId
        });

        if (hasNoAPIErrors(companies) && hasNoAPIErrors(locations)
            && hasNoAPIErrors(spaces) && hasNoAPIErrors(complianceCategories)) {
            companies = companies.data.data.data;
            locations = locations.data.data.data;
            spaces = spaces.data.data.data;
            complianceCategories = complianceCategories.data.data.data;

            const initialCompany = companies[0]['id'];
            const initialLocation = locationId;

            this.setState(prevState => {

                let selectedFilters = {
                    ...prevState.selectedFilters,
                    companyId: initialCompany,
                    locationId: initialLocation,
                };

                return {
                    ...prevState,

                    companies: companies,
                    locations: locations,
                    spaces: spaces,
                    complianceCategories: complianceCategories,

                    selectedFilters
                }
            }, () => {
                this.getMeasures(
                    this.state.selectedFilters.companyId,
                    this.state.selectedFilters.locationId,
                    this.state.selectedFilters.spaceId,
                    this.state.selectedFilters.complianceCategoryId,
                );
                this.saveFilterToSession()
            });
        } else {
            alert('something went wrong when using the filters');
        }
    }

    async getMeasures(companyId, locationId, spaceId, complianceCategoryId) {

        let params = {
            company_id: companyId,
            location_id: locationId,
        };

        if (spaceId !== '0') {
            params['space_id'] = spaceId;
        }

        if (complianceCategoryId !== '0') {
            params['compliance_category_id'] = complianceCategoryId;
        }

        let result = await API().Measure().getAll(params);

        if (hasNoAPIErrors(result)) {
            result = result.data.data.data;

            this.setState({complianceMeasures: result});
        }
    };

    onUpdateHandler = (event, fieldType) => {

        const value = event.target.value;

        if (fieldType === 'companyId') {

            const updateSelectedFields = {
                locationId: '0',
                spaceId: '0',
                complianceCategoryId: '0',
            };

            this.updateLocationAndSetDefault(value, updateSelectedFields);
        }

        if (fieldType === 'locationId') {
            const updateSelectedFields = {
                spaceId: '0',
                complianceCategoryId: '0',
            };

            this.updateSpacesAndSetDefault(value, updateSelectedFields);
        }

        if (fieldType === 'spaceId') {
            if (value !== '0') {
                const updateSelectedFields = {
                    complianceCategoryId: '0',
                };

                this.updateComplianceCategoriesAndSetDefault(value, updateSelectedFields);
            } else {
                this.setState(prevState => {
                    let selectedFilters = {
                        ...prevState.selectedFilters,
                        spaceId: '0',
                        complianceCategoryId: '0',
                    }

                    return {
                        ...prevState,
                        selectedFilters
                    }
                }, this.saveFilterToSession);
            }
        }

        if (fieldType === 'complianceCategoryId') {
            this.formUpdateHandler(value, fieldType);
        }
    };

    saveFilterToSession() {
        sessionStorage.setItem('selectedFilters', JSON.stringify(this.state.selectedFilters))
    }

    async componentDidMount() {
        this.props.setPageTitle('Compliance Dashboard');

        const userHasComplianceEntries = await this.checkHasComplianceEntries();

        if (userHasComplianceEntries) {
            this.setState({userHasNoComplianceEntries: false});
            this.initializeFilters();
        } else {
            this.setState({userHasNoComplianceEntries: true});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevState.selectedFilters) !== JSON.stringify(this.state.selectedFilters)) {
            this.getMeasures(
                this.state.selectedFilters.companyId,
                this.state.selectedFilters.locationId,
                this.state.selectedFilters.spaceId,
                this.state.selectedFilters.complianceCategoryId,
            );
        }
    }
    viewComplianceMeasurehandler(id){
        sessionStorage.removeItem('previousLocation')
        this.props.history.push('/dashboard/measure/' + id)
    }

    render() {

        const {classes} = this.props;


        let spaceNames = [];
        this.state.complianceMeasures.forEach(measure => {
                spaceNames.push({
                    space_id: measure.space_id,
                    space_name: measure.space_name
                })
            }
        )

        spaceNames = _.uniqBy(spaceNames, 'space_id');
        let display = (
            <div>
                <MeasureFilterFrom
                    filters={this.state.filters}

                    updateHandler={this.onUpdateHandler}

                    companies={this.state.companies}
                    locations={this.state.locations}
                    spaces={_.orderBy(this.state.spaces, [space => space.name.toLowerCase()],['asc'])}
                    complianceCategories={this.state.complianceCategories}

                    companyId={this.state.selectedFilters.companyId}
                    locationId={this.state.selectedFilters.locationId}
                    spaceId={this.state.selectedFilters.spaceId}
                    complianceCategoryId={this.state.selectedFilters.complianceCategoryId}

                    formUpdateHandler={this.formUpdateHandler}
                    spaceChangedHandler={() => {
                    }}
                />

                <br/>
                <br/>
                {spaceNames.map(space => (
                        <Paper key={space.space_id} className={classes.root}>
                            <table>
                                <thead>
                                <tr>
                                    <td style={{width: '300px'}}>
                                        <ReportLabel
                                            logo="location"
                                            type="Space"
                                            value={space.space_name}
                                        />
                                    </td>
                                </tr>
                                </thead>
                            </table>
                            <ComplianceMeasuresTable
                                viewComplianceMeasurehandler={this.viewComplianceMeasurehandler.bind(this)}
                                userType={this.props.userType}
                                complianceMeasures={this.state.complianceMeasures.filter(measure => measure.space_id === space.space_id)}
                            />
                        </Paper>
                    )
                )
                }

            </div>
        );

        let noEntriesDisplay = (
            <Alert type={'error'}>
                You have no compliances configured, please add compliance measures in the compliance config page.
            </Alert>
        );

        let rendered = this.state.userHasNoComplianceEntries === false
            ? display
            : noEntriesDisplay;

        return this.state.userHasNoComplianceEntries !== null ? rendered : <LinearLoading/>;
    }
}

export default withStyles(styles)(ManageMeasure);
