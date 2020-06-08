import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';

import MeasureDashboardDetails from "../../components/ComplianceLink/Tables/Measure/MeasureDashboardDetails";
import {withRouter} from "react-router-dom";
import {getToken, hasNoAPIErrors} from "../../utilities/utilities";

import axios from '../../axios-instance';
import LinearLoading from "../../components/UI/LinearLoading/LinearLoading";
import HistoryTable from "../../components/ComplianceLink/Tables/Measure/HistoryTable";
import ComplianceDocumentsTable from "../../components/ComplianceLink/Tables/Measure/ComplianceDocumentsTable";
import AddResultForm2 from "../../components/ComplianceLink/Forms/Measure/AddResultForm2";
import AddDocumentForm2 from "../../components/ComplianceLink/Forms/Measure/AddDocumentForm2";

import API from '../../api';
import PaperHeader from "../../components/UI/Paper/PaperHeader";
import SimpleTabs from "../../components/UI/Tabs";
import BackButton from "../../components/UI/BackButton/BackButton";
import Moment from "moment";

class MeasureDashboard extends Component {

    state = {
        measureDetails: {
            compliance_category: '',
            description: '',
            document_link: '',
            due: '',
            frequency: '',
            id: '',
            last_date_checked: '',
            latest_status: '',
            location: '',
            measure: '',
            ncc_bca_provisions: '',
            space: '',
            standard: '',
            status: '',
        },

        history: [],

        // Entered
        resultDetails: [],

        // To Enter
        resultsDetail: [{
            headingOfMeasure: '',
            itemDescription: '',
            itemSize: '',
            locationDescription: '',
            status: 'fail',
            date: '',
            defectType: 'Critical Defect',
            comments: '',
        }],
        complianceDocuments: [],
        loading: true,

        dueDate: '',

        comments: '',
        resultDate: Moment().format('YYYY-MM-DD'),
        status: '',

        documentToUpload: '',
        documentToUploadName: '',

        uploadPercent: null,

        // Add results state.
        selectedResult: 'Fail',
        selectedActionRating: '1',
        selectedAdviseManager: '1',
        selectedAdviseAdministrator: '1',

        checker: false,
    };

    resultsDetailAllPass(resultsDetail) {

        let pass = false;
        let fail  = false
        for (let i in resultsDetail) {
            let status = resultsDetail[i]['status'];

            if (status === "fail") {
                fail = true;
            }
            if (status === "pass") {
                pass = true;
            }
        }

        return pass && !fail ? "pass" : "fail";
    }

    toggleEditForResultDetailsHandler = async (idx) => {
        let newResultDetails = JSON.parse(JSON.stringify(this.state.resultDetails));

        newResultDetails[idx]['editing'] = !newResultDetails[idx]['editing'];

        if (newResultDetails[idx]['editing'] === false) {
            try {
                const postData = {
                    compliance_result_detail_id: newResultDetails[idx]['id'],
                    status: newResultDetails[idx]['status'],
                    date: newResultDetails[idx]['date'],
                    defect_type: newResultDetails[idx]['defect_type'],
                    comments: newResultDetails[idx]['comments'],
                };
                this.setState({loading: true});

                await API().Measure().updateResultDetail(postData);
                await this.submitResult()

                this.setState({resultDetails: newResultDetails});
            } catch (errors) {
                alert('Something went wrong when trying to update the result details.');
            }
        } else {
            this.setState({resultDetails: newResultDetails});
        }
    };
    revertChangesHandler = async(idx) => {
        Promise.all([this.getResultDetails()])
            .then(result => {
                const resultDetails = result[0].data.data.data;
                this.setState({
                    resultDetails: resultDetails,
                    loading: false,
                    selectedResult: this.resultsDetailAllPass(resultDetails) === "pass" ? "Pass" : "Fail"
                });
            })
    }
    appendLeadingZeroes(n) {
        if (n <= 9) {
            return "0" + n;
        }
        return n
    }

