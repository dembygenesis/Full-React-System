import React, {Component} from 'react';
import LinearLoading from "../../components/UI/LinearLoading/LinearLoading";
import API from "../../api";
import {hasNoAPIErrors, prepImgLink} from "../../utilities/utilities";
import Alert from "../../components/UI/Alert/Alert";
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import ReportTable from "../../components/ComplianceLink/Tables/Report/ReportTable";
import ReportLabel from "../../components/UI/Reports/ReportLabel";
import moment from 'moment';
import SelectWithTitle from "../../components/UI/SelectWithTitle/SelectWithTitle";
import _ from "lodash";

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Sticky from 'react-sticky-el';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {
    getArchives
} from "../../store/actions/reports";

const styles = theme => ({
    root: {
        width: 200
    }
});

class ReportDetails extends Component {

    state = {
        loading: null,

        managers: null,
        manager: null,

        originalReport: null,
        report: null,
        locationFilters: null,
        groupByFilterSelected: sessionStorage.getItem("groupByFilterSelected") || 'bycategory',
        locationFilterSelected: sessionStorage.getItem("locationFilterSelected") || '0',
        reportDateArchiveSelected: sessionStorage.getItem("reportDateArchiveSelected") || 'now',

        logo: null,

        date: moment().format('MMM DD, YYYY'),
    };

    async getManagers() {

        try {
            const managers = await API().Report().getManagers();

            if (hasNoAPIErrors(managers)) {
                return managers.data.data.data;
            } else {
                return false;
            }
        } catch (err) {

        }
    }

    async getMyPortfolioReport(param) {
        try {
            const report = await API().Report().getMyPortfolio(param);

            if (hasNoAPIErrors(report)) {
                return report.data.data.data;
            } else {
                return false;
            }
        } catch (err) {
            console.log('=====report error=======');
            console.log(err);
        }
    }

    async getOneMyPortfolioReport(param) {
        try {
            const report = await API().Report().getArchive(param);

            if (hasNoAPIErrors(report)) {
                return report.data.data.data;
            } else {
                return false;
            }
        } catch (err) {
            console.log('=====report error=======');
            console.log(err);
        }
    }

    onManagerUpdate = async (event) => {
        this.setState({loading: true});

        const managerId = event.target.value;
        const report = await this.getMyPortfolioReport(managerId);

        if (hasNoAPIErrors(report)) {
            this.setState({
                loading: false,
                report: report,
                manager: managerId,
            })
        }
    };

    setReportAndLocationFilters(report) {
        // Trim out reports with 0 data.

        let reportContainer = [];
        let locationFilters = this.getLocationFilters(report);

        for (let i in report) {
            let reportEntry = report[i];

            if (reportEntry.details.length > 0) {
                reportContainer.push(reportEntry);
            }
        }

        this.setState({
            loading: false,
            report: reportContainer,
            originalReport: reportContainer,
            locationFilters: locationFilters,
        });
    }

    async getLogo() {
        const data = await API().ManagementCompany().getLogo();

        let managementCompanyLogo = data.data.data.data;

        managementCompanyLogo = prepImgLink(managementCompanyLogo);

        // Use logo provided.
        this.setState({logo: managementCompanyLogo});
    }

    getReportDateArchives() {
        let reportDate = [];
        reportDate.push({
            id: 'now',
            name: 'Now'
        })

        /*if (this.props.archives !== null) {
            this.props.archives.forEach(archive => {
                    reportDate.push({
                        id: archive.id,
                        name: archive.date
                    })
                }
            )
        }*/

        reportDate = _.uniq(reportDate);

        return reportDate;
    }

    getLocationFilters(report) {
        let locationFilters = [];

        for (let i in report) {
            locationFilters.push({
                id: report[i]['location'],
                name: report[i]['location'],
            });
        }

        locationFilters = _.uniqBy(locationFilters, 'id');
        console.log(locationFilters)

        return locationFilters;
    }

