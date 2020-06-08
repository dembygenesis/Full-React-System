import axios from "./axios-compliance-link";
import {serialize} from "./utilities/utilities";

const postData   = async (url, obj)  => await axios.post(url, typeof obj === "undefined" ? {} : obj);
const getData    = async (url, obj)  => await axios.get(url + ((typeof obj !== "undefined") ? `?${serialize(obj)}` : '').toString() );
const getOne     = async (url, id)   => await axios.get(url + `/${id}`);
const deleteData = async (url, obj)  => await axios.delete(url, typeof obj === "undefined"  ? {} : {data: obj});

const User = () => {

    const baseUrl = 'users';

    return {
        getAll : (obj)                        => getData(baseUrl + '/getAll', obj),
        getOne : (id)                         => getOne (baseUrl + '/getOne', id),
        void   : (obj)                        => deleteData(baseUrl + '/void', obj),
        add    : (obj)                        => postData(baseUrl + '/add', obj),
        update : (obj)                        => postData(baseUrl + '/update', obj),
        approve : (obj)                        => postData(baseUrl + '/approve', obj),

        getAllUserTypes: (obj)                => getData(baseUrl + '/userType/getAll', obj),
        getAllManagementCompany: (obj)        => getData(baseUrl + '/managementCompany/getAll', obj),
    }
};

const Profile = () => {

    const baseUrl = 'profile';

    return {
        update : (obj)                       => postData(baseUrl + '/updateSelf', obj),
    }
};

const ManagementCompany = () => {

    const baseUrl = 'managementCompany';

    return {
        updateLogo : (obj)                   => postData(baseUrl + '/updateLogo', obj),
        getLogo : (obj)                      => getData(baseUrl + '/getLogo', obj),
        getManagementCompanyDetails : (obj)  => getData(baseUrl + '/getManagementCompanyDetails', obj),
        updateName : (obj)                   => postData(baseUrl + '/updateName', obj),
        updateSiteWideMessage : (obj)        => postData(baseUrl + '/updateSiteWideMessage', obj),
    }
};

const Company = () => {

    const baseUrl = 'companies';

    return {

        // V2 Routes.
        getAll: ()                            => getData(baseUrl + '/getAll', {}),
        getOne: (id)                          => getOne(baseUrl + '/getOne', id),
        add : (obj)                           => postData(baseUrl + '/add', obj),
        update : (obj)                        => postData(baseUrl + '/update', obj),
        void : (obj)                          => deleteData(baseUrl + '/void', obj),

        saveCreditCard : (obj)                => postData(baseUrl + '/saveCreditCard', obj),

        // V2 Account Holder Assignment Routes.
        getOneAccountHolderAssignment : (id)  => getOne(baseUrl + '/accountHolderAssignment/getOne', id),
        addAccountHolderAssignment : (obj)    => postData(baseUrl + '/accountHolderAssignment/add', obj),
        voidAccountHolderAssignment : (obj)   => deleteData(baseUrl + '/accountHolderAssignment/void', obj),

        // V2 Reviewer Assignment Routes.
        getOneReviewerAssignment : (id)       => getOne(baseUrl + '/reviewerAssignment/getOne', id),
        addReviewerAssignment : (obj)         => postData(baseUrl + '/reviewerAssignment/add', obj),
        voidReviewerAssignment : (obj)        => deleteData(baseUrl + '/reviewerAssignment/void', obj),

        // v1
        getCompanyDetails: (obj)             => postData('companies/getCompanyDetailsById', obj),
        geManagerAccessDetails: (obj)        => postData('companies/getCompaniesWithSpaces', obj),
        getAccountHolderAccessDetails: (obj) => postData('companies/getUserAccessDetailByCompanyId', obj),
        getReviewerAccessDetails: (obj)      => postData('companies/getReviewerAccessDetailByCompanyId', obj),

        revokeCompanyFromUsers: (obj)        => postData('companies/revokeCompanyFromUsers', obj),
        assignCompanyToUsers: (obj)          => postData('companies/assignCompanyToUsers', obj),


        revokeCompanyFromReviewers: (obj)    => postData('companies/revokeCompanyFromReviewers', obj),
        assignCompanyToReviewers: (obj)      => postData('companies/assignCompanyToReviewers', obj),
    }
};