    updateExitingTableFormRowHandler = (event, idx) => {
        let {name, value} = event.target;

        let newResultsDetail = JSON.parse(JSON.stringify(this.state.resultsDetail));
        let newResultDetails = JSON.parse(JSON.stringify(this.state.resultDetails));

        newResultDetails[idx][name] = value;

        let replacement = {
            resultDetails: newResultDetails,
        };

        if (idx === 0 && name === "date") {
            // Update action date
            replacement['resultDate'] = value.getFullYear() + "-" + this.appendLeadingZeroes(value.getMonth() + 1) + "-" + this.appendLeadingZeroes(value.getDate());
        }

        if (this.resultsDetailAllPass(newResultsDetail) === "pass" && this.resultsDetailAllPass(newResultDetails) === "pass") {
            replacement['selectedResult'] = "Pass";
        } else {
            replacement['selectedResult'] = "Fail";
        }

        this.setState(replacement);
    };

    updateExitingTableFormRowDateHandler = (value, idx) => {

        let newResultsDetail = JSON.parse(JSON.stringify(this.state.resultsDetail));
        let newResultDetails = JSON.parse(JSON.stringify(this.state.resultDetails));

        newResultDetails[idx]['date'] = value.getFullYear() + "-" + this.appendLeadingZeroes(value.getMonth() + 1) + "-" + this.appendLeadingZeroes(value.getDate());

        let replacement = {
            resultDetails: newResultDetails,
        };

        if (idx === 0) {
            replacement['resultDate'] = value.getFullYear() + "-" + this.appendLeadingZeroes(value.getMonth() + 1) + "-" + this.appendLeadingZeroes(value.getDate());
        }

        if (this.resultsDetailAllPass(newResultsDetail) === "pass" && this.resultsDetailAllPass(newResultDetails) === "pass") {
            replacement['selectedResult'] = "Pass";
        } else {
            replacement['selectedResult'] = "Fail";
        }

        this.setState(replacement);
    };
    updateTableFormRowHandler = (event, idx) => {
        let {name, value} = event.target;

        let newResultsDetail = JSON.parse(JSON.stringify(this.state.resultsDetail));
        let newResultDetails = JSON.parse(JSON.stringify(this.state.resultDetails));


        newResultsDetail[idx][name] = value;

        let replacement = {
            resultsDetail: newResultsDetail,
        };

        if (idx === 0 && name === "date") {
            replacement['resultDate'] = value.getFullYear() + "-" + this.appendLeadingZeroes(value.getMonth() + 1) + "-" + this.appendLeadingZeroes(value.getDate());
        }

        if (this.resultsDetailAllPass(newResultsDetail) === "pass" && this.resultsDetailAllPass(newResultDetails) === "pass") {
            replacement['selectedResult'] = "Pass";
        } else {
            replacement['selectedResult'] = "Fail";
        }

        this.setState(replacement);
    };

    updateTableFormRowDateHandler = (value, idx) => {

        let newResultsDetail = JSON.parse(JSON.stringify(this.state.resultsDetail));
        let newResultDetails = JSON.parse(JSON.stringify(this.state.resultDetails));

        newResultsDetail[idx]['date'] = value.getFullYear() + "-" + this.appendLeadingZeroes(value.getMonth() + 1) + "-" + this.appendLeadingZeroes(value.getDate());

        let replacement = {
            resultsDetail: newResultsDetail,
        };

        if (idx === 0) {
            replacement['resultDate'] = value.getFullYear() + "-" + this.appendLeadingZeroes(value.getMonth() + 1) + "-" + this.appendLeadingZeroes(value.getDate());
        }

        if (this.resultsDetailAllPass(newResultsDetail) === "pass" && this.resultsDetailAllPass(newResultDetails) === "pass") {
            replacement['selectedResult'] = "Pass";
        } else {
            replacement['selectedResult'] = "Fail";
        }

        this.setState(replacement);
    };

    addTableFormHandler = idx => {
        let newResultsDetail = [...this.state.resultsDetail];

        newResultsDetail.push({
            headingOfMeasure: '',
            itemDescription: '',
            itemSize: '',
            locationDescription: '',
            status: 'fail',
            date: '',
            defectType: 'Critical Defect',
            comments: '',
        });

        this.setState({resultsDetail: newResultsDetail});
    };

