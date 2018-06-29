import React, { Component } from 'react';
import { Menu, MenuItem, IconButton } from "material-ui";
import MoreVertIcon from "material-ui-icons/MoreVert";
import { withRouter } from "react-router-dom";

class CustomMenu extends Component {
  state = {
    anchorEl: null
  };
  menuItemClickHandler = url => {
    this.setState( { anchorEl: null } );
    this.props.history.push(url);            
  };

  iconButtonClickHandler = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  menuCloseHandler = () => {
    this.setState({ anchorEl: null });
  };

  render () {
    let menuElementsArray = [];
    const ITEM_HEIGHT = 30;
    const { anchorEl } = this.state;
    const { options } = this.props;
    for (let key in options) {
      menuElementsArray.push({
        id: key,
        config: options[key]
      });
    };
    const menu = (
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.menuCloseHandler}
        PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: 200 } }}
      >
        {menuElementsArray.map(option => (
          <MenuItem key={ option.config.name }
            onClick={ () => this.menuItemClickHandler( option.config.url ) }>
            {option.config.name }
          </MenuItem>
        ))}
      </Menu>
    );
    const icon = (
      <IconButton
        aria-label="More"
        aria-owns={anchorEl ? "long-menu" : null}
        aria-haspopup="true"
        onClick={this.iconButtonClickHandler}
      >
        <MoreVertIcon />
      </IconButton>
    );
    return <div>
        {icon}
        {menu}
      </div>;
  }
}

export default withRouter(CustomMenu);