const Location = () => {

    const baseUrl = 'location';

    return {

        // V2 Routes.
        accessCheck: (obj)                   => getData(baseUrl + '/accessCheck', obj),
        accessCheckHasCompanies: (obj)       => getData(baseUrl + '/accessCheckHasCompanies', obj),
        getAll: (obj)                        => getData(baseUrl + '/getAll', obj),
        getFiltered: (obj)                   => getData(baseUrl + '/getFiltered', obj),
        getOne: (id)                         => getOne(baseUrl + '/getOne', id),
        getAllFiltersCompany: (obj)          => getData(baseUrl + '/filters/company/getAll', obj),
        getAllFiltersStates: (obj)           => getData(baseUrl + '/filters/states/getAll', obj),
        getAllTypesLocation: (obj)           => getData(baseUrl + '/types/getAll', obj),
        add: (obj)                           => postData(baseUrl + '/add', obj),
        update: (obj)                        => postData(baseUrl + '/update', obj),
        void: (obj)                          => deleteData(baseUrl + '/void', obj),

        addPrivilege: (obj)                  => postData(baseUrl + '/privileges/add', obj),
        voidPrivilege: (obj)                 => postData(baseUrl + '/privileges/void', obj),
        getOnePrivilege: (id)                => getOne(baseUrl + '/privileges/getOne', id),

        // Old routes.
        hasCompanies: (obj)                  => postData('location/userHasCompanies', obj),
        hasCompaniesWithLocations: (obj)     => postData('location/userHasCompaniesWithLocations', obj),
        getLocations: (obj)                  => postData('location/getLocationsByManagementId', obj),
        getCompanyTypes: (obj)               => postData('location/getCompanyFilters', obj),
        getLocationsByCompany: (obj)         => postData('location/getLocationsByCompany', obj),
        getStates: (obj)                     => postData('location/getStates', obj),
    }
};

const Space = () => {

    const baseUrl = 'space';

    return {

        // V2
        accessCheck: (obj)                   => getData(baseUrl + '/accessCheck', obj),
        getAll: (obj)                        => getData(baseUrl + '/getAll', obj),
        getFiltered: (obj)                   => getData(baseUrl + '/getFiltered', obj),
        getAllFilters: (obj)                 => getData(baseUrl + '/filters/getAll', obj),
        add: (obj)                           => postData(baseUrl + '/add', obj),
        update: (obj)                        => postData(baseUrl + '/update', obj),
        void: (obj)                          => deleteData(baseUrl + '/void', obj),
        getOne: (id)                         => getOne(baseUrl + '/getOne', id),

        hasSpaces: (obj)                     => postData('compliance/hasSpaces', obj),
        userHasLocations: (obj)              => postData('space/userHasLocations', obj),
        getSpaces: (obj)                     => postData('space/getSpaces', obj),
        getLocationFilters: (obj)            => postData('space/getLocationFilters', obj),
    }
};

const Compliance = () => {

    const baseUrl = 'compliance';

    return {

        // V2.
        accessCheck: (obj)                               => getData(baseUrl + '/accessCheck', obj),
        getAll: (obj)                                    => getData(baseUrl + '/getAll', obj),
        getAllNonCheckedMeasures: (obj)                  => getData(baseUrl + '/nonCheckedMeasures/getAll', obj),
        getAllFiltersCompany: (obj)                      => getData(baseUrl + '/filters/company/getAll', obj),
        getAllFiltersLocationTypes: (obj)                => getData(baseUrl + '/filters/locationType/getAll', obj),
        getAllFiltersLocations: (obj)                    => getData(baseUrl + '/filters/location/getAll', obj),
        getAllFiltersSpaces: (obj)                       => getData(baseUrl + '/filters/space/getAll', obj),
        add: (obj)                                       => postData(baseUrl + '/add', obj),
        void: (obj)                                      => deleteData(baseUrl + '/void', obj),

        // Old routes.
        getCompanyFilters: (obj)                         => postData('compliance/getCompaniesWithSpaces', obj),
        getLocationTypeFilters: (obj)                    => postData('compliance/getLocationTypesWithCompanies', obj),
        getLocationFilters: (obj)                        => postData('compliance/getLocationsFromLocationTypeWithSpaces', obj),
        getSpaceFilters: (obj)                           => postData('compliance/getSpacesByLocation', obj),
        getAttachableComplianceCategories: (obj)         => postData('compliance/getAttachableComplianceCategories', obj),
        getCompliancesFromSpaceId: (obj)                 => postData('compliance/getCompliancesFromSpaceId', obj),
        getNonCheckedMeasuresByComplianceCategory: (obj) => postData('compliance/getNonCheckedMeasuresByComplianceCategory', obj),

        // Dashboard.
        getComplianceMeasureById: (obj)                  => postData('compliance/getComplianceMeasureById', obj),
    }
};

