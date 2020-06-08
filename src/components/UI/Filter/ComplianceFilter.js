import React from 'react';

import CompanyIcon from '../../../assets/company_icon.png';
import LocationIcon from '../../../assets/location_icon.png';
import SpaceIcon from '../../../assets/space_icon.png';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import IconContainer from '../Icon/IconContainer';


import Grid from '@material-ui/core/Grid';

const complianceFilter = props => {

    // There will be an if statement here to determine your images.
    // These images will have different styles.

    let icon = null,
        title = props.icon;

    if (props.icon === 'Company') {
        icon = (
            <img
                style={{
                    height: '35px',
                    width: 'auto',
                }}
                src={CompanyIcon} alt=""/>
        );
    }

    if (props.icon === 'Location') {
        icon = (
            <img
                style={{
                    height: '35px',
                    width: 'auto',
                }}
                src={LocationIcon} alt=""/>
        );
    }

    if (props.icon === 'Space') {
        icon = (
            <img
                style={{
                    height: '35px',
                    width: 'auto',
                }}
                src={SpaceIcon} alt=""/>
        );
    }

    return (
        <Grid
            style={{
                padding: '10px 30px',
            }}
            container spacing={16}>
            <Grid item xs={4}>
                <IconContainer>
                    {icon}
                </IconContainer>
            </Grid>

            <Grid
                style={{
                    position: 'relative',
                    marginBottom: '10px',
                }}
                item xs={8}
            >
                <p style={{
                    position: 'absolute',
                    top: '-2px',
                }}>{title}</p>

                <Select
                    autoWidth={true}
                    value={props.value}
                    onChange={(event) => props.onChange(event)}
                    inputProps={{
                        name: 'Zeratul',
                        id: 'Zeratul',
                    }}
                    style={{
                        paddingTop: '50px',
                        width: '100%',
                    }}
                >
                    {
                        props.icon === 'Space' ?
                            (
                                <MenuItem
                                    value="0"
                                >
                                    All
                                </MenuItem>
                            ) : null
                    }

                    {
                        props.data.map(menuInfo => {
                            return (
                                <MenuItem key={menuInfo.id} value={menuInfo.id}>
                                    {menuInfo.name}
                                </MenuItem>
                            )
                        })
                    }

                </Select>
            </Grid>
        </Grid>
    );
};

export default complianceFilter;