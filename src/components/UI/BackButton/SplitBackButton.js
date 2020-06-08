import React from 'react';
import {NavLink} from "react-router-dom";
import SplitButtonWithIcon from "../ButtonWithIcon/SplitButtonWithIcon";

const backButton = ({routeTo, styleOverrides, name}) => {

    if (typeof styleOverrides === "undefined") {
        styleOverrides = {};
    }

    return (
        <SplitButtonWithIcon
            title={"Go Back" + (name ? " to " + name : "")}
            component={NavLink}
            to={routeTo}
            variant="contained"
            color="primary"
            icon="Keyboard Backspace"
            styleOverrides={styleOverrides}
        />
    );
};

export default backButton;