import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';

export default class Header extends Component {


    render() {
        return (
            <div style={{
                paddingTop: "24px",
                paddingLeft: "48px",
                paddingBottom: "24px",
                marginLeft: "-48px",
                backgroundImage: "linear-gradient(to left, rgba(152,152,152,0), rgba(152,152,152,1))",
                color: "white"
            }}>
                <div disableGutters={!this.props.open} className={this.props.classes.toolbar}>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={this.props.classes.title}
                    >
                <span
                    style={{
                        textTransform: 'uppercase'
                    }}
                >{this.props.pageTitle}</span>
                    </Typography>
                </div>
            </div>
        )
    }
}
