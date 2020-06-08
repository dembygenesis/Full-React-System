import React from 'react';
import IconContainer from "../Icon/IconContainer";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import AssignmentLateOutlinedIcon from '@material-ui/icons/AssignmentLateOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';

const PaperHeader = props => {

    // If you have children render them on the right side.

    let icon = null;

    if (props.title === 'Measure Details') {
        icon = (
            <AssignmentOutlinedIcon
                style={{
                    display: 'block',
                    margin: '0 auto',
                    height: '40px',
                    width: 'auto',
                    marginTop: '12px',
                    color: '#BF1E2E',
                }}
            />
        );
    }

    if (props.title === 'Add Results') {
        icon = (
            <AssignmentTurnedInOutlinedIcon
                style={{
                    display: 'block',
                    margin: '0 auto',
                    height: '40px',
                    width: 'auto',
                    marginTop: '12px',
                    color: '#BF1E2E',
                }}
            />
        );
    }

    if (props.title === 'Compliance Documents' || props.title === 'Add Documents') {
        icon = (
            <AssignmentLateOutlinedIcon
                style={{
                    display: 'block',
                    margin: '0 auto',
                    height: '40px',
                    width: 'auto',
                    marginTop: '12px',
                    color: '#BF1E2E',
                }}
            />
        );
    }

    if (props.title === 'Action History') {
        icon = (
            <HistoryOutlinedIcon
                style={{
                    display: 'block',
                    margin: '0 auto',
                    height: '40px',
                    width: 'auto',
                    marginTop: '12px',
                    color: '#BF1E2E',
                }}
            />
        );
    }

    return (
        <div style={{
            height: '110px',
            overflow: 'auto',
            borderBottom: '3px solid #BF1E2E',
        }}>
            {icon ? <IconContainer styles={{
                height: '70px',
                width: '70px',
                padding: 0,
                float: 'left',
                marginTop: '20px',
                marginLeft: '20px',
            }}>
                {icon}
            </IconContainer> : null}

            <h3
                style={{
                    float: 'left',
                    marginTop: '40px',
                    marginLeft: '10px',
                    color: '#BF1E2E',
                }}>{props.title}&nbsp;
                {props.subtitle}</h3>

            <div style={{
                float: 'left',
            }}>
                {props.children}
            </div>
        </div>
    );
};

export default PaperHeader;