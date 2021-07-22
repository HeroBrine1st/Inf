import {Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {Home, LibraryBooks, School} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  link: {
    '&:hover': {
      color: "#202124"
    },
  },
  list: {
    width: theme.spacing(35),
  },
  footer: {
    position: "absolute",
    bottom: theme.spacing(3.5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    textAlign: "center",
    alignSelf: "center",
  },
  menuButton: {
    marginRight: theme.spacing(1), // Чтобы текст после кноп очки лежал как надо
  },
  title: {
    margin: "right",
    color: theme.palette.primary,
  },
}))

function NavigationDrawer(props) {
  const classes = useStyles()
  return <Drawer anchor="left" variant="temporary" open={props.open} onClose={props.onClose} hideBackdrop>
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}
                  onClick={props.onClose}>
        <ArrowBackIcon/>
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        {props.title}
      </Typography>
    </Toolbar>
    <List className={classes.list} onClick={props.onClose}>
      <ListItem button component={Link} to="/" key="home">
        <ListItemIcon><Home/></ListItemIcon>
        <ListItemText>На главную страницу</ListItemText>
      </ListItem>
      <ListItem button component={Link} to="/variants" key="by-variants">
        <ListItemIcon><School/></ListItemIcon>
        <ListItemText>По вариантам</ListItemText>
      </ListItem>
      <ListItem button component={Link} to="/themes" divider key="by-themes">
        <ListItemIcon><LibraryBooks/></ListItemIcon>
        <ListItemText>По темам</ListItemText>
      </ListItem>
    </List>

    <div className={classes.footer}>
      {/*<Typography variant="caption" color="textSecondary">*/}
      {/*  <MLink href="https://github.com/HeroBrine1st/Inf" target="_blank" rel="noopener noreferrer" underline="none"*/}
      {/*         color="textSecondary" className={classes.link}>Исходный код</MLink>*/}
      {/*</Typography>*/}
    </div>
  </Drawer>
}

NavigationDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default NavigationDrawer