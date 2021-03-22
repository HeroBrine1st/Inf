import {Drawer, List, ListItem, ListItemText, Link as MLink, makeStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import PropTypes from "prop-types";
import {Link as RLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  link: {
    '&:hover': {
      color: "#202124"
    },
  },
  list: {
    width: theme.spacing(31.25),
  },
  footer: {
    position: "absolute",
    bottom: theme.spacing(3.5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    textAlign: "center",
    alignSelf: "center",
  }
}))

function NavigationDrawer(props) {
  const classes = useStyles()
  return <Drawer anchor="left" variant="temporary" open={props.open} onClose={props.onClose}>
    <Toolbar/> {/*Костыль, чтобы тулбар не перекрывал дравер*/}

    <List className={classes.list} onClick={props.onClose}>
      <ListItem button component={RLink} to="/variants" divider key="1">
        <ListItemText>По вариантам</ListItemText>
      </ListItem>
      <ListItem button component={RLink} to="/blocks" divider key="2">
        <ListItemText>По тематическим блокам</ListItemText>
      </ListItem>
    </List>

    <div className={classes.footer}>
      <Typography variant="caption" color="textSecondary">
        <MLink href="https://github.com/HeroBrine1st/Inf" target="_blank" rel="noopener noreferrer" underline="none"
               color="textSecondary" className={classes.link}>Исходный код</MLink>
      </Typography>
    </div>
  </Drawer>
}

NavigationDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default NavigationDrawer