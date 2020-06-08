import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import ButtonWithIcon from "../../components/UI/ButtonWithIcon/ButtonWithIcon";
import {getToken, hasNoAPIErrors, prepImgLink} from "../../utilities/utilities";
import axios from "../../axios-compliance-link";
import TextField from "@material-ui/core/TextField";
import API from "../../api";
import {connect} from "react-redux";

import {updateSideWideMessage} from "../../store/actions";

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
    },
    input: {
        display: 'none'
    },
    textArea: {
        height: 300
    }
});

class ManageManagementCompany extends Component {

    state = {
        documentToUpload: '',
        documentToUploadName: '',
        managementCompanyName: '',
        managementCompanySiteWideMessage: '',
        managementCompanyId: '',
        managementCompanyLogo: null,
        count: 0,
        rate: 0,
        prices: [],
        uploadPercent: null,
    };

    onFileChangedHandler = event => {
        const documentToUpload = event.target.files[0];
        const documentToUploadName = event.target.files[0].name;

        this.setState({
            documentToUpload: documentToUpload,
            documentToUploadName: documentToUploadName,
        });
    };

    componentDidMount() {
        this.props.setPageTitle('Managing Company');

        this.getDetails();
    }

    async getDetails() {

        let result = await API().ManagementCompany().getManagementCompanyDetails();

        if (hasNoAPIErrors(result)) {
            result = result.data.data.data;

            let count = result && result['billing'] && result['billing'].length > 0 ? result['billing'].reduce(function (a, b) {
                return b.space_count == null ? a : a + Number(b.space_count);
            }, 0) : 0
            this.setState({
                managementCompanyName: result['name'],
                managementCompanySiteWideMessage: result['site_wide_message'],
                managementCompanyId: result['id'],
                managementCompanyLogo: prepImgLink(result['logo']),
                count: count,
                rate: Number(result['rate']),
                prices: result['prices'],

                documentToUpload: '',
                documentToUploadName: '',
                uploadPercent: null,
            });
        }
    }

    onFormFieldUpdate = event => {
        const val = event.target.value;
        const name = event.target.name;

        this.setState({[name]: val});
    };

    onDocumentSubmittedHandler = async event => {
        event.preventDefault();

        let formData = new FormData();

        formData.append('token', getToken());
        formData.append('image', this.state.documentToUpload, this.state.documentToUploadName);

        axios.post('/managementCompany/updateLogo', formData, {
            onUploadProgress: progressEvent => {
                this.setState({uploadPercent: progressEvent.loaded / progressEvent.total});
            }
        }).then(res => {
            if (hasNoAPIErrors(res)) {
                this.getDetails();
            }
        }).catch(err => {
            console.log(err);
        })
    };

    onNameSubmittedHandler = async event => {
        event.preventDefault();

        const result = await API().ManagementCompany().updateName({
            name: this.state.managementCompanyName
        });

        if (hasNoAPIErrors(result)) {
            this.getDetails();
        }
    };

    onSiteWideMessageSubmittedHandler = async event => {
        event.preventDefault();

        const result = await API().ManagementCompany().updateSiteWideMessage({
            site_wide_message: this.state.managementCompanySiteWideMessage
        });
        if (hasNoAPIErrors(result)) {
            this.props.updateSideWideMessage(this.state.managementCompanySiteWideMessage);
        }
    };

    renderLogo() {
        if (this.state.logo !== null) {
            return (
                <img src={this.state.managementCompanyLogo} alt="Company Logo" style={{
                    maxHeight: '100px',
                    width: 'auto',
                }}/>
            );
        }

        return null;
    }

    render() {
        let {classes} = this.props;

        let {
            documentToUploadName,
            uploadPercent,
        } = this.state;

        if (uploadPercent !== null) {
            uploadPercent = (parseFloat(uploadPercent) * 100).toFixed(2);
        }

        if (uploadPercent === '100%') {
            uploadPercent = 'File uploaded, sending...';
        }
        return (
            <Grid container spacing={24}>
                <Grid item xs={6}>

                    <h3>Managing Company ID: {this.state.managementCompanyId}</h3>

                    <Paper className={classes.paper}>
                        <form action="post" onSubmit={event => this.onNameSubmittedHandler(event)}>

                            <TextField
                                style={{
                                    width: '100%',
                                    marginBottom: '10px',
                                }}
                                value={this.state.managementCompanyName}
                                label="Managing Company Name"
                                type="text"
                                id="firstname"
                                name="managementCompanyName"
                                onChange={(event) => this.onFormFieldUpdate(event)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained" color="primary">
                                Submit
                            </Button>
                        </form>
                    </Paper>

                    <br/>

                    <Paper className={classes.paper}>

                        <form action="post" onSubmit={event => this.onSiteWideMessageSubmittedHandler(event)}>

                            <TextField
                                style={{
                                    width: '100%',
                                }}
                                value={this.state.managementCompanySiteWideMessage}
                                label="Managing Company Site Wide Message"
                                placeholder="Enter your message here"
                                type="text"
                                variant="outlined"
                                id="managementCompanySiteWideMessage"
                                name="managementCompanySiteWideMessage"
                                onChange={(event) => this.onFormFieldUpdate(event)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                multiline={true}
                            />

                            <Button
                                type="submit"
                                variant="contained" color="primary">
                                Submit
                            </Button>
                        </form>
                    </Paper>

                    <br/>

                    <Paper className={classes.paper}>

                        <form action="post" onSubmit={event => this.onDocumentSubmittedHandler(event)}>

                            <input
                                onChange={(event) => this.onFileChangedHandler(event)}
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />

                            <label htmlFor="contained-button-file">
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    {this.renderLogo()}

                                    <div>
                                        <ButtonWithIcon
                                            type="file"
                                            component="span"
                                            size="small"
                                            title="Update Logo"
                                            variant="outlined"
                                            color="primary"
                                            icon="Insert Photo"
                                            styleOverrides={{}}
                                            iconStyleOverrides={{
                                                backgroundColor: 'red'
                                            }}
                                        />
                                    </div>

                                    <div style={{
                                        marginTop: '5px',
                                        marginLeft: '10px'
                                    }}>
                                        <span className={classes.span}>
                                            {documentToUploadName} <strong>{uploadPercent}</strong>
                                        </span>
                                    </div>
                                </div>


                                {
                                    documentToUploadName !== ''
                                        ? (
                                            <React.Fragment>
                                                <br/>

                                                <Button
                                                    type="submit"
                                                    variant="contained" color="primary">
                                                    Submit
                                                </Button>
                                            </React.Fragment>
                                        )
                                        : null
                                }
                            </label>
                        </form>
                    </Paper>

                    <br/>
                    <Paper className={classes.paper}>
                        <TextField
                            style={{
                                width: '30%',
                                marginBottom: '10px',
                            }}
                            value={this.state.count}
                            label="Total Space"
                            type="count"
                            id="count"
                            name="count"
                            fullWidth
                            margin="normal"
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <TextField
                            style={{
                                width: '30%',
                                marginBottom: '10px',
                            }}
                            value={this.state.rate}
                            label="Rate"
                            type="text"
                            id="rate"
                            name="rate"
                            fullWidth
                            margin="normal"
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />&nbsp;
                        &nbsp;
                        &nbsp;
                        <TextField
                            style={{
                                width: '30%',
                                marginBottom: '10px',
                            }}
                            value={this.state.rate * this.state.count}
                            label="Total Cost"
                            type="cost"
                            id="cost"
                            name="cost"
                            fullWidth
                            margin="normal"
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSideWideMessage: (message) => dispatch(updateSideWideMessage(message)),
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(ManageManagementCompany));