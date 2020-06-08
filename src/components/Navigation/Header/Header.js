import React, {Component} from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';

import {connect} from 'react-redux';
import {
    logout
} from '../../../store/actions';

const HoverText = styled.a`
	color: #000;
	:hover {
		color: #ed1212;
		cursor: pointer;
	};
	font: normal normal 700 12px/30px montserrat,sans-serif;
	height: 100%;
	padding: 38px;
	text-decoration: none;
`

class Header extends Component {

    logoutHandler = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            this.props.logout();
        }
    };

    render() {
        return (
            <AppBar
                position="absolute"
                style={{
                    backgroundColor: '#ffffff',
                    boxShadow: 'none',
                }}
                className={this.props.classNames(this.props.classes.appBar, this.props.open && this.props.classes.appBarShift)}
            >
                <Toolbar disableGutters={!this.props.open} className={this.props.classes.toolbar}>

                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.props.handleDrawerOpen}
                        className={this.props.classNames(
                            this.props.classes.menuButton,
                            this.props.open && this.props.classes.menuButtonHidden,
                        )}
                    >
                        <MenuIcon
                            style={{
                                color: 'black',
                            }}
                        />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={this.props.classes.title}
                    >
                    </Typography>
                    <HoverText
                        target="_blank"
                        href={"https://compliancelinc.wixsite.com/compliancelinc"}>
                        Home
                    </HoverText>
                    <HoverText
                        target="_blank"
                        href={"https://compliancelinc.wixsite.com/compliancelinc/services"}>
                        Services
                    </HoverText>
                    <HoverText
                        target="_blank"
                        href={"https://compliancelinc.wixsite.com/compliancelinc/contact"}>
                        Contact Us
                    </HoverText>
                    <HoverText
                        target="_blank"
                        href={"https://compliancelinc.wixsite.com/compliancelinc/faqs"}>
                        FAQs
                    </HoverText>
                    <Button
                        onClick={this.logoutHandler}
                        variant="contained"
                        color="primary"
                        style={{
                            height: '40px',
                            padding: '8px 20px 20px',
                            borderRadius: '20px',
                            textTransform: 'none',
                            font: 'normal normal 700 12px/1.4em Arial,Helvetica,sans-serif'
                        }}>
                        LOGOUT &nbsp;
                        <ExitToAppIcon style={{color:"white"}}/>
                    </Button>

                </Toolbar>
            </AppBar>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
};

export default connect(null, mapDispatchToProps)(Header);