    async componentDidMount() {
        this.props.getArchives();
        this.props.setPageTitle('My Portfolio Report');

        try {
            const param = 'now'

            // I need a mount here.
            this.setState({
                loading: true
            });

            this.getLogo();

            let report = null;

            if (param === 'now') {
                let paramGroup = {}
                if (sessionStorage.getItem('groupByFilterSelected') === 'byspace') paramGroup.byspace = true
                report = await this.getMyPortfolioReport(paramGroup);
            } else {
                report = await this.getOneMyPortfolioReport(param);
            }

            if (hasNoAPIErrors(report)) {
                if (report.length !== 0) {
                    this.setReportAndLocationFilters(report);
                } else {
                    this.setState({
                        loading: false,
                        report: []
                    });
                }
            } else {
                this.setState({
                    loading: false,
                    report: []
                });
                alert('Something went wrong when trying to query the reports.');
            }
        } catch (err) {

        }
    }

    async selectArchives(archivesId) {
        let report = null;

        if (archivesId === 'now') {
            report = await this.getMyPortfolioReport({byspace: true});
        } else {
            report = await this.getOneMyPortfolioReport(archivesId);
        }

        if (hasNoAPIErrors(report)) {
            if (report.length !== 0) {
                this.setReportAndLocationFilters(report);
            } else {
                this.setState({
                    loading: false,
                    report: []
                });
            }
        } else {
            this.setState({
                loading: false,
                report: []
            });
            alert('Something went wrong when trying to query the reports.');
        }
    }

    renderArchives() {
        if (this.props.archives !== null) {
            return this.props.archives.map(archive => (
                <TableRow key={archive.id}>
                    <TableCell key={archive.id}>
                        <a style={{
                            textDecoration: 'underline'
                        }} onClick={this.selectArchives.bind(this, archive.id)}>{archive.date}</a>
                    </TableCell>
                </TableRow>
            ));
        } else {
            return <LinearLoading/>;
        }
    }

    renderReport() {
        if (this.state.report !== null) {
            if (this.state.report.length > 0) {
                return (
                    <ReportTable
                        report={this.state.report}
                    />
                );
            } else {
                return <Alert type="error">You have no report entries available.</Alert>;
            }
        }
    }

    onGroupByChangeHandler = async event => {
        const value = event.target.value;

        let param = {}
        if (value === 'byspace') param.byspace = true

        this.setState({
            loading: true,
            groupByFilterSelected: value
        }, () => sessionStorage.setItem("groupByFilterSelected", value));

        let report = await this.getMyPortfolioReport(param);

        if (hasNoAPIErrors(report)) {
            if (report.length !== 0) {
                this.setReportAndLocationFilters(report);
            } else {
                this.setState({
                    loading: false,
                    report: []
                });
            }
        } else {
            this.setState({
                loading: false,
                report: []
            });
            alert('Something went wrong when trying to query the reports.');
        }

    };
    onLocationFilterChangedHandler = async event => {
        const value = event.target.value;

        let report = [...this.state.originalReport];

        if (value === "0") {
            this.setState({
                report: report
            })
        } else {
            report = report.filter(e => {
                return e.location === value;
            });

            this.setState({
                report: report,
                locationFilterSelected: value
            }, () => sessionStorage.setItem("locationFilterSelected", value));
        }
    };

    onReportDateArchivesChangedHandler = async event => {
        const value = event.target.value;
        await this.selectArchives(value)

        this.setState({
            reportDateArchiveSelected: value
        }, () => sessionStorage.setItem("reportDateArchiveSelected", value));
    };

    transformSpacesWithComplianceMeasures = (spaces, complianceMeasures) => {
        let transformedSpaces = {};

        spaces = spaces.split('---');

        for (let i in spaces) {
            const space = spaces[i].split('<-->');

            const name = space[0];
            const status = space[1];

            transformedSpaces[name] = {
                status: status,
                compliances: [],
            }
        }

        for (let i in complianceMeasures) {

            const {
                space,
                measure,
                latest_compliance_status: latestComplianceStatus
            } = complianceMeasures[i];

            transformedSpaces[space]['compliances'].push({
                measure,
                latestComplianceStatus
            });

        }

        return transformedSpaces;
    };

    renderSpaces = ({spaces, compliance_measures: complianceMeasures}) => {

        let transformedSpaces = this.transformSpacesWithComplianceMeasures(
            spaces,
            complianceMeasures
        );

        let display = '';

        for (let i in transformedSpaces) {

            const space = i;
            const compliances = transformedSpaces[i]['compliances'];

            let compliancesDisplay = '<div class="sub-text margin-l">';

            for (let i in compliances) {

                compliancesDisplay += `
                    <br><br><a href="#" class="sub-text-link">${compliances[i]['measure']}</a>
                `;
            }

            compliancesDisplay += '</div>';

            display += `
                <div class="space">
                    <p id="report-date" class="details__info info"><i class='fas fa-map-marker-alt'></i><span class="info__title">Space:</span> <b class="info__value">${space}</b></p>
                    <div class="sub-text margin-l">
                        ${compliancesDisplay}
                    </div>
                </div>  
            `;
        }

        return display;
    };

