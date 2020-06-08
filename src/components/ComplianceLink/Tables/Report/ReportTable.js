import React from 'react';
import propTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import genericStyles from "../style";
import moment from 'moment'
import ReportLabel from "../../../UI/Reports/ReportLabel";
import Link from '@material-ui/core/Link';
import _ from "lodash";

const styles = theme => ({
    ...genericStyles,
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
    formControl: {
        // margin: theme.spacing.unit * 1.5,
        minWidth: 250,
    },
    cellStyleHeader: {
        align: 'left',
        margin: '0',
        padding: '5px 10px',

    },
    cellStyle: {
        align: 'left',
        margin: '0',
        padding: '5px 10px',

        borderBottom: '1px solid #dfdfdf'
    },

});

const getActionInitiatedLength = actions_initiated => {
    if (actions_initiated) {
        return actions_initiated.split('---').length;
    }

    return 0;
};

const getSpacesLength = spaces => {
    if (spaces) {
        return spaces.split('---').length;
    }

    return 0;
};

const renderActionsInitiated = actions_initiated => {

    actions_initiated = actions_initiated.split('---');

    let iterator = 0;

    return actions_initiated.map(action_initiated => {
        iterator++;

        return (
            <React.Fragment key={JSON.stringify(action_initiated) + iterator}>
                <span>{action_initiated.replace(/"/g, '')}</span> {actions_initiated.length > 1 ? (
                <React.Fragment><br/><br/></React.Fragment>) : null}
            </React.Fragment>
        );
    });
};

const renderResultDetails = resultDetails => {

    if (resultDetails === null) {
        return null;
    }

    resultDetails = resultDetails.split('---');

    let iterator = 0;

    return resultDetails.map(resultDetail => {

        resultDetail = resultDetail.split('<-->');

        iterator++;

        return (
            <React.Fragment key={JSON.stringify(resultDetail) + iterator}>
                {resultDetail[1]} <br/>
                {resultDetail[2]} <br/>
                {resultDetail[3]} <br/>
                {resultDetail[4]} <br/>
                {resultDetail[5]} <br/>
                {resultDetail[6]} <br/>
                {resultDetail[7]} <br/>
                {resultDetail[8]} <br/> <br/>
            </React.Fragment>
        );
    });
};
const renderComplianceMeasure = (reportEntry, complianceMeasures, viewComplianceMeasurehandler, status) => {
    return <div style={{paddingLeft: "35px", paddingTop: "10px", paddingBottom: "20px"}}>
        {
            complianceMeasures.map(complianceMeasure => {
                return <React.Fragment key={complianceMeasure.id}>
                    <Link
                        style={{cursor: "pointer", color: complianceMeasure.latest_compliance_status === 1 ? 'green' : '#BF1E2E'}}
                        component="a"
                        onClick={() => viewComplianceMeasurehandler(complianceMeasure.id)}
                    >
                        {complianceMeasure.measure}
                    </Link>
                    <br/>{complianceMeasures.length > 1 ? <br/> : null}
                    {/*<button onClick={() => viewComplianceMeasurehandler(complianceMeasure.id)}*/}
                    {/*key={JSON.stringify(complianceMeasure.id)}>{complianceMeasure.measure}</button>*/}
                    {/*<br/>{complianceMeasures.length > 1 ? <br/> : null}*/}
                </React.Fragment>
            })
        }
    </div>

}
const renderCategory = (reportEntry, viewComplianceMeasurehandler, spaceName, categoryName, status) => {
    let complianceMeasures = reportEntry.compliance_measures.filter(compliance_measure => compliance_measure.space === spaceName)

    return (
        <React.Fragment key={JSON.stringify(categoryName)}>
            {
                status === 'fail'
                    ? (
                        <React.Fragment>
                            <ReportLabel
                                logo="space"
                                type="Compliance Category"
                                value={categoryName}
                            />
                            {renderComplianceMeasure(reportEntry, complianceMeasures, viewComplianceMeasurehandler, "fail")}
                        </React.Fragment>
                    )
                    : (
                        <React.Fragment>
                            <ReportLabel
                                logo="location"
                                type="Compliance Category"
                                value={categoryName}
                            />
                            {renderComplianceMeasure(reportEntry, complianceMeasures, viewComplianceMeasurehandler)}
                        </React.Fragment>
                    )
            }
        </React.Fragment>
    )
}
const renderSpaces = (reportEntry, viewComplianceMeasurehandler, groupSpaceName) => {

    let spaces = reportEntry.spaces.split('---');

    return spaces.map(space => {

        if (space)
            space = space.split('<-->');

        let spaceName = space[0];
        let status = space[1];
        if (groupSpaceName) {
            if (groupSpaceName === spaceName) {
                return (
                    <React.Fragment key={JSON.stringify(space)}>
                        {
                            status === 'fail'
                                ? (
                                    <React.Fragment>
                                        <ReportLabel
                                            logo="space"
                                            type="Space"
                                            value={spaceName}
                                        />
                                    </React.Fragment>
                                )
                                : (
                                    <React.Fragment>
                                        <ReportLabel
                                            logo="location"
                                            type="Space"
                                            value={spaceName}
                                        />
                                    </React.Fragment>
                                )
                        }
                    </React.Fragment>
                );
            }
        } else {
            let complianceMeasures = reportEntry.compliance_measures.filter(compliance_measure => compliance_measure.space === spaceName)
            return (
                <React.Fragment key={JSON.stringify(space)}>
                    {
                        status === 'fail'
                            ? (
                                <React.Fragment>
                                    <ReportLabel
                                        logo="space"
                                        type="Space"
                                        value={spaceName}
                                    />
                                    {renderComplianceMeasure(reportEntry, complianceMeasures, viewComplianceMeasurehandler, "fail")}
                                </React.Fragment>
                            )
                            : (
                                <React.Fragment>
                                    <ReportLabel
                                        logo="location"
                                        type="Space"
                                        value={spaceName}
                                    />
                                    {renderComplianceMeasure(reportEntry, complianceMeasures, viewComplianceMeasurehandler)}
                                </React.Fragment>
                            )
                    }
                </React.Fragment>
            );
        }


    });
};

