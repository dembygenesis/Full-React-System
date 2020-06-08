import React from 'react';
import {NavLink} from "react-router-dom";
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";

const backButton = ({routeTo, styleOverrides, name}) => {

    if (typeof styleOverrides === "undefined") {
        styleOverrides = {};
    }

    return (
        <React.Fragment>
            <ButtonWithIcon
                title={"Go Back" + (name ? " to " + name : "")}
                component={NavLink}
                to={routeTo}
                variant="contained"
                color="primary"
                icon="Keyboard Backspace"
                styleOverrides={styleOverrides}
            />
        </React.Fragment>
    );
};

export default backButton;