    renderComplianceCategories = ({name: complianceCategory, compliance_measures: complianceMeasures}) => {
        let display = '';

        let complianceMeasuresDisplay = '<div class="sub-text margin-l">';

        for (let i in complianceMeasures) {

            const complianceMeasure = complianceMeasures[i]['measure'];

            complianceMeasuresDisplay += `
                <br><br><a href="#" class="sub-text-link">${complianceMeasure}</a>
            `;
        }

        complianceMeasuresDisplay += '</div>';

        display += `
            <div class="space">
                <p id="report-date" class="details__info info"><i class='fas fa-map-marker-alt'></i><span class="info__title">Compliance Category:</span> <b class="info__value">${complianceCategory}</b></p>
                <div class="sub-text margin-l">
                    ${complianceMeasuresDisplay}
                </div>
            </div>  
        `;

        return display;
    };

    getPrintTableContents = details => {
        let tableContents = '';

        for (let i in details) {

            let {
                name,
                fail,
                spaces,
                compliance_measures,
                due_date,
                space_name: spaceName,
            } = details[i];

            due_date = due_date.split('-');

            // Convert date from "Y-m-d" to "d-m-Y"
            due_date = [
                due_date[2],
                due_date[1],
                due_date[0],
            ].join('-');

            fail = parseFloat(fail);

            // Determine status if pass or fail
            let status = fail === 0
                ? `<span class="data-chip" style="background-color: green;">Pass</span>`
                : `<span class="data-chip" style="background-color: red;">Fail</span>`
            ;

            if (this.state.groupByFilterSelected === 'bycategory') {

                // Render space with compliance measure underneath
                spaces = this.renderSpaces(details[i]);

                tableContents += `
                    <tr class="table__data-row data-align-top">
                       <td class="table__data cell-width-md">${name}</td>
                       <td class="table__data cell-width-sm">${status}</td>
                       <td class="table__data cell-width-sm">${spaces}</td>
                       <td class="table__data cell-width-sm">${due_date}</td>
                    </tr>
                `;
            }

            if (this.state.groupByFilterSelected === 'byspace') {

                // Render compliance categories with compliance measure underneath
                let complianceCategory = this.renderComplianceCategories(details[i]);

                spaceName = `
                    <i class='fas fa-user-circle'></i><span class="info__title">Space:</span> <b class="info__value">${spaceName}</b>
                `;

                tableContents += `
                    <tr class="table__data-row data-align-top">
                       <td class="table__data cell-width-md">${spaceName}</td>
                       <td class="table__data cell-width-sm">${status}</td>
                       <td class="table__data cell-width-sm">${complianceCategory}</td>
                       <td class="table__data cell-width-sm">${due_date}</td>
                    </tr>
                `;
            }
        }

        tableContents += `
            <tfoot>
                <tr>
                    <td>
                        <div class="footer-space">&nbsp;</div>
                    </td>
                </tr>
            </tfoot>
        `;

        return tableContents;
    };