    removeTableFormHandler = idx => {
        let newResultsDetail = [...this.state.resultsDetail];

        newResultsDetail = newResultsDetail.filter((newResultDetail, index) => {
            return index !== idx;
        });

        this.setState({resultsDetail: newResultsDetail});
    };

    handleActionInitiated = event => {
        try {
            const name = event.target.name;
            const value = this.state[name];

            let newValue = null;

            if (value === '1') {
                newValue = '0';
            } else {
                newValue = '1';
            }

            this.setState({
                [name]: newValue
            });
        } catch (e) {
            alert(JSON.stringify(e));
        }
    };

    getMeasureId() {
        const {number: measureId} = this.props.match.params;

        return measureId;
    }

    async getMeasureIdDetails() {
        const result = await API().Measure().getOneComplianceDetails(this.getMeasureId());
        if (result) {
            return result;
        }
    }

    async getHistoryDetails() {
        const result = await API().Measure().getAllComplianceHistory({compliance_id: this.getMeasureId()});
        if (result) {
            return result;
        }
    }

    async getResultDetails() {
        const result = await API().Measure().getResultDetailsByComplianceId({compliance_id: this.getMeasureId()});
        if (result) {
            return result;
        }
    }

    async getComplianceDocuments(locationId) {
        const result = await API().Measure().getAllComplianceUploadedDocuments({
            compliance_id: this.getMeasureId(),
            location_id: locationId
        });

        if (result) {
            return result;
        }
    }

    async initializeData(measureDetails, history, complianceDocuments, resultDetails) {
        measureDetails = measureDetails.data.data.data[0];
        history = history.data.data.data;
        complianceDocuments = complianceDocuments.data.data.data;
        resultDetails = resultDetails.data.data.data;

        // Prep result details.
        for (let i in resultDetails) {
            resultDetails[i]['editing'] = false;
        }

        this.setState({
            measureDetails: measureDetails,
            history: history,
            complianceDocuments: complianceDocuments,
            resultDetails: resultDetails,
            dueDate: measureDetails['due'],
            resultsDetail: [],
            loading: false,
            selectedResult: this.resultsDetailAllPass(resultDetails) === "pass" ? "Pass" : "Fail"
        });
    }

    onChangedDueDateHandler = async date => {
        let newDueDate = date ? Moment(date).format('YYYY-MM-DD') : ''
        this.setState({
            dueDate: newDueDate
        });
    };

    onChangedAddResultsHandler = (event, formField) => {

        event.preventDefault();

        let value = event.target.value;
        let name = event.target.name;

        // Case: Action rating.
        if (name === 'actionRating') {
            if (parseFloat(value) === 1) {
                this.setState({
                    [formField]: value
                });
            }

            if (parseFloat(value) === 2) {
                this.setState({
                    [formField]: value,
                    selectedAdviseManager: '1',
                    selectedAdviseAdministrator: '1',
                });
            }
        } else {
            this.setState({
                [formField]: value
            });
        }
    };

    onChangedAddResultsDateHandler = (value, formField) => {
        this.setState({
            [formField]: value
        });
    };
    submitResultTypeHandler = async resultType => {

        if (window.confirm('Are you sure you want to add this result?')) {
            let postData = {
                token: getToken(),
            };

            postData = {
                ...postData,
                result_date: this.state.resultDate,
                comments: this.state.comments,
                status: resultType,
                compliance_id: this.getMeasureId(),
            };

            const url = 'measure/updateComplianceAddResult';

            const result = await axios.post(url, postData);

            if (hasNoAPIErrors(result)) {
                this.setState({
                    dueDate: '',
                    comments: '',
                });

                this.successUpdateCallback();
            }
        }
    };

    onDueDateUpdateHandler = async () => {

        if (this.state.dueDate === this.state.measureDetails['due']) {
            alert('You cannot update a date to be the same as it is.');
        } else {
            if (window.confirm(`Are you sure you want to update the due date to "${this.state.dueDate}"`)) {
                const update = await API().Measure().updateDueDate({
                    compliance_id: this.getMeasureId(),
                    due_date: this.state.dueDate
                });

                if (hasNoAPIErrors(update)) {
                    this.successUpdateCallback();
                }
            }
        }
    };

