import React from 'react';

const iconContainer = props => {

    let styles = {
        height: '80px',
        width: '80px',
        border: '2.5px solid #BF1E2E',
        borderRadius: '50px',
        padding: '20px',
    };

    if (props.styles) {
        styles = {
            ...styles,
            ...props.styles
        };
    }

    return (
        <div style={styles}>
            {props.children}
        </div>
    );
};

export default iconContainer;