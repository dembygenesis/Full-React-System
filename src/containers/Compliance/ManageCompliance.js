import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';

import axios from '../../axios-instance';
import LinearLoading from "../../components/UI/LinearLoading/LinearLoading";
import ComplianceFilter from "../../components/ComplianceLink/Filters/Compliance/ComplianceFilter";
import ComplianceCategoryFilter from "../../components/ComplianceLink/Filters/Compliance/ComplianceCategoryFilter";
import ManageSpaceIdCompliancesTable from "../../components/ComplianceLink/Tables/Compliance/ManageSpaceIdCompliancesTable";
import Alert from "../../components/UI/Alert/Alert";
import {hasNoAPIErrors} from "../../utilities/utilities";

import {withStyles} from '@material-ui/core/styles';
import styles from './ManageCompliance.styles';
import API from "../../api";
import _ from "lodash";

class ManageCompliance extends Component {

    state = {
        loading: false,
        hasSpaces: null,

        filters: {
            selectedCompanyId: '',
            selectedLocationId: '',
            selectedLocationTypeId: '',
            selectedSpaceId: '',
            selectedComplianceCategoryId: '',
            bulkComplianceCertifierEmails: '',

            companies: [],
            locationTypes: [],
            locations: [],
            spaces: [],
            complianceCategories: [],
            compliances: [],
            complianceDateEdits: {},
            complianceMeasureOptions: [],
        },

        currentComplianceContributorUpdated: '',
        currentComplianceContributorUpdateValue: '',
    };

    /**
     * Filter methods.
     */

    async checkHasSpaces() {
        this.setState({loading: true});

        const result = await API().Compliance().accessCheck();

        this.setState({loading: false});

        return result.data.data.data;
    }

    async getCompanies() {
        let result = await API().Compliance().getAllFiltersCompany();

        if (!hasNoAPIErrors(result))
            throw new Error("Error when trying to fetch the companies.");

        result = result.data.data.data;

        return result;
    }

    async getLocationTypes(companyId) {
        let result = await API().Compliance().getAllFiltersLocationTypes({company_id: companyId});

        if (!hasNoAPIErrors(result)) {
            throw new Error("Error when trying to fetch the locations.");
        }

        result = result.data.data.data;

        return result;
    }

    async getLocations(companyId, locationTypeId) {

        let result = await API().Compliance().getAllFiltersLocations({
            company_id: companyId,
            location_type_id: locationTypeId
        });

        if (!hasNoAPIErrors(result)) {
            throw new Error("Error when trying to fetch the locations.");
        }

        result = result.data.data.data;

        return result;
    }

    async getSpaces(locationId) {
        let result = await API().Compliance().getAllFiltersSpaces({location_id: locationId});

        if (!hasNoAPIErrors(result)) {
            throw new Error("Error when trying to fetch the spaces.");
        }

        result = result.data.data.data;

        return result;
    }

    async getComplianceCategories(locationId) {
        let result = await API().Compliance().getAttachableComplianceCategories({location_id: locationId});

        if (!hasNoAPIErrors(result)) {
            throw new Error("Error when trying to fetch the compliance categories.");
        }

        result = result.data.data.data;

        return result;
    };

    async getCompliances(spaceId) {
        let result = await API().Compliance().getAll({space_id: spaceId});

        if (!hasNoAPIErrors(result)) {
            throw new Error("Error when trying to fetch the compliances by space id.");
        }

        result = result.data.data.data;

        return result;
    };

    getComplianceDateEditStates(compliances) {
        return compliances.reduce((accumulator, data) => {
            accumulator[data['id']] = data.email;

            return accumulator;
        }, {});
    }

    async getAvailableToAddMeasures(complianceCategoryId, spaceId) {
        let result = await API().Compliance().getAllNonCheckedMeasures({
            compliance_category_id: complianceCategoryId,
            space_id: spaceId,
        });

        if (!hasNoAPIErrors(result)) {
            throw new Error("Error when trying to fetch the available measures to add.");
        }

        result = result.data.data.data;

        return result;
    };

    async initializeFilter() {
        try {
            const companies = await this.getCompanies();
            const selectedCompanyId = companies[0]['id'].toString();

            const locationTypes = await this.getLocationTypes(selectedCompanyId);
            const selectedLocationTypeId = 'other';// locationTypes[0]['id'].toString();

            const locations = await this.getLocations(selectedCompanyId, selectedLocationTypeId);
            const selectedLocationId = locations[0]['id'].toString();

            const spaces = await this.getSpaces(selectedLocationId);

            this.setState(prevState => {
                return {
                    ...prevState,
                    filters: {
                        ...prevState.filters,

                        selectedCompanyId: selectedCompanyId,
                        selectedLocationTypeId: selectedLocationTypeId,
                        selectedLocationId: selectedLocationId,

                        companies: companies,
                        locations: locations,
                        locationTypes: locationTypes,
                        spaces: spaces,
                    }
                }
            });
        } catch (fetchErrors) {
            alert(fetchErrors);
        }
    }