    successUpdateCallback() {
        const requests = [
            this.getMeasureIdDetails(),
            this.getHistoryDetails(),
            this.getResultDetails(),
        ];

        Promise.all(requests)
            .then(res => {
                const measureDetails = res[0];
                const history = res[1];
                const resultDetails = res[2];
                const location_id = res[0].data.data.data[0].location_id
                Promise.all([this.getComplianceDocuments(location_id)])
                    .then(result => {
                        const complianceDocuments = result[0];
                        this.initializeData(measureDetails, history, complianceDocuments, resultDetails);
                    })
            })
            .catch(err => {
                alert('something went wrong when refreshing the data');
            });
    }

    async refreshData() {
        this.setState({loading: true});
        const measureDetails = await this.getMeasureIdDetails();

        if (!hasNoAPIErrors(measureDetails)) {
            const redirectTo = '/dashboard/compliance';

            this.props.history.push(redirectTo);
        }
        const location_id = measureDetails.data.data.data[0].location_id

        Promise.all([
            this.getHistoryDetails(),
            this.getComplianceDocuments(location_id),
            this.getResultDetails(),
        ]).then(res => {
            if (hasNoAPIErrors(res[0]) && hasNoAPIErrors(res[1]) && hasNoAPIErrors(res[2])) {
                this.initializeData(measureDetails, res[0], res[1], res[2]);
            }
        }).catch(err => {
            alert(err);
        });
    }

    async componentDidMount() {
        this.props.setPageTitle('Measure Dashboard');

        this.refreshData();
    }

    onFileChangedHandler = event => {
        const documentToUpload = event.target.files[0];
        const documentToUploadName = event.target.files[0].name;

        this.setState({
            documentToUpload: documentToUpload,
            documentToUploadName: documentToUploadName,
        });
    };
    handleLocationWideDocument = event => {
        this.setState({locationWideDocument: event.target.checked})
    }
    onDocumentSubmitHandler = async event => {
        event.preventDefault();

        let data = new FormData();

        data.append('token', getToken());
        data.append('compliance_id', this.getMeasureId());
        data.append('image', this.state.documentToUpload, this.state.documentToUploadName);
        if (this.state.locationWideDocument)
            data.append('location_wide_document', this.state.measureDetails.location_id)

        axios.post('measure/upload', data, {
            onUploadProgress: progressEvent => {
                this.setState({uploadPercent: progressEvent.loaded / progressEvent.total});
            }
        }).then(res => {
            if (hasNoAPIErrors(res)) {
                this.setState({
                    documentToUpload: '',
                    documentToUploadName: '',
                    uploadPercent: null,
                });

                this.successUpdateCallback();

            }
        }).catch(err => {
            console.log(err);
        })
    };

    submitResultHandler = async event => {
        event.preventDefault();
        this.setState({loading: true});
        await this.submitResult();
    };

    async submitResult() {
        let actionRating = null;

        if (this.state.selectedActionRating === '1') {
            actionRating = 'Non-Critical Defect';
        }

        if (this.state.selectedActionRating === '2') {
            actionRating = 'Critical Defect';
        }

        let postData = {};

        if (this.state.selectedResult === 'Fail') {
            postData = {
                "compliance_id": this.getMeasureId(),
                "result_type": this.state.selectedResult,
                "action_rating": actionRating,
                "advise_manager": this.state.selectedAdviseManager,
                "advise_administrator": this.state.selectedAdviseAdministrator,
                "result_date": this.state.resultDate,
                "comments": this.state.comments,
                "resultsDetail": this.state.resultsDetail,
            };
        } else {
            postData = {
                "compliance_id": this.getMeasureId(),
                "result_type": this.state.selectedResult,
                "result_date": this.state.resultDate,
                "comments": this.state.comments,
                "resultsDetail": this.state.resultsDetail,
            };
        }

        const result = await API().Measure().addResult(postData);

        if (hasNoAPIErrors(result)) {
            this.successUpdateCallback();
        }
    }

