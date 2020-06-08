import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import {
    getArchives
} from "../../store/actions/reports";
import LinearLoading from "../../components/UI/LinearLoading/LinearLoading";

const styles = theme => ({
    root: {
        width: 200
    }
});

class Archives extends Component {

    componentDidMount() {
        this.props.setPageTitle('Archives');

        this.props.getArchives();
    }

    renderArchives() {
        if (this.props.archives !== null) {
            return this.props.archives.map( archive => (
                <TableRow key={archive.id}>
                    <TableCell key={archive.id}>
                        <Link to={`reportDetails/${archive.id}`}>{archive.date}</Link>
                    </TableCell>
                </TableRow>
            ));
        } else {
            return <LinearLoading/>;
        }
    }

    render() {

        const {classes} = this.props;

        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Month Day</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Link to={`reportDetails/now`}>Now</Link>
                                </TableCell>
                            </TableRow>

                            { /*this.renderArchives()*/ }
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        archives: state.reports.archives,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getArchives: () => dispatch(getArchives())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Archives));