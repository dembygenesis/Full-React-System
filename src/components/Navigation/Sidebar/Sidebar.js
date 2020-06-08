import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import classNames from "classnames";
import SidebarItems from "./SidebarListItems";

import Logo from '../../../assets/logo.png';
import {formatName, getInitials} from "../../../utilities/utilities";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';

const getAbbr = accountType => {

    switch (accountType) {
        case 'Super Administrator':
            return 'S Admin.';
        case 'Account Holder':
            return 'Acc H.';
        case 'Administrator':
            return 'Admin.';
        case 'User':
            return 'User';
        case 'Compliance Certifier':
            return 'C Cert.';
        case 'Manager':
            return 'Mgr';
        case 'Reviewer':
            return 'Revr.';
        default:
            return '';
    }
};

const getDisplayName = (firstname, lastname, open) => {
    firstname = formatName(firstname);
    lastname = formatName(lastname);

    let displayName = (firstname + ' ' + lastname);

    if (open === false) {
        displayName = firstname.substring(0, 1).toUpperCase() + '.' + lastname.substring(0, 1).toUpperCase() + '.';
    }

    return displayName;
};

// Idea is to import all components and passclassnames here as well as state managers..
const Sidebar = ({ userDetails, classes, open, handleDrawerClose}) => {
    let {firstname, lastname, userType} = userDetails;

    if (typeof firstname === "undefined") {
        firstname = '';
    }

    if (typeof lastname === "undefined") {
        lastname = '';
    }

    if (typeof userType === "undefined") {
        userType = '';
    }

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
                paperAnchorDockedLeft: classes.borderLess
            }}
            open={open}
        >
            {/*<div className={props.classes.toolbarIcon}>
            <img src={Logo} alt="" style={{
                height: 50,
                alignItems: 'center',
            }}/>

            <IconButton
                onClick={props.handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </div>*/}

            <div style={{
                margin : '0 auto',
                marginTop: '20px',
                marginBottom: '10px',
                display: 'flex',
                position: 'relative',
            }}>
                {
                    open === true
                        ? (
                            <img src={Logo} alt="" style={{
                                height: 50,
                            }}/>
                        )
                        : null
                }


                <IconButton
                    style={{
                        position: 'absolute',
                        right: '-35px'
                    }}
                    onClick={handleDrawerClose}>
                    <ChevronLeftIcon
                        style={{
                            height: '20px',
                            width: '20px',
                        }}
                    />
                </IconButton>
            </div>

            {/*<div style={{
                margin : '0 auto',
                marginTop: '20px',
                marginBottom: '10px',
            }}>
                <img src={Logo} alt="" style={{
                    height: 50,
                }}/>
            </div>*/}

            <div style={{
                margin: '0 auto',
                marginTop: '20px',
                marginBottom: '10px',
            }}>
                {
                    open
                        ? (
                            <div style={{
                                float: 'left',
                                position: 'relative',
                                width: '70px',
                                height: '70px',
                                borderRadius: '50px',
                                backgroundColor: '#f3f3f3',
                                border: '5px solid #989898',
                                marginRight: '10px',
                            }}><p style={{
                                bottom: 0,
                                top: '-18px',
                                left: '11px',
                                position: 'absolute',
                                fontSize: '30px',
                                letterSpacing: '1px',
                                color: '#959699',
                            }}>{getInitials(firstname, lastname)}</p></div>
                        )
                        : (
                            <React.Fragment>
                                <br/>
                                <br/>
                            </React.Fragment>
                        )
                }

                <div style={{
                    float: 'left',
                    marginTop: '15px',
                }}>
                    <p style={{
                        padding: '0',
                        margin: '0',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#000000',
                    }}>{getDisplayName(firstname, lastname, open)}</p>
                    <p style={{
                        padding: '0',
                        margin: '0',
                        fontSize: '12px',
                        textAlign: 'center',
                    }}>{
                        open
                            ? userType
                            : getAbbr(userType)
                    }</p>
                </div>
            </div>

            <SidebarItems open={open} />
        </Drawer>
    )
};

export default Sidebar;
