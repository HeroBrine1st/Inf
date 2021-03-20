import Toolbar from "@material-ui/core/Toolbar";
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import React from "react";
import PropTypes from "prop-types"
function NavigationDrawer(props) {
  return <Drawer anchor="left" variant="temporary" open={props.open} onClose={props.onClose}>
    <Toolbar/> {/*Костыль, чтобы тулбар не перекрывал дравер*/}
    <List className="navDrawerList">
      <ListItem button>
        <ListItemIcon>
          <InboxIcon/>
        </ListItemIcon>
        <ListItemText>Inbox</ListItemText>
      </ListItem>
    </List>
    <div className="navDrawerFooter">
      Все права защищены блять, закрой нахуй, дует
    </div>
  </Drawer>
}

NavigationDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

export default NavigationDrawer