    render() {
        const tab1 = (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Paper>
                        <PaperHeader
                            title="Measure Details"
                        />
                        <MeasureDashboardDetails
                            userType={this.props.userType}
                            measureDetails={this.state.measureDetails}
                            onChangedDueDate={this.onChangedDueDateHandler}
                            onDueDateUpdate={this.onDueDateUpdateHandler}
                            dueDate={this.state.dueDate}
                        />
                    </Paper>
                </Grid>
            </Grid>
        );

        let subtitle = <React.Fragment>for <span style={{color: 'black'}}> {this.state.measureDetails.measure} </span>
            in <span style={{color: 'black'}}>{this.state.measureDetails.space}</span></React.Fragment>
        const tab2 = (
            <Paper>
                <PaperHeader
                    title={"Add Results"}
                    subtitle={subtitle}
                />
                <AddResultForm2
                    handleActionInitiated={this.handleActionInitiated}
                    checker={this.state.checker}

                    resultsDetail={this.state.resultsDetail}
                    resultDetails={this.state.resultDetails}
                    addTableForm={this.addTableFormHandler}
                    removeTableForm={this.removeTableFormHandler}

                    measureDetails={this.state.measureDetails}

                    userType={this.props.userType}
                    onChangedAddResults={this.onChangedAddResultsHandler}
                    onChangedAddResultsDate={this.onChangedAddResultsDateHandler}
                    updateTableFormRow={this.updateTableFormRowHandler}
                    updateTableFormRowDate={this.updateTableFormRowDateHandler}
                    updateExitingTableFormRow={this.updateExitingTableFormRowHandler}
                    updateExitingTableFormRowDate={this.updateExitingTableFormRowDateHandler}
                    submitResult={this.submitResultHandler}
                    toggleEditForResultDetails={this.toggleEditForResultDetailsHandler}
                    revertChanges={this.revertChangesHandler}
                    status={this.state.status}
                    resultDate={this.state.resultDate}
                    comments={this.state.comments}

                    selectedResult={this.state.selectedResult}
                    selectedActionRating={this.state.selectedActionRating}

                    selectedAdviseManager={this.state.selectedAdviseManager}
                    selectedAdviseAdministrator={this.state.selectedAdviseAdministrator}
                />
            </Paper>
        );

        const tab3 = (
            <Paper>
                <PaperHeader
                    title="Compliance Documents"
                />
                <AddDocumentForm2
                    userType={this.props.userType}
                    fileChanged={this.onFileChangedHandler}
                    documentSubmitted={this.onDocumentSubmitHandler}
                    documentToUploadName={this.state.documentToUploadName}
                    uploadPercent={this.state.uploadPercent}
                    handleLocationWideDocument={this.handleLocationWideDocument}
                />
                <ComplianceDocumentsTable
                    complianceDocuments={this.state.complianceDocuments}
                />
            </Paper>
        );

        const tab4 = (
            <Paper>
                <PaperHeader
                    title="Action History"
                />
                <HistoryTable
                    history={this.state.history}
                />
            </Paper>
        );

        const displayTabs = (
            <SimpleTabs
                tabLabels={['Measure Details', 'Add Results', 'Compliance Documents', 'Action History']}
                items2={[tab1, tab2, tab3, tab4]}
                items={[tab1, tab2, tab3, tab4]}
            />
        );

        let previousLocation = sessionStorage.getItem('previousLocation')
        let previousRoute = previousLocation ? JSON.parse(previousLocation) : {pathname: "/dashboard/compliance"}
        return (
            <React.Fragment>
                {
                    this.state.loading ? <React.Fragment>  <LinearLoading/> <br/> </React.Fragment> : null
                }
                <BackButton routeTo={previousRoute.pathname} name={previousRoute.name} styleOverrides={{
                    marginBottom: '10px',
                }}/>

                {displayTabs}
            </React.Fragment>
        )
    }
}

export default withRouter(MeasureDashboard);