    getPrintTemplate = async () => {

        const report = this.state.report;

        let contents = '';



        for (let i in report) {

            console.log('i', i);
            console.log('report.length', report.length);

            if (report.hasOwnProperty(i)) {
                const {manager, location, company, details} = report[i];

                if (this.state.groupByFilterSelected === 'bycategory') {
                    contents += `
                        <div class="details">
                           <p id="report-date" class="details__info info"><i class='fas fa-user-circle'></i><span class="info__title">Manager:</span> <b class="info__value">${manager}</b></p>
                           <p id="report-date" class="details__info info"><i class='fas fa-map-marker-alt'></i><span class="info__title">Location:</span> <b class="info__value">${location}</b></p>
                           <p id="report-date" class="details__info info"><i class='fas fa-building'></i><span class="info__title">Company:</span> <b class="info__value">${company}</b></p>
                        </div>
                        <table class="table print-friendly">
                           <tr class="table__header-row">
                              <th class="table__header">Compliance category</th>
                              <th class="table__header">Status</th>
                              <th class="table__header">Space</th>
                              <th class="table__header">Due date</th>
                           </tr>
                           
                           ${this.getPrintTableContents(details)}
                        </table>
                    `;
                } else if (this.state.groupByFilterSelected === 'byspace') {
                    contents += `
                        <div class="details">
                           <p id="report-date" class="details__info info"><i class='fas fa-user-circle'></i><span class="info__title">Manager:</span> <b class="info__value">${manager}</b></p>
                           <p id="report-date" class="details__info info"><i class='fas fa-map-marker-alt'></i><span class="info__title">Location:</span> <b class="info__value">${location}</b></p>
                           <p id="report-date" class="details__info info"><i class='fas fa-building'></i><span class="info__title">Company:</span> <b class="info__value">${company}</b></p>
                        </div>
                        <table class="table">
                           <tr class="table__header-row">
                              <th class="table__header">Spaces</th>
                              <th class="table__header">Status</th>
                              <th class="table__header">Compliance category</th>
                              <th class="table__header">Due date</th>
                           </tr>
                           
                           ${this.getPrintTableContents(details)}    
                        </table>
                    `;
                }
            }
        }

        let styles = await API().Report().getMyPortfolioStyles();

        if (hasNoAPIErrors(styles)) {
            styles = styles.data.data.data;
        }

        let toPrint = `
            <html>
                <head>
                    <style type="text/css">
                        ${styles}     
                    </style>
                    
                    <link rel="stylesheet" href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'>
                    
                    <title>My Portfolio Report</title>
                </head>
                <div class="container">
                    <div id="report">
                    
                        <img src="${this.state.logo}" alt="Company Logo" style="
                            max-height: 100px;
                            margin-bottom: 10px;
                            width: auto;
                        ">
                    
                        <div class="header">
                            <p id="report-date" class="info"><i class='far fa-calendar-alt'></i><span class="info__title">Report Date:</span> <b class="info__value">` + new Date + `</b></p>
                        </div>
                        <hr id="divider"/>

                        <div class="content">
                            __REPLACE_CONTENTS__
                        </div>
                
                    </div>
                    
                    <div class="footer__box">
                        <p class="footer">Copyright 2019 Compliancelinc Pty Ltd (ACN 629 888 919)</p> 
                    </div>
                </div>
                </html>
        `;

        console.log(toPrint.replace('__REPLACE_CONTENTS__', contents));
        
        return toPrint.replace('__REPLACE_CONTENTS__', contents);
    };

