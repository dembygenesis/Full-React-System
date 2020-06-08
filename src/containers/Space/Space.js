import React from 'react';

import {NavLink} from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import Alert from '../../components/UI/Alert/Alert';

import API from '../../api';

import {withStyles} from '@material-ui/core/styles';

import {
    getSpaces,
    getSpacesByLocation,
    deleteSpace,
    updateSpaceFormHandler,
} from "../../store/actions";

import {connect} from "react-redux";
import LinearLoading from "../../components/UI/LinearLoading/LinearLoading";
import {hasNoAPIErrors} from "../../utilities/utilities";
import SpacesTable from "../../components/ComplianceLink/Tables/Space/SpacesTable";
import ButtonWithIcon from "../../components/UI/ButtonWithIcon/ButtonWithIcon";
import SelectWithTitle from "../../components/UI/SelectWithTitle/SelectWithTitle";

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    button: {
        margin: theme.spacing.unit * .5,
    },
    formControl: {
        minWidth: 250,
        marginBottom: '10px'
    },
    alert: {
        margin: '0 10px',
    }
});

class Spaces extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hasLocations: null,
            selectedLocationId: sessionStorage.getItem('spaceLocationFilter') || props.selectedLocationId
        }
    }

    deleteHandler = spaceId => {
        if (window.confirm('Are you sure you want to delete this space?')) {
            this.props.deleteSpace(spaceId);
        }
    };

    locationFilterChangedHandler = event => {
        const locationId = event.target.value;

        this.setState({
            selectedLocationId: locationId
        }, this.saveFilterToSession(locationId))

        this.props.updateSpaceFormHandler(locationId, 'selectedLocationId');

        if (locationId === '0') {
            this.props.onLoadGetSpaces();
        } else {
            this.props.getSpacesByLocation(locationId);
        }
    };

    saveFilterToSession(value) {
        sessionStorage.setItem('spaceLocationFilter', JSON.stringify(value))
    }

    /**
     * Lifecycle methods.
     */

    async componentDidMount() {
        this.props.setPageTitle('Space');

        let hasLocations = await API().Space().accessCheck();

        if (hasNoAPIErrors(hasLocations)) {
            hasLocations = hasLocations.data.data.data;

            if (hasLocations === false) {
                this.setState({hasLocations: false});
            } else {
                this.setState({hasLocations: true});
                this.props.onLoadGetSpaces();
            }
        }
    }

    render() {

        const {classes} = this.props;

        let filter = null;

        if (this.props.locations) {
            filter = (
                <React.Fragment>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <div style={{
                            marginRight: '20px',
                        }}>
                            <ButtonWithIcon
                                title="Add New Space"
                                disabled={['Manager', 'Reviewer'].indexOf(this.props.userType) !== -1}
                                component={NavLink}
                                to="/space/add"
                                variant="contained"
                                icon="Add Circle"
                                color="primary"
                            />
                        </div>

                        <div>
                            <SelectWithTitle
                                title="Location Filter"
                                options={this.props.locations}
                                value={isNaN(this.state.selectedLocationId) ? 0 : this.state.selectedLocationId * 1}
                                hasAll
                                disabled={false}
                                onChange={(event) => this.locationFilterChangedHandler(event)}
                                selectStylesOverride={{
                                    minWidth: '300px',
                                }}
                                styleOverrides={{
                                    marginTop: '5px',
                                }}
                            />
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        let displayTable = typeof this.props.spaces !== "undefined" ? this.props.spaces !== null
            ? (
                this.props.spaces.length > 0
                    ? (
                        <React.Fragment>

                            <Paper style={{
                                marginTop: '0px'
                            }}>
                                <SpacesTable
                                    userType={this.props.userType}
                                    spaces={this.props.spaces}
                                    delete={this.deleteHandler}
                                />
                            </Paper>
                        </React.Fragment>

                    )
                    : <Alert
                        stylesOverride={{
                            marginTop: '15px',
                        }}
                        type="error" className={classes.alert}>You have no spaces available.</Alert>
            )
            : null : null;

        let display = (
            <div>
                <React.Fragment>

                    {filter}
                    {displayTable}
                </React.Fragment>
            </div>
        );

        display = this.state.hasLocations !== null
            ? this.state.hasLocations === false
                ? <Alert
                    stylesOverride={{
                        marginTop: '15px',
                    }}
                    type="error">You must have locations first before you can add spaces.</Alert>
                : display
            : <LinearLoading/>;

        return display;
    }
}

const mapStateToProps = state => {
    return {
        locations: state.space.locations,
        spaces: state.space.spaces,
        selectedLocationId: state.space.spaceFormFields.selectedLocationId,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateSpaceFormHandler: (value, formField) => dispatch(updateSpaceFormHandler(value, formField)),
        onLoadGetSpaces: () => dispatch(getSpaces()),
        getSpacesByLocation: (locationId) => dispatch(getSpacesByLocation(locationId)),
        deleteSpace: (spaceId) => dispatch(deleteSpace(spaceId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Spaces));