    updateFilter = async event => {
        const filterType = (event.target.name).toString();
        const filterValue = (event.target.value).toString();

        try {
            if (filterType === 'selectedCompanyId') {
                // Update location type.
                const locationTypes = await this.getLocationTypes(filterValue);
                const selectedLocationTypeId = 'other';//locationTypes[0]['id'].toString();

                // Update location.
                const locations = await this.getLocations(filterValue, selectedLocationTypeId);

                // Update space.
                const selectedLocationId = locations[0]['id'].toString();
                const spaces = await this.getSpaces(selectedLocationId);
                const selectedSpaceId = '';

                this.setState(prevState => {
                    return {
                        ...prevState,
                        filters: {
                            ...prevState.filters,
                            locationTypes: locationTypes,
                            locations: locations,
                            spaces: spaces,
                            selectedLocationTypeId: selectedLocationTypeId,
                            selectedLocationId: selectedLocationId,
                            selectedSpaceId: selectedSpaceId,

                            [filterType]: filterValue,
                        }
                    }
                });
            }

            if (filterType === 'selectedLocationTypeId') {
                // Update location.
                const locations = await this.getLocations(this.state.filters.selectedCompanyId, filterValue);

                // Update space.
                const selectedLocationId = locations[0]['id'].toString();
                const spaces = await this.getSpaces(selectedLocationId);
                const selectedSpaceId = '';

                this.setState(prevState => {
                    return {
                        ...prevState,
                        filters: {
                            ...prevState.filters,
                            locations: locations,
                            spaces: spaces,
                            selectedLocationId: selectedLocationId,
                            selectedSpaceId: selectedSpaceId,

                            [filterType]: filterValue,
                        }
                    }
                });
            }

            if (filterType === 'selectedLocationId') {
                // Update space.
                const spaces = await this.getSpaces(filterValue);
                const selectedSpaceId = '';

                this.setState(prevState => {
                    return {
                        ...prevState,
                        filters: {
                            ...prevState.filters,
                            spaces: spaces,
                            selectedSpaceId: selectedSpaceId,
                            [filterType]: filterValue,
                        }
                    }
                });
            }

            if (filterType === 'selectedSpaceId') {
                // Update compliances.
                const spaceId = filterValue;

                const complianceCategories = await this.getComplianceCategories(this.state.filters.selectedLocationId);
                const compliances = await this.getCompliances(spaceId);
                const complianceDateEdits = this.getComplianceDateEditStates(compliances);
                let complianceMeasureOptions = []
                if(this.state.filters.selectedComplianceCategoryId){
                    complianceMeasureOptions = await this.getAvailableToAddMeasures(
                        this.state.filters.selectedComplianceCategoryId,
                        spaceId
                    );
                }
                this.setState(prevState => {
                    return {
                        ...prevState,
                        filters: {
                            ...prevState.filters,
                            compliances: compliances,
                            complianceDateEdits: complianceDateEdits,
                            complianceCategories: complianceCategories,
                            complianceMeasureOptions: complianceMeasureOptions,
                            [filterType]: spaceId,
                        }
                    }
                });
            }

            if (filterType === 'selectedComplianceCategoryId') {
                const complianceMeasureOptions = await this.getAvailableToAddMeasures(
                    filterValue,
                    this.state.filters.selectedSpaceId
                );

                this.setState(prevState => {
                    return {
                        ...prevState,
                        filters: {
                            ...prevState.filters,
                            [filterType]: filterValue,
                            complianceMeasureOptions: complianceMeasureOptions,
                        }
                    }
                });
            }

            if (filterType === 'bulkComplianceCertifierEmails') {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        filters: {
                            ...prevState.filters,
                            bulkComplianceCertifierEmails: filterValue,
                        }
                    }
                });
            }
        } catch (e) {
            alert(e);
        }
    };

    complianceCategoryChangedHandler = async event => {

    };

    /**
     * end of Filter functions.
     */

    /**
     * Delete compliance functions.
     */

    refreshCompliancesAndComplianceCategories(spaceId, complianceCategoryId) {

        let requests = [
            this.getCompliances(spaceId)
        ];

        if (complianceCategoryId !== '')
            requests.push(
                this.getAvailableToAddMeasures(
                    complianceCategoryId,
                    spaceId
                )
            );

        Promise.all(requests).then(res => {
            const compliances = res[0];
            const complianceDateEdits = this.getComplianceDateEditStates(compliances);
            const complianceMeasureOptions = (complianceCategoryId !== '') ? res[1] : [];

            this.setState(prevState => {
                return {
                    ...prevState,
                    filters: {
                        ...prevState.filters,
                        complianceMeasureOptions: complianceMeasureOptions,
                        compliances: compliances,
                        complianceDateEdits: complianceDateEdits,
                    }
                }
            });
        }).catch(err => {
            alert(err);
        });
    }

    deleteCompliance = async complianceId => {
        // const result = await axios.post('compliance/deleteCompliance', {compliance_id: complianceId});
        const result = await API().Compliance().void({compliance_id: complianceId});

        if (!hasNoAPIErrors(result))
            throw new Error("Error when trying to delete the compliance entry.");

        return true;
    };

    complianceDeleteHandler = async complianceId => {
        let complianceIds = this.getComplianceIds(complianceId);
        if (window.confirm('Are you want to delete this compliance?')) {
            try {
                const result = await this.deleteCompliance(complianceIds);

                if (result) {
                    const spaceId = this.state.filters.selectedSpaceId;
                    const complianceCategoryId = this.state.filters.selectedComplianceCategoryId;

                    this.refreshCompliancesAndComplianceCategories(spaceId, complianceCategoryId)
                }
            } catch (e) {
                alert(e);
            }
        }
    };

    getComplianceIds(complianceId) {
        let selectedCompliance = this.state.filters.compliances.find(compliance => {
            return compliance.id === complianceId
        })
        let filterCompliance = this.state.filters.compliances
            .filter(val => {
                return val.measure === selectedCompliance.measure
            })
        let complianceIds = filterCompliance.reduce((accumulator, val) => {
            accumulator += (accumulator !== '' ? ',' : '') + val.id;
            return accumulator;
        }, '');
        return complianceIds
    }

    checkMarkTickedHandler = async event => {
        let complianceMeasureIds = this.getComplianceMeasureIds(event);

        const complianceCategoryId = this.state.filters.selectedComplianceCategoryId;
        const spaceId = this.state.filters.selectedSpaceId;

        const result = await API().Compliance().add({
            compliance_measure_ids: complianceMeasureIds,
            space_id: spaceId
        });

        if (hasNoAPIErrors(result))
            this.refreshCompliancesAndComplianceCategories(spaceId, complianceCategoryId);
    };

    getComplianceMeasureIds(event) {
        let complianceMeasureIds = '';
        let eventName = event.target.name;
        if (eventName === 'Add all items') {
            complianceMeasureIds = this.state.filters.complianceMeasureOptions.reduce((accumulator, val) => {
                accumulator += (accumulator !== '' ? ',' : '') + val.id;
                return accumulator;
            }, '');
        } else {
            const complianceMeasureId = Number(event.target.value);
            let measureOption = this.state.filters.complianceMeasureOptions.find(option => {
                return option.id === complianceMeasureId
            })
            let filterOptions = this.state.filters.complianceMeasureOptions
                .filter(val => {
                    return val.measure === measureOption.measure
                })
            complianceMeasureIds = filterOptions.reduce((accumulator, val) => {
                accumulator += (accumulator !== '' ? ',' : '') + val.id;
                return accumulator;
            }, '');
        }
        return complianceMeasureIds;
    }

    complianceContributorUpdatedHandler = event => {
        const complianceDateEditIndex = event.target.name;
        const complianceDateEditValue = event.target.value;

        let updatedComplianceDateEdits = {...this.state.filters.complianceDateEdits};

        updatedComplianceDateEdits[complianceDateEditIndex] = complianceDateEditValue;

        this.setState(prevState => {
            return {
                ...prevState,
                filters: {
                    ...prevState.filters,
                    complianceDateEdits: updatedComplianceDateEdits,
                },
            };
        });
    };

    updateAllCertifierEmailsHandler = async (event) => {
        event.preventDefault();

        /*for (let i in this.state.filters.compliances) {
            const compliance = this.state.filters.compliances[i];

            await this.updateComplianceContributor(this.state.filters.bulkComplianceCertifierEmails, compliance['id']);
        }*/

        this.bulkUpdateEmails().then(async res => {

            const compliances = await this.getCompliances(this.state.filters.selectedSpaceId);
            const complianceDateEdits = await this.getComplianceDateEditStates(compliances);

            this.setState(prevState => {
                return {
                    ...prevState,
                    filters: {
                        ...prevState.filters,
                        compliances: compliances,
                        complianceDateEdits: complianceDateEdits,
                    }
                }
            });
        });

        this.setState({loading: false});
    };

    bulkUpdateEmails = () => {
        return new Promise(async (resolve, reject) => {
            for (let i in this.state.filters.compliances) {
                const compliance = this.state.filters.compliances[i];

                await this.updateComplianceContributor(this.state.filters.bulkComplianceCertifierEmails, compliance['id']);
            }

            resolve();
        });
    };

    complianceContributorUpdatePressedHandler = complianceEditIdx => {
        let complianceIds = this.getComplianceIds(complianceEditIdx);

        if (window.confirm('Are you sure you want to set this Compliance Certifier?')) {

            this.updateComplianceContributor(
                this.state.filters.complianceDateEdits[complianceEditIdx],
                complianceIds
            );

            /*this.setState({loading: true});

            axios.post('compliance/updateComplianceContributor', {
                email: this.state.filters.complianceDateEdits[complianceEditIdx],
                compliance_id: complianceEditIdx,
            }).then(res => {
                this.getCompliances(this.state.filters.selectedSpaceId);
                this.setState({loading: false});
            }).catch(err => {
                this.setState({loading: false});
            });*/
        }
    };

    updateComplianceContributor = (email, complianceID) => {
        return new Promise((resolve, reject) => {
            this.setState({loading: true});

            axios.post('compliance/updateComplianceContributor', {
                email: email,
                compliance_id: complianceID,
            }).then(res => {
                this.getCompliances(this.state.filters.selectedSpaceId);
                this.setState({loading: false});
                resolve();
            }).catch(err => {
                this.setState({loading: false});
            });
        });
    };

    /**
     * end of delete compliance functions.
     */

    // Lifecycles.

    async componentDidMount() {
        this.props.setPageTitle('Compliance');

        const spaces = await this.checkHasSpaces();

        if (spaces > 0) {
            this.setState({hasSpaces: true});
            this.initializeFilter();
        } else {
            this.setState({hasSpaces: false});
        }
    }


    render() {

        const {classes} = this.props;

        // 1 display for content.
        let layout = (
            <React.Fragment>

                <ComplianceFilter
                    selectedCompanyId={this.state.filters.selectedCompanyId}
                    selectedLocationTypeId={this.state.filters.selectedLocationTypeId}
                    selectedLocationId={this.state.filters.selectedLocationId}
                    selectedSpaceId={this.state.filters.selectedSpaceId}

                    companies={this.state.filters.companies}
                    locations={this.state.filters.locations}
                    locationTypes={this.state.filters.locationTypes}
                    spaces={_.orderBy(this.state.filters.spaces, [space => space.name.toLowerCase()], ['asc'])}

                    updateFilter={this.updateFilter}
                />

                <br/>
                <br/>

                {
                    this.state.filters.selectedSpaceId !== ''
                        ? (
                            <Paper className={classes.paper}>
                                <ComplianceCategoryFilter
                                    userType={this.props.userType}
                                    complianceMeasureOptions={this.state.filters.complianceMeasureOptions}
                                    complianceCategories={this.state.filters.complianceCategories}
                                    selectedSpaceId={this.state.filters.selectedSpaceId}
                                    selectedComplianceCategoryId={this.state.filters.selectedComplianceCategoryId}
                                    bulkComplianceCertifierEmails={this.state.filters.bulkComplianceCertifierEmails}
                                    updateFilter={this.updateFilter}
                                    complianceCategoryChangedHandler={this.complianceCategoryChangedHandler}
                                    checkMarkTickedHandler={this.checkMarkTickedHandler}
                                    updateAllCertifierEmailsHandler={this.updateAllCertifierEmailsHandler}
                                />

                                <ManageSpaceIdCompliancesTable
                                    userType={this.props.userType}
                                    spaceIdCompliances={this.state.filters.compliances}
                                    selectedComplianceCategoryId={this.state.filters.selectedComplianceCategoryId}
                                    complianceDateEdits={this.state.filters.complianceDateEdits}
                                    deleteHandler={this.complianceDeleteHandler}
                                    complianceContributorUpdated={this.complianceContributorUpdatedHandler}
                                    complianceContributorUpdatePressed={this.complianceContributorUpdatePressedHandler}
                                />
                            </Paper>
                        ) : null
                }
            </React.Fragment>
        );

        // 1 display for you cannot must have spaces.
        let mustHaveSpaces = (
            <Alert type="error">You can only add compliances if you have spaces created.</Alert>
        );

        // 1 logic.
        let display = this.state.hasSpaces === false
            ? mustHaveSpaces
            : layout;

        return this.state.loading
            ? <LinearLoading/>
            : display;
    }
}


export default withStyles(styles)(ManageCompliance);