    onPrintClickedHandler = async event => {

        event.preventDefault();

        let printTemplate = await this.getPrintTemplate();

        let frame1 = document.createElement('iframe');
        frame1.name = "frame1";
        frame1.style.position = "absolute";
        frame1.style.top = "-1000000px";
        document.body.appendChild(frame1);
        let frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
        frameDoc.document.open();
        frameDoc.document.write(printTemplate);
        frameDoc.document.close();

        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            document.body.removeChild(frame1);
        }, 500);

        return false;
    };

    viewComplianceMeasurehandler(id) {
        let location = {
            name: "Reports",
            pathname: this.props.location.pathname
        }
        console.log(this.props.location)
        sessionStorage.setItem('previousLocation', JSON.stringify(location))
        this.props.history.push('/dashboard/measure/' + id)
    }

    render() {
        // Destructure all state
        const {
            loading,
            date,
            report,
            logo,
            locationFilters,
            locationFilterSelected,
            reportDateArchiveSelected,
            groupByFilterSelected
        } = this.state;

        let display = null;

        if (loading && report == null) {
            display = <LinearLoading/>;
        } else if (report != null) {

            if (report.length > 0) {

                display = (
                    <div className="scrollarea" style={{height: '75vh', overflowY: 'scroll', overflowX: 'hidden'}}>
                        <Sticky scrollElement=".scrollarea">

                            <div style={{
                                display: 'flex',
                                paddingLeft: '10px',
                                marginTop: '0px',
                                backgroundColor: '#e7e7e9'
                            }}>
                                <SelectWithTitle
                                    title="Report Date"
                                    options={this.getReportDateArchives()}
                                    value={reportDateArchiveSelected}
                                    disabled={false}
                                    onChange={(event) => this.onReportDateArchivesChangedHandler(event)}
                                    selectStylesOverride={{
                                        minWidth: '300px',
                                    }}
                                    styleOverrides={{
                                        margin: 0,
                                        marginTop: '5px',
                                        marginBottom: '10px',
                                        padding: 0,
                                        textAlign: 'left',
                                    }}
                                />
                                <SelectWithTitle
                                    title="Location Filter"
                                    options={locationFilters}
                                    value={locationFilterSelected}
                                    hasAll
                                    disabled={false}
                                    onChange={(event) => this.onLocationFilterChangedHandler(event)}
                                    selectStylesOverride={{
                                        minWidth: '300px',
                                    }}
                                    styleOverrides={{
                                        margin: 0,
                                        marginTop: '5px',
                                        marginBottom: '10px',
                                        padding: 0,
                                        textAlign: 'left',
                                    }}
                                />
                                <SelectWithTitle
                                    title="Group"
                                    options={[{
                                        id: 'bycategory',
                                        name: 'By Category'
                                    }, {
                                        id: 'byspace',
                                        name: 'By Space',
                                    }]}
                                    value={groupByFilterSelected}
                                    disabled={false}
                                    onChange={(event) => this.onGroupByChangeHandler(event)}
                                    selectStylesOverride={{
                                        minWidth: '300px',
                                    }}
                                    styleOverrides={{
                                        margin: 0,
                                        marginTop: '5px',
                                        marginBottom: '10px',
                                        padding: 0,
                                        textAlign: 'left',
                                    }}
                                />
                                <div style={{
                                    flexDirection: 'row',
                                    textAlign: 'center',
                                    margin: '30px 0'
                                }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{
                                            margin: 0,
                                            right: '10px',
                                            position: 'absolute',
                                            top: '10px',

                                        }}
                                        onClick={(event) => this.onPrintClickedHandler(event)}
                                    >
                                        <AddCircleIcon
                                            style={{
                                                color: 'white',
                                                marginRight: '10px',
                                            }}
                                        /> Print
                                    </Button>
                                </div>
                            </div>
                        </Sticky>

                        <Paper>
                            <div style={{padding: '20px', paddingTop: '0px', backgroundColor: 'white'}}>
                                <br/>
                                <img src={logo} alt="Company Logo" style={{
                                    maxHeight: '100px',
                                    marginBottom: '10px',
                                    width: 'auto',
                                }}/>

                                <ReportLabel
                                    logo="date"
                                    type="Report Date"
                                    value={date}
                                />

                                <hr style={{
                                    marginTop: '25px'
                                }}/>
                            </div>
                        </Paper>
                        <Paper>
                            <div style={{
                                padding: '20px',
                                paddingTop: '0px',
                            }}>


                                {report.map(entry => (
                                    <React.Fragment
                                        key={JSON.stringify(entry)}
                                    >
                                        <table>
                                            <thead>
                                            <tr>
                                                <td style={{width: '300px'}}>
                                                    <ReportLabel
                                                        logo="manager"
                                                        type="Manager"
                                                        value={entry.manager}
                                                    />
                                                </td>
                                                <td style={{width: '300px'}}>
                                                    <ReportLabel
                                                        logo="location"
                                                        type="Location"
                                                        value={entry.location}
                                                    />
                                                </td>
                                                <td style={{width: '600px'}}>
                                                    <ReportLabel
                                                        logo="company"
                                                        type="Company"
                                                        value={entry.company}
                                                    />
                                                </td>
                                            </tr>
                                            </thead>
                                        </table>
                                        {loading ? <LinearLoading/> :
                                            <ReportTable
                                                viewComplianceMeasurehandler={this.viewComplianceMeasurehandler.bind(this)}
                                                report={entry.details}
                                                groupby={groupByFilterSelected}
                                            />}
                                    </React.Fragment>
                                ))}
                            </div>
                            <p style={{"fontSize": "16px", "lineHeight": "1.5em", "textAlign": "center"}}>
                                <span>Copyright 2019 Compliancelinc Pty Ltd (ACN 629 888 919)</span>
                            </p>
                            <br />
                        </Paper>
                    </div>
                );
            } else {
                display = <Alert type="error">You have no report entries available.</Alert>;
            }
        }

        return display
    }
}

const mapStateToProps = state => {
    return {
        archives: state.reports.archives,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getArchives: () => dispatch(getArchives())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReportDetails));