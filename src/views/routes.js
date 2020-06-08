import {getAsyncComponent} from "../utilities/utilities";

const routesDir = {

    // Test.
    Test                        : 'containers/Test',

    // Report.
    ReportDetails              : 'containers/Reports/ReportDetails',
    Reports                    : 'containers/Reports/Archives',

    // Login.
    Login                      : 'containers/Login/Login',

    // Compliance Measure.
    ComplianceMeasure          : 'containers/ComplianceMeasure/ComplianceMeasure',
    ManageComplianceMeasure    : 'containers/ComplianceMeasure/ManageComplianceMeasure',

    // User.
    User                       : 'containers/User/User',
    UserManage                 : 'containers/User/ManageUser',
    UserApprove                 : 'containers/User/ApproveUser',
    Location                   : 'containers/Location/Location',
    UserManual                  : 'containers/Manual/UserManual',


    // User Activity.
    UserActivity               : 'containers/UserActivity/UserActivity',

    // Company.
    CompanyManage              : 'containers/Company/ManageCompany',
    CompanyManagePrivileges    : 'containers/Company/ManagePrivileges',
    Company                    : 'containers/Company/Company',

    // Location.
    LocationManage             : 'containers/Location/ManageLocation',
    LocationManagePrivileges   : 'containers/Location/ManagePrivileges',

    // Dashboard.
    MeasureManage              : 'containers/Measure/ManageMeasure',
    MeasureDashboard           : 'containers/Measure/MeasureDashboard',

    // Space.
    Space                      : 'containers/Space/Space',
    SpaceManage                : 'containers/Space/ManageSpace',

    // Compliance.
    ManageCompliance           : 'containers/Compliance/ManageCompliance',


    // User profile management.
    Profile                    : 'containers/Profile/ManageProfile',
    ManagementCompany          : 'containers/ManagementCompany/ManageManagementCompany',

};

let asyncRoutes = {};

const getRoutes = () => {
    for (let i in routesDir)
        asyncRoutes[i] = getAsyncComponent(routesDir[i]);

    return asyncRoutes;
};

export default getRoutes;