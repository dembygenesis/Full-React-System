import React from 'react';

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const selectWithTitle = props => {

    // Need data.
    // options
    // value
    // disabled
    // onChange

    // selectStylesOverride
    let selectStyles = null;
    let styles = {};

    if (typeof props.styleOverrides) {
        styles = {
            ...props.styleOverrides
        }
    }

    if (typeof props.selectStylesOverride !== "undefined") {
        selectStyles = {
            textAlign: 'left',
            marginLeft: '10px',
            ...props.selectStylesOverride
        };
    } else {
        selectStyles = {
            textAlign: 'left',
            marginLeft: '10px',
        };
    }

    return (
        <div style={{
            flexDirection: 'row',
            textAlign: 'center',
            margin: '30px 0',
            ...styles,
        }}>
            <span style={{
                color: '#BF1E2E',
                fontWeight: 'bold',
                fontSize: '14px',
            }}>
                {props.title}:
            </span>
            <div style={{
                display: 'inline',
                position: 'relative',
            }}>
                <Select
                    style={selectStyles}
                    autoWidth={true}
                    value={props.value}
                    onChange={(event) => props.onChange(event)}
                    disabled={props.disabled}
                >
                    {
                        props.hasAll
                            ? (
                                <MenuItem value="0">All</MenuItem>
                            )
                            : null
                    }
                    {props.options.map(option => {
                        return (
                            <MenuItem
                                key={option.id}
                                value={option.id}
                            >{option.name}</MenuItem>
                        )
                    })}
                </Select>
            </div>
        </div>
    );
};

export default selectWithTitle;