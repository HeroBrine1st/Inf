import {Divider, Drawer, List, ListItem, ListItemText} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import "./NavigationDrawer.css"
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function NavigationDrawer(props) {
  return <Drawer anchor="left" variant="temporary" open={props.open} onClose={props.onClose}>
    <Toolbar/> {/*Костыль, чтобы тулбар не перекрывал дравер*/}
    <List className="navDrawerList" onClick={props.onClose}>
      <ListItem button component={Link} to="/variants">
        <ListItemText>По вариантам</ListItemText>
      </ListItem>
      <Divider/>
    </List>
    <div className="navDrawerFooter">
      Все права защищены блять.<br/>Закрой нахуй, дует
    </div>
  </Drawer>
}

NavigationDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default NavigationDrawer