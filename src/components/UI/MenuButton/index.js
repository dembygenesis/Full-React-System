import React, { PureComponent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from '@material-ui/icons/MoreVert';


class MenuButton extends PureComponent {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { items } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-label="Delete"
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
         >
          <MoreVert />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
            {items.length && items.map(each => (
              <MenuItem>{each}</MenuItem>
            ))}
        </Menu>
      </div>
    );
  }
}

export default MenuButton;