const Measure = () => {

    const baseUrl = 'measure';

    return {

        // V2.
        accessCheck: (obj)                         => getData(baseUrl + '/accessCheck', obj),
        getAll: (obj)                              => getData(baseUrl + '/getAll', obj),

        // Old.
        // addResult: (obj)                           => postData(baseUrl + '/results/add', obj),
        addResult: (obj)                           => postData(baseUrl + '/results/add2', obj),

        // Filters
        getAllFilterCompany: (obj)                 => getData(baseUrl + '/filters/company/getAll', obj),
        getAllFilterLocation: (obj)                => getData(baseUrl + '/filters/location/getAll', obj),
        getAllFilterSpace: (obj)                   => getData(baseUrl + '/filters/space/getAll', obj),
        getAllFilterComplianceCategory: (obj)      => getData(baseUrl + '/filters/complianceCategory/getAll', obj),

        getOneComplianceDetails: (id)              => getOne(baseUrl + '/details/getOne', id),
        getOneComplianceDocuments: (obj)           => getData(baseUrl + '/details/documents/getAll', obj),
        getAllComplianceHistory: (obj)             => getData(baseUrl + '/details/history/getAll', obj),
        getResultDetailsByComplianceId: (obj)      => getData(baseUrl + '/details/resultDetails/getAll', obj),
        updateResultDetail: (obj)                  => postData(baseUrl + '/details/resultDetails/update', obj),
        getAllComplianceUploadedDocuments: (obj)   => getData(baseUrl + '/details/documents/uploaded/getAll', obj),

        updateDueDate: (obj)                       => postData(baseUrl + '/details/duedate/update', obj),

        // Old routes.
        userHasCompliances: (obj)                  => postData('measure/userHasCompliances', obj),
        getCompaniesWithAccess: (obj)              => postData('measure/getCompaniesWithAccess', obj),
        getLocationsWithAccess: (obj)              => postData('measure/getLocationsWithAccess', obj),
        getSpacesWithAccess: (obj)                 => postData('measure/getSpacesWithAccess', obj),
        getComplianceCategoriesWithAccess: (obj)   => postData('measure/getComplianceCategoriesWithAccess', obj),
        getComplianceMeasures: (obj)               => postData('measure/getComplianceMeasures', obj),

        getComplianceMeasureById: (obj)            => postData('measure/getComplianceMeasureById', obj),
        getHistoryByComplianceId: (obj)            => postData('measure/getHistoryByComplianceId', obj),
        getUploadedDocuments: (obj)                => postData('measure/getUploadedDocuments', obj),
    }
};

const UserActivity = () => {
    return {
        getUserActivity: (obj)                     => postData('users/views/getUserActivityInSameManagementCompany', obj),

    }
};

const ComplianceMeasure = () => {

    const baseUrl = 'complianceMeasure';

    return {
        getComplianceMeasures: (obj)                 => postData(`${baseUrl}/getComplianceMeasures`, obj),
        getComplianceMeasureById: (obj)              => postData(`${baseUrl}/getComplianceMeasureById`, obj),
        getComplianceMeasureCategory: (obj)          => postData(`${baseUrl}/getComplianceMeasureCategory`, obj),
        getComplianceMeasureFrequencyCategory: (obj) => postData(`${baseUrl}/getComplianceMeasureFrequencyCategory`, obj),

        updateComplianceMeasure: (obj)               => postData(`${baseUrl}/updateComplianceMeasure`, obj),
    }
};

const Report = () => {

    const baseUrl = 'report';

    return {
        getManagers: (obj)                 => getData(`/measure/${baseUrl}/managers`, obj),
        getArchives: (obj)                 => getData(`/measure/${baseUrl}/archives`, obj),
        getArchive: (obj)                  => getOne(`/measure/${baseUrl}/archive`, obj),
        getMyPortfolio: (obj)              => getData(`/measure/${baseUrl}/myPortfolioReport`, obj),
        getMyPortfolioStyles: (obj)        => getData(`/measure/${baseUrl}/myPortfolioStyles`, obj),
    }
};

const API = () => ({
    User: User,
    Company: Company,
    Location: Location,
    Space: Space,
    Compliance: Compliance,
    ComplianceMeasure: ComplianceMeasure,
    Measure: Measure,
    UserActivity: UserActivity,
    Profile: Profile,
    ManagementCompany: ManagementCompany,
    Report: Report,
});

export default API;