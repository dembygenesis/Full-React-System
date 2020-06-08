import _ from "lodash";
import asyncComponent from '../hoc/asyncComponent/asyncComponent';

export const objectChecker = (object, objectProperties) => {
    
    if (typeof object !== 'undefined') {

        // Check if it is in "dot" format and convert if it is.
        if (typeof objectProperties === 'string') {
            objectProperties = objectProperties.split('.');
        }

        for (let i = 0; i < objectProperties.length; i++) {
            if (typeof object !== "object") {
                object = false;
                break;
            }

            if (!(objectProperties[i] in object)) {
                object = false;
                break;
            } else {
                object = object[objectProperties[i]];
            }
        }
    }

    return object;
};

export const removeObjectDuplicates = (object) => (
    _.map(
        _.uniq(
            _.map(object, function(obj){
                return JSON.stringify(obj);
            })
        ), function(obj) {
            return JSON.parse(obj);
        }
    )
);

export const getToken = () => localStorage.getItem('token');

export const hasNoAPIErrors = (object) => {
    if (typeof object === "object") {
        return objectChecker(object, ['data', 'data', 'error']) === false;
    }

    if (object === true) {
        return true;
    }
};

export const serialize = function(obj) {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
};

export const inArray = (arr, val) => arr.indexOf(val) !== -1;

export const getBaseUrl = () => window.location.origin.replace('3000', '8080');

export const prepImgLink = imgLink => {

    if (imgLink === '') {
        return 'https://csgoskin2keys.com/logo.jpg';
    }

    imgLink = imgLink.replace('public/', '');

    if (window.location.href.match(/localhost/g)) {
        imgLink = (window.location.origin + '/' + imgLink).replace('3000', '8080');
    } else {
        imgLink = (window.location.origin + '/' + imgLink);
    }

    return imgLink;
};

export const formatName = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
export const formatDrawerSectionDescription = (string, open) => {

    if (open === false) {
        if (string.match(/Configuration/g))
            string = 'Cfg';

        if (string.match(/Dashboard/g))
            string = 'Dash';

        if (string.match(/Settings/g))
            string = 'Sett';
    }

    return string;
};
export const getInitials = (firstname, lastname) => firstname.substring(0, 1).toUpperCase() + lastname.substring(0, 1).toUpperCase();

export const getAsyncComponent = dir => asyncComponent(() => import('../' + dir));
