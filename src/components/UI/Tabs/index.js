import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends PureComponent {
  state = {
    value: sessionStorage.getItem('previousSelectedTab') || 0
  };

  handleChange = (event, value) => {
    this.setState({ value }, () => sessionStorage.setItem('previousSelectedTab', value));
  };

  render() {
    const { classes, tabLabels, items } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={Number(value)} onChange={this.handleChange}>
            {tabLabels.map((each, index) => <Tab key={`tab-label-${index}`} label={each} />)}
          </Tabs>
        </AppBar>
        {items.map((each, index) => (
          <div key={`tab-item-${index}`}>
            {Number(value) === index && <TabContainer>{each}</TabContainer>}
          </div>
        ))}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