const reportTable = props => {
    const {classes, groupby} = props;

    let getRowReport = function (reportEntry, spaceName) {
        return (
            <TableRow key={JSON.stringify(reportEntry)}>
                <TableCell style={{
                    verticalAlign: getActionInitiatedLength(reportEntry.actions_initiated) > 1
                    || getSpacesLength(reportEntry.spaces) > 1 ? 'top' : 'center',
                }} className={classes.cellStyle}>
                    <div style={{
                        paddingTop: getActionInitiatedLength(reportEntry.actions_initiated) > 1
                        || getSpacesLength(reportEntry.spaces) > 1 ? '12px' : '0px',
                    }}>{groupby === "byspace" ? renderSpaces(reportEntry, props.viewComplianceMeasurehandler, spaceName) : reportEntry.name}</div>
                </TableCell>

                <TableCell style={{
                    verticalAlign: getActionInitiatedLength(reportEntry.actions_initiated) > 1
                    || getSpacesLength(reportEntry.spaces) > 1 ? 'top' : 'center',
                }} className={classes.cellStyle}>
                    <div style={{
                        paddingTop: getActionInitiatedLength(reportEntry.actions_initiated) > 1
                        || getSpacesLength(reportEntry.spaces) > 1 ? '10px' : '0px',
                    }}>
                        <div style={{
                            padding: '2px 10px',
                            borderRadius: '3px',
                            backgroundColor: reportEntry.fail === "0" ? 'green' : 'red',
                            color: 'white',
                            width: '50px',
                            textAlign: 'center',
                        }}>{reportEntry.fail === "0" ? 'Pass' : 'Fail'}</div>
                    </div>

                </TableCell>

                <TableCell style={{
                    verticalAlign: getActionInitiatedLength(reportEntry.actions_initiated) > 1
                    || getSpacesLength(reportEntry.spaces) > 1 ? 'top' : 'center',
                }} className={classes.cellStyle}>
                    <div style={{
                        paddingTop: getActionInitiatedLength(reportEntry.actions_initiated) > 1 || getSpacesLength(reportEntry.spaces) > 1 ? '12px' : '0px',
                        paddingBottom: getActionInitiatedLength(reportEntry.actions_initiated) > 1 || getSpacesLength(reportEntry.spaces) > 1 ? '10px' : '0px',
                    }}>
                        {groupby === "byspace" ? renderCategory(reportEntry, props.viewComplianceMeasurehandler, spaceName, reportEntry.name, reportEntry.fail === "0" ? 'pass' : 'fail') : renderSpaces(reportEntry, props.viewComplianceMeasurehandler)}
                    </div>
                </TableCell>

                <TableCell style={{
                    verticalAlign: getActionInitiatedLength(reportEntry.actions_initiated) > 1
                    || getSpacesLength(reportEntry.spaces) > 1 ? 'top' : 'center',
                }} className={classes.cellStyle}>
                    <div style={{
                        paddingTop: getActionInitiatedLength(reportEntry.actions_initiated) > 1
                        || getSpacesLength(reportEntry.spaces) > 1 ? '12px' : '0px',
                    }}>{moment(reportEntry.due_date, "YYYY-MM-DD").format("DD-MM-YYYY")}</div>
                </TableCell>

            </TableRow>
        );
    };

    let spaces = _.uniqBy(props.report, "space_id")
    console.log(spaces)

    return (

        <Table style={{
            border: '1px solid #dfdfdf',
            marginBottom: '20px',
        }}>
            <TableHead style={{
                borderBottom: 0,
            }}>
                <TableRow>
                    <TableCell className={classes.cellStyleHeader} style={{
                        width: '300px',
                        backgroundColor: '#e5e5e5',
                        color: 'black',
                        textTransform: 'uppercase',
                    }}>{groupby === "byspace" ? "Space" : "Compliance Category"}</TableCell>
                    <TableCell className={classes.cellStyleHeader} style={{
                        width: '150px',
                        backgroundColor: '#e5e5e5',
                        color: 'black',
                        textTransform: 'uppercase',
                    }}>Status</TableCell>
                    <TableCell className={classes.cellStyleHeader} style={{
                        width: '150px',
                        backgroundColor: '#e5e5e5',
                        color: 'black',
                        textTransform: 'uppercase',
                    }}>{groupby === "byspace" ? "Compliance Category" : "Space"}</TableCell>
                    <TableCell className={classes.cellStyleHeader} style={{
                        width: '150px',
                        backgroundColor: '#e5e5e5',
                        color: 'black',
                        textTransform: 'uppercase',
                    }}>Due Date</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {groupby === "bycategory" ?
                    props.report.map(reportEntry => (getRowReport(reportEntry))) :
                    spaces.map(space => (props.report.filter(report => report.space_id === space.space_id).map(reportEntry => (getRowReport(reportEntry, space.space_name)))))
                }
            </TableBody>
        </Table>

    );
};

reportTable.propTypes = {
    report: propTypes.array.isRequired,
};

export default withStyles(styles)(reportTable);