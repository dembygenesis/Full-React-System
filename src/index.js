import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as Colors from '@material-ui/core/colors';
import * as serviceWorker from './serviceWorker';

// Apply routing.
import {BrowserRouter} from "react-router-dom";

import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";

// Configure store.
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {compose} from 'redux';

import uiReducer from './store/reducers/ui';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/user';
import apiErrorReducer from './store/reducers/apiResponseNotification';
import companyReducer from './store/reducers/company';
import locationReducer from './store/reducers/location';
import spaceReducer from './store/reducers/space';
import complianceReducer from './store/reducers/compliance';
import reportsReducer from './store/reducers/reports';


// Enable debugging of state for now.
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    user: userReducer,
    apiError: apiErrorReducer,
    company: companyReducer,
    location: locationReducer,
    space: spaceReducer,
    compliance: complianceReducer,
    reports: reportsReducer,
});

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
);

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#BF1E2E',
        }
    },
    overrides: {

        MuiSelect: {

        },
        MuiSvgIcon: {
            root: {
                color: '#BF1E2E',
            },
        },
        MuiPaper: {
            root: {
                backgroundColor: '#fff',
                boxShadow: 'none !important',
            },
        },
        MuiTableHead: {
            root: {
                borderBottom: '2px solid #e7e7e9',
            },
        },
        MuiTableCell: {
            root: {
                borderBottom: 0,
            },
            head: {
                color: '#BF1E2E',
                fontSize: '14px',
                fontWeight: 'bold',
                '&:last-child': {
                    backgroundColor: '#f1f1f1',
                }
            },
        },
        MuiTableRow: {
            root: {
                border: 0
            }
        },

        MuiTable: {
            root: {

            }
        },
        MuiListItemIcon: {
            root: {
                marginLeft: '15px',
                paddingRight: 0,
                marginRight: 0,
            },
        },

        MuiListItemText: {
            primary: {
                fontSize: '14px',
                color: '#000000',
            },
        },
        MuiListSubheader: {
            root: {
                color: '#c1202f',
                textTransform: 'uppercase',
                fontSize: '14px',
                fontWeight: 'bold',
                marginLeft: '15px',
            }
        },
        MuiMenuItem: {
            root: {

            },
        },
        MuiMenu: {
            paper: {
                border: '1px solid #d1d1d6',
            }
        }
    }
});

const app =
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <App/>
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
